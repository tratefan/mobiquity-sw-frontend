import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/shared/store/app.state';
import { getCharacterByRoute } from 'src/app/shared/store/character/character.selector';
import { loadMoviesByIds } from 'src/app/shared/store/movie/movie.actions';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent {
  public character$: Observable<ICharacter | undefined>;

  constructor(private store: Store<AppState>) {
    this.character$ = this.store
      .select(getCharacterByRoute)
      .pipe(
        tap(
          (character) =>
            character &&
            this.store.dispatch(loadMoviesByIds({ ids: character.movies }))
        )
      );
  }
}
