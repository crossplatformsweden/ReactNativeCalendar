// storage/reducers/index
import * as types from '../types';

const initialState = types.StorageState();

/**
 * Transforms storage actions into Redux state
 * @param {StorageState} state
 * @param {StorageActions.SaveByKeyDispatch} action
 */
const StorageReducer = (state = initialState, action: types.IStorageState): types.IStorageState => {
  switch (action.type) {
    case types.StorageConstants.STORAGE_GOTKEY:
    case types.StorageConstants.STORAGE_SAVED:
    case types.StorageConstants.STORAGE_REMOVEDKEY:
    case types.StorageConstants.STORAGE_NOSUCHKEY:
      return Object.assign({}, state, action);
    default: return state;
  }
};

export default StorageReducer;