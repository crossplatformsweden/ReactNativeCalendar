// login/reducers/index
import * as login from '../types';

/**
 * Default state
 */
const initialState: login.ILoginState = {
  user: null,
  isLoggedIn: false,
};

function CreateLoginState(
  isLoggedIn: boolean,
  user: login.IUser
): login.ILoginState {
  return {
    isLoggedIn,
    user,
  };
}

/**
 * Handle the login actions and return new state
 * @param state the old state
 * @param action login action dispatch
 */
const LoginReducer = (
  state = initialState,
  action: login.ILoginAction
): login.ILoginState => {
  switch (action.type) {
    case login.LoginConstants.LOGIN_FAILED:
      return Object.assign({}, state, CreateLoginState(false, null));
    case login.LoginConstants.LOGIN_SUCCESS:
      return Object.assign({}, state, CreateLoginState(true, action.user));
    default:
      return state;
  }
};

export default LoginReducer;
