import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  RouterAction,
} from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import {
  withLatestFrom,
  switchMap,
  concatMap,
  map,
  from,
  toArray,
  catchError,
  EMPTY,
  tap,
  filter,
  of,
} from 'rxjs';
import { CharacterService } from '../../services/character.service';
import { DummyAction } from '../app.reducer';
import { AppState } from '../app.state';
import { loadMoviesSuccess } from '../movie/movie.actions';
import { getMoviesList } from '../movie/movie.selector';
import { setLoadingSpinner } from '../shared/shared.actions';
import {
  loadCharactersByIds,
  loadCharactersSuccess,
  loadCharacterSuccess,
} from './character.actions';
import { getCharactersListIds } from './character.selector';

@Injectable()
export class CharacterEffects {
  constructor(
    private actions$: Actions,
    private characterService: CharacterService,
    private store: Store<AppState>,
    private toast: HotToastService
  ) {}

  public loadCharactersByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharactersByIds),
      withLatestFrom(this.store.select(getCharactersListIds)),
      switchMap(([action, ids]) => {
        const idsToFetch = action.ids.filter((id) => !ids.includes(id));

        return from(idsToFetch)
          .pipe(
            concatMap((id) => this.characterService.getCharacterById(id)),
            toArray()
          )
          .pipe(
            this.toast.observe({
              error: 'Could not fetch.',
            }),
            tap(() =>
              this.store.dispatch(setLoadingSpinner({ status: false }))
            ),
            catchError(() => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return EMPTY;
            })
          );
      }),
      map((characters) =>
        characters.length
          ? loadCharactersSuccess({ characters })
          : DummyAction()
      )
    )
  );

  public loadSingleCharacter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/character');
      }),
      map((action: RouterAction<RouterStateSnapshot>) => {
        return (action.payload.routerState as any)['params']['id'];
      }),
      withLatestFrom(this.store.select(getCharactersListIds)),
      switchMap(([id, characters]) => {
        const foundMovie = characters.find(
          (character) => character === id.toString()
        );
        if (!foundMovie) {
          this.store.dispatch(setLoadingSpinner({ status: true }));
          return this.characterService.getCharacterById(id).pipe(
            this.toast.observe({
              error: 'Could not fetch.',
            }),
            map((character) => {
              return loadCharacterSuccess({ character });
            }),
            tap(() =>
              this.store.dispatch(setLoadingSpinner({ status: false }))
            ),
            catchError(() => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return EMPTY;
            })
          );
        }
        return of(DummyAction());
      })
    );
  });
}
