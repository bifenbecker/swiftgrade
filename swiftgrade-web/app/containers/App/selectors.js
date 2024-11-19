/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectCurrentUserChecklist = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('checklist'),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS(),
  );

export { selectGlobal, makeSelectCurrentUser, makeSelectCurrentUserChecklist, makeSelectLocation };
