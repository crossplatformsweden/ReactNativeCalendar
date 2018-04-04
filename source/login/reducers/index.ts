// login/reducers/index
import * as login from '../types';

/**
 * Default state
 */
const initialState = login.LoginState();

/**
 * Handle the login actions and return new state
 * @param state the old state
 * @param action login action dispatch
 */
const LoginReducer = (
  state = initialState,
  action: login.ILoginState
): login.ILoginState => {
  switch (action.type) {
    case login.LoginConstants.LOGIN_FAILED:
    case login.LoginConstants.LOGIN_SUCCESS:
    case login.LoginConstants.LOGGED_OUT:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

export default LoginReducer;
