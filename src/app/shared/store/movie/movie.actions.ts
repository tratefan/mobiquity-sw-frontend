import { createAction, props } from '@ngrx/store';
import { IMovie } from '../../interfaces';

export const LOAD_MOVIES = '[Movies State] Load Movies';
export const LOAD_MOVIES_BY_IDS = '[Movies State] Load Movies By Ids';
export const LOAD_MOVIES_SUCCESS = '[Movies State] Load Movies Success';
export const LOAD_MOVIES_ERROR = '[Movies State] Load Movies Error';

export const loadMovies = createAction(LOAD_MOVIES);
export const loadMoviesByIds = createAction(
  LOAD_MOVIES_BY_IDS,
  props<{ ids: string[] }>()
);
export const loadMoviesSuccess = createAction(
  LOAD_MOVIES_SUCCESS,
  props<{ moviesList: IMovie[] }>()
);
export const loadMoviesError = createAction(LOAD_MOVIES_ERROR);
