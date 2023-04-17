export const SHARED_STATE_KEY = 'shared';

export interface SharedState {
  showLoading: boolean;
}

export const initialState: SharedState = {
  showLoading: false,
};
