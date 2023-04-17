import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';
import { RouterModule } from '@angular/router';
import { DateAgoModule } from '../../pipes/date-ago/date-ago.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule, DateAgoModule],
  exports: [MovieCardComponent],
})
export class MovieCardModule {}
