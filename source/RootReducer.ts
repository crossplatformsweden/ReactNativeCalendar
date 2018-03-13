import { combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

import * as types from './Types';
import NavReducer from './navigator/reducers';

// Create a persist wrapper of the reducer
// This will be used by redux-persist to restore state on app start
const PersistNavReducer = persistReducer({ key: 'routes', storage }, NavReducer);

export default combineReducers<types.IApplicationState>({
    routes: PersistNavReducer,
    });