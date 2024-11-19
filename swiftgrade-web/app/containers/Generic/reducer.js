import { fromJS } from 'immutable';

import {
  CREATE_DOWNLOAD_GENERIC_REQUEST,
  CREATE_GENERIC_PREVIEW_REQUEST,
  CREATE_GENERIC_PREVIEW_SUCCESS,
  CREATE_DOWNLOAD_GENERIC_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  generic_preview: null,
  generic_data: null,
});

function genericPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GENERIC_PREVIEW_REQUEST:
      return state.set('isLoading', true);
    case CREATE_GENERIC_PREVIEW_SUCCESS:
      return state.set('generic_preview', action.data).set('isLoading', false);
    case CREATE_DOWNLOAD_GENERIC_REQUEST:
      return state.set('isLoading', true);
    case CREATE_DOWNLOAD_GENERIC_SUCCESS:
      return state.set('generic_data', action.data).set('isLoading', false);
    default:
      return state;
  }
}

export default genericPreviewReducer;
