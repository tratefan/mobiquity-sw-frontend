import { Action, createReducer, on } from '@ngrx/store';
import { ICharacter } from '../../interfaces';
import {
  loadCharactersSuccess,
  loadCharacterSuccess,
} from './character.actions';
import { CharactersState, initialState } from './character.state';

const _charactersReducer = createReducer(
  initialState,
  on(loadCharacterSuccess, (state, action) => {
    const character: ICharacter = action.character;
    console.log(character, 'character');
    const entitiesMap: { [key: string]: ICharacter } = { ...state.entities };
    const entitiesListIds: Set<string> = new Set([...state.ids]);
    entitiesMap[character.id] = character;
    entitiesListIds.add(character.id);
    return {
      ...state,
      ids: [...entitiesListIds],
      entities: entitiesMap,
    };
  }),
  on(loadCharactersSuccess, (state, action) => {
    const existingIds = new Set([...state.ids]);
    const entitiesMap: { [key: string]: ICharacter } = { ...state.entities };
    action.characters.forEach((character) => {
      existingIds.add(character.id);
      entitiesMap[character.id] = character;
    });
    return {
      ...state,
      ids: [...existingIds],
      entities: entitiesMap,
    };
  })
);

export function CharactersReducer(
  state: CharactersState = initialState,
  action: Action
) {
  return _charactersReducer(state, action);
}
