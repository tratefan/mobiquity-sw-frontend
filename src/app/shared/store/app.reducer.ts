import { routerReducer } from '@ngrx/router-store';
import { createAction } from '@ngrx/store';
import { CharactersReducer } from './character/character.reducer';
import { CHARACTERS_STATE_KEY } from './character/character.state';
import { SharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_KEY } from './shared/shared.state';

export const AppReducer = {
  [SHARED_STATE_KEY]: SharedReducer,
  [CHARACTERS_STATE_KEY]: CharactersReducer,
  router: routerReducer,
};

export const DummyAction = createAction('[Dummy Action]');
