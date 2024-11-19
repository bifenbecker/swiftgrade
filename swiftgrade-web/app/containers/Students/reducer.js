import { fromJS } from 'immutable';

import { SET_STUDENTS } from './constants';

export const initialState = fromJS({
  students: null,
  download_passwords: null,
});

function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTS:
      return state.set('students', action.data);
    default:
      return state;
  }
}

export default studentsReducer;
