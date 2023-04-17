import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/shared/store/app.state';
import { loadCharactersByIds } from 'src/app/shared/store/character/character.actions';
import { getMovieByRoute } from 'src/app/shared/store/movie/movie.selector';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent {
  public movie$: Observable<IMovie | undefined>;

  constructor(private store: Store<AppState>) {
    this.movie$ = this.store
      .select(getMovieByRoute)
      .pipe(
        tap(
          (movie) =>
            movie &&
            this.store.dispatch(loadCharactersByIds({ ids: movie.characters }))
        )
      );
  }
}
