import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared State] Set Loading Spinner';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);
