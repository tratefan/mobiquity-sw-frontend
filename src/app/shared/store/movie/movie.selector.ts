import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRouteId } from '../router/router.selector';
import { MoviesState, MOVIES_STATE_KEY } from './movie.state';

const getMoviesState = createFeatureSelector<MoviesState>(MOVIES_STATE_KEY);

export const getMoviesList = createSelector(
  getMoviesState,
  (state) => state.ids
);

export const getMovieEntities = createSelector(
  getMoviesState,
  (state) => state.entities
);

export const getMovieByRoute = createSelector(
  getMovieEntities,
  getCurrentRouteId,
  (entityState, id: string) => {
    return entityState[id];
  }
);

export const getMovieById = (id: string) => {
  return createSelector(getMovieEntities, (entityState) => {
    return entityState[id];
  });
};
