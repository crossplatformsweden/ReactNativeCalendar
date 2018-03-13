import { combineReducers } from 'redux';
// import storage from 'redux-persist/es/storage';
// import { persistReducer } from 'redux-persist';

import * as types from './Types';
import NavReducer from './navigator/reducers';

// const PersistLoginReducer = persistReducer({ key: 'login', storage }, LoginReducer);

export default combineReducers<types.IApplicationState>({
    // reducerName: reducers here
    routes: NavReducer,
    });