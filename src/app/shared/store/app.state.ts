import { RouterReducerState } from '@ngrx/router-store';
import { SharedState, SHARED_STATE_KEY } from './shared/shared.state';

export interface AppState {
  [SHARED_STATE_KEY]: SharedState;
  router: RouterReducerState;
}
