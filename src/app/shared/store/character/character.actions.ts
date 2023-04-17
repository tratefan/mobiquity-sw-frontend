import { createAction, props } from '@ngrx/store';
import { ICharacter } from '../../interfaces/character.interface';

export const LOAD_CARACTERS_BY_IDS = '[Character State] Load Characters By Ids';
export const LOAD_CHARACTER_SUCCESS =
  '[Character State] Load Character Success';
export const LOAD_CHARACTERS_SUCCESS =
  '[Character State] Load Characters Success';

export const loadCharactersByIds = createAction(
  LOAD_CARACTERS_BY_IDS,
  props<{ ids: string[] }>()
);

export const loadCharacterSuccess = createAction(
  LOAD_CHARACTER_SUCCESS,
  props<{ character: ICharacter }>()
);

export const loadCharactersSuccess = createAction(
  LOAD_CHARACTERS_SUCCESS,
  props<{ characters: ICharacter[] }>()
);
