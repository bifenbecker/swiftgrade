import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStudents = state => state.get('students', initialState);

const makeSelectStudents = () =>
  createSelector(
    selectStudents,
    groupState => groupState.get('students'),
  );

export { makeSelectStudents };
