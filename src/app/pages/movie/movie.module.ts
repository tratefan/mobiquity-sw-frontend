import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from 'src/app/shared/store/movie/movie.effects';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MOVIES_STATE_KEY } from 'src/app/shared/store/movie/movie.state';
import { MoviesReducer } from 'src/app/shared/store/movie/movie.reducer';
import { CharacterCardComponent } from './movie-detail/character-card/character-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MovieCardModule } from 'src/app/shared/components/movie-card/movie-card.module';
import { DateAgoModule } from 'src/app/shared/pipes/date-ago/date-ago.module';

@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailComponent,
    CharacterCardComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    RouterModule,
    MovieCardModule,
    DateAgoModule,
    NgxSkeletonLoaderModule,
    StoreModule.forFeature(MOVIES_STATE_KEY, MoviesReducer),
    EffectsModule.forFeature([MovieEffects]),
  ],
})
export class MovieModule {}
