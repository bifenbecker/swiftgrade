/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as reduxFormReducer } from 'redux-form/immutable';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    form: reduxFormReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return (state, action) =>
    action.type === 'global/LOGOUT_REQUEST' ? rootReducer(undefined, action) : rootReducer(state, action);
}
