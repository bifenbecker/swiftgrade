import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGroups = state => state.get('groups', initialState);

const makeSelectGroup = () =>
  createSelector(
    selectGroups,
    groupState => groupState.get('group'),
  );

const makeSelectGroupColor = () =>
  createSelector(
    state => state,
    state => {
      const group = state.get('groups', initialState).get('group');
      const assessment = state.get('assessments', initialState).get('assessment');

      if (group) {
        return group.color;
      }
      if (assessment) {
        return assessment.group.color;
      }
      return null;
    },
  );

const makeSelectGroups = () =>
  createSelector(
    selectGroups,
    groupState => groupState.get('groups'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGroups,
    groupState => groupState.get('loading'),
  );

const makeSelectIsNewSession = () =>
  createSelector(
    selectGroups,
    groupState => groupState.get('isNewSession'),
  );

export { makeSelectGroup, makeSelectGroups, makeSelectLoading, makeSelectIsNewSession, makeSelectGroupColor };
