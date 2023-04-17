import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRouteId } from '../router/router.selector';
import { CharactersState, CHARACTERS_STATE_KEY } from './character.state';

const getCharactersState =
  createFeatureSelector<CharactersState>(CHARACTERS_STATE_KEY);

export const getCharactersListIds = createSelector(
  getCharactersState,
  (state) => state.ids
);

export const getCharacterEntities = createSelector(
  getCharactersState,
  (state) => state.entities
);

export const getCharacterByRoute = createSelector(
  getCharacterEntities,
  getCurrentRouteId,
  (entityState, id: string) => {
    return entityState[id];
  }
);

export const getCharacterById = (id: string) => {
  return createSelector(getCharacterEntities, (entityState) => {
    return entityState[id];
  });
};
