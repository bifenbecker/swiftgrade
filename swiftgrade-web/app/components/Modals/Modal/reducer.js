import { fromJS } from 'immutable';

import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const initialState = fromJS({
  isModalActive: false,
  modalData: null,
});

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return state.set('modalData', action.data).set('isModalActive', true);
    case HIDE_MODAL:
      return state.set('modalData', null).set('isModalActive', false);
    default:
      return state;
  }
}

export default modalReducer;
