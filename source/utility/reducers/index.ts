// utility/reducers/index
import * as appTypes from '../types';

const initialAuthState: appTypes.IUtilityState = {
  isBusy: false,
  busyReason: null,
  hasError: false,
  errorMessage: null,
  exception: null,
  sender: null,
};

/**
 * Handles application shared actions
 * @param {Object} state
 * @param {Object} action
 */
const UtilityReducer = (state = initialAuthState, action: appTypes.UtilityActionTypes): appTypes.IUtilityState => {
    let newState: appTypes.IUtilityState = null;
  switch (action.type) {
    case appTypes.UtilityConstants.APP_LOAD_BUSY:
    newState = {
        ...state,
        isBusy: true,
        busyReason: action.reason,
        sender: action.sender,
      };
      return Object.assign({}, state, newState);
    case appTypes.UtilityConstants.APP_LOAD_DONE:
    newState = {
        ...state,
        isBusy: false,
        busyReason: null,
        sender: action.sender,
      };
      return Object.assign({}, state, newState);
    case appTypes.UtilityConstants.APP_HAS_ERROR:
    newState = {
        ...state,
        hasError: true,
        errorMessage: action.reason,
        exception: (<appTypes.IAppErrorChanged>action).exception,
        sender: action.sender,
      };
      return Object.assign({}, state, newState);
    case appTypes.UtilityConstants.APP_NO_ERROR:
     newState =  {
        ...state,
        hasError: false,
        errorMessage: null,
        sender: action.sender,
        exception: null,
      };
      return Object.assign({}, state, newState);
    default:
      return state;
  }
};

export default UtilityReducer;
