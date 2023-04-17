import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { loadMovies } from 'src/app/shared/store/movie/movie.actions';
import { getMoviesList } from 'src/app/shared/store/movie/movie.selector';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {
  public moviesIdsList$: Observable<string[]>;
  constructor(private store: Store<AppState>) {
    this.moviesIdsList$ = this.store.select(getMoviesList);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMovies());
  }
}
