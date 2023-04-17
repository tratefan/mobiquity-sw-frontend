import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/shared/store/app.state';
import { getMovieById } from 'src/app/shared/store/movie/movie.selector';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnChanges {
  @Input() movieId: string = '';
  @Input() hideReadMore: boolean = true;
  public movie$!: Observable<IMovie>;

  constructor(private store: Store<AppState>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['movieId']) {
      this.movie$ = this.store.select(getMovieById(this.movieId));
    }
  }
}
