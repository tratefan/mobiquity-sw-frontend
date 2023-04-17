import { IMovie } from '../../interfaces';

export const MOVIES_STATE_KEY = 'movies';

export interface MoviesState {
  ids: string[];
  entities: { [key: string]: IMovie };
}

export const initialState: MoviesState = {
  ids: [],
  entities: {},
};
