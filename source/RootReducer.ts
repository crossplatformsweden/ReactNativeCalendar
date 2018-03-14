import { combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

import * as types from './Types';
import { NavigatorReducer } from './navigator/';
import { LoginReducer } from './login/';
import { UtilityReducer} from './utility';
import { StorageReducer} from './storage';

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
