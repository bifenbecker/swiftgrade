import history from 'utils/history';
import configureStore from './configureStore';

const initialState = {};
const store = configureStore(initialState, history);

export default store;
