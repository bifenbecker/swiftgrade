/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { GET_CURRENT_USER_CHECKLIST_REQUEST, SET_CURRENT_USER, SET_CURRENT_USER_CHECKLIST } from './constants';

// The initial state of the App
const initialState = fromJS({
  checklist: null,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state.set('user', action.data);
    case GET_CURRENT_USER_CHECKLIST_REQUEST:
      return state.set('checklist', null);
    case SET_CURRENT_USER_CHECKLIST:
      return state.set('checklist', action.data);
    default:
      return state;
  }
}

export default globalReducer;
