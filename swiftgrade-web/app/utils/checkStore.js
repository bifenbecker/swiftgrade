import { conformsTo, isFunction, isObject, isUndefined } from 'lodash';
import invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
  };
  const injectedSagasCondition = isUndefined(store.injectedSagas) || isObject(store.injectedSagas);
  invariant(
    conformsTo(store, shape) && injectedSagasCondition,
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
