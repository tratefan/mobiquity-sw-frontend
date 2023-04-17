import { Action, createReducer, on } from '@ngrx/store';
import { IMovie } from '../../interfaces';
import { loadMoviesSuccess } from './movie.actions';
import { initialState, MoviesState } from './movie.state';

const _moviesReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, action) => {
    const existingIds = new Set([...state.ids]);
    const entitiesMap: { [key: string]: IMovie } = { ...state.entities };
    action.moviesList.forEach((movie) => {
      existingIds.add(movie.id);
      entitiesMap[movie.id] = movie;
    });
    return {
      ...state,
      ids: [...existingIds],
      entities: entitiesMap,
    };
  })
);

export function MoviesReducer(
  state: MoviesState = initialState,
  action: Action
) {
  return _moviesReducer(state, action);
}
