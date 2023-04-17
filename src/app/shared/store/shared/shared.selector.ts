import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState, SHARED_STATE_KEY } from './shared.state';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_KEY);

export const getLoading = createSelector(
  getSharedState,
  (state) => state.showLoading
);
