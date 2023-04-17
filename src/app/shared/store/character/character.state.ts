import { ICharacter } from '../../interfaces';

export const CHARACTERS_STATE_KEY = 'characters';

export interface CharactersState {
  ids: string[];
  entities: { [key: string]: ICharacter };
}

export const initialState: CharactersState = {
  ids: [],
  entities: {},
};
