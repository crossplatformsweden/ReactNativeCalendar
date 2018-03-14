// storage/reducers/index
import * as types from '../types';

const initialState: types.IStorageState = {
  key: '',
  value: null,
};

/**
 * Transforms storage actions into Redux state
 * @param {StorageState} state
 * @param {StorageActions.SaveByKeyDispatch} action
 */
const StorageReducer = (state = initialState, action: types.IStorageAction): types.IStorageState => {
  switch (action.type) {
    case types.StorageConstants.STORAGE_GOTKEY:
    case types.StorageConstants.STORAGE_SAVED:
    case types.StorageConstants.STORAGE_REMOVEDKEY:
      return Object.assign({}, state, {
        key: action.key,
        value: action.value,
      });
    default: return state;
  }
};

export default StorageReducer;