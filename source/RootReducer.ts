import { combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

import * as types from './Types';
import NavigatorReducer from './navigator/reducers';
import LoginReducer from './login/reducers';
import UtilityReducer from './utility/reducers';
import StorageReducer from './storage/reducers';

// Create a persist wrapper of the reducer
// This will be used by redux-persist to restore state on app start
const PersistNavReducer = persistReducer(
  { key: 'routes', storage },
  NavigatorReducer
);
const PersistLoginReducer = persistReducer(
  { key: 'login', storage },
  LoginReducer
);

export default combineReducers<types.IApplicationState>({
  routes: PersistNavReducer,
  utility: UtilityReducer,
  login: PersistLoginReducer,
  storage: StorageReducer,
});
