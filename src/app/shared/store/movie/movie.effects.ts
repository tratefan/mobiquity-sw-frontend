import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  RouterAction,
  RouterNavigatedAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  EMPTY,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  toArray,
  withLatestFrom,
} from 'rxjs';
import { IMovie } from '../../interfaces';
import { MovieService } from '../../services/movie.service';
import { DummyAction } from '../app.reducer';
import { AppState } from '../app.state';
import { setLoadingSpinner } from '../shared/shared.actions';
import {
  loadMovies,
  loadMoviesByIds,
  loadMoviesSuccess,
} from './movie.actions';
import { getMoviesList } from './movie.selector';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private store: Store<AppState>,
    private toast: HotToastService
  ) {}

  public loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies),
      withLatestFrom(this.store.select(getMoviesList)),
      mergeMap(([action, movies]) => {
        if (!movies.length || movies.length === 1) {
          this.store.dispatch(setLoadingSpinner({ status: true }));
          return this.movieService.getMovies().pipe(
            this.toast.observe({
              error: 'Could not fetch.',
            }),
            map((moviesList: IMovie[]) => loadMoviesSuccess({ moviesList })),
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

  public loadSingleMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/movie');
      }),
      map((action: RouterAction<RouterStateSnapshot>) => {
        return (action.payload.routerState as any)['params']['id'];
      }),
      withLatestFrom(this.store.select(getMoviesList)),
      switchMap(([id, movies]) => {
        const foundMovie = movies.find((movie) => movie === id.toString());
        if (!foundMovie) {
          this.store.dispatch(setLoadingSpinner({ status: true }));
          return this.movieService.getMovieById(id).pipe(
            this.toast.observe({
              error: 'Could not fetch.',
            }),
            map((movie) => {
              const payload = [{ ...movie, id }];
              return loadMoviesSuccess({ moviesList: payload });
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

  public loadMoviesByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoviesByIds),
      withLatestFrom(this.store.select(getMoviesList)),
      switchMap(([action, ids]) => {
        const idsToFetch = action.ids.filter((id) => !ids.includes(id));

        return from(idsToFetch)
          .pipe(
            concatMap((id) => this.movieService.getMovieById(id)),
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
      map((moviesList) =>
        moviesList.length ? loadMoviesSuccess({ moviesList }) : DummyAction()
      )
    )
  );
}
