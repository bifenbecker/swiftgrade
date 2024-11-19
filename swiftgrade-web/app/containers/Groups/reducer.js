import { fromJS } from 'immutable';

import { GET_GROUP_REQUEST, SET_GROUP, SET_GROUPS, SET_LOADING, SET_IS_NEW_SESSION } from './constants';

export const initialState = fromJS({
  group: null,
  groups: null,
  loading: false,
  isNewSession: true,
});

function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUP_REQUEST:
      return state.set('group', { isLoading: true });
    case SET_GROUP:
      return state.set('group', action.data);
    case SET_GROUPS:
      return state.set('groups', action.data);
    case SET_LOADING:
      return state.set('loading', action.data);
    case SET_IS_NEW_SESSION:
      return state.set('isNewSession', false);
    default:
      return state;
  }
}

export default groupsReducer;
