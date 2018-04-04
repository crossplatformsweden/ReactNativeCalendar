// login/actions/LoginActions
import { Actions } from 'react-native-router-flux';
import * as Redux from 'redux';

import Store from '../../Store';
import * as login from '../types/';
import * as loginTypes from '../../login/types';
import { GetByKey, RemoveKey, StorageTypes } from '../../storage';
import { AppLoadingChanged, AppErrorChanged } from '../../utility';

const className = 'LoginActions';

/**
 * Try to automatically login the user by getting the user from storage
 *
 * Will dispatch login state as "logged in" if user exist
 */
export const AutoLogin = () => async (
  dispatch: Redux.Dispatch<login.ILoginState>
) => {
  const userState = Store.getState().login;
  if (userState.user && userState.isLoggedIn) {
    // Already logged in
    return;
  }

  try {
    // Get user from storage
    dispatch(
      AppLoadingChanged({
        isBusy: true,
        reason: login.LoginConstants.LOGIN_BUSY,
        sender: className,
      })
    );

    // Get user from storage
    await dispatch(GetByKey(StorageTypes.StorageConstants.STORAGE_USER_KEY));

    const newUser = Store.getState().storage.value as loginTypes.IUser;

    if (newUser) {
      // Report user as logged in
      const newLoginState = loginTypes.LoginState(
        login.LoginConstants.LOGIN_SUCCESS,
        newUser,
        true
      );

      dispatch(newLoginState);

      // Reset errors
      dispatch(AppErrorChanged({ hasError: false, sender: className }));
    }
  } catch (error) {
    dispatch(
      AppErrorChanged({
        hasError: true,
        reason: login.LoginConstants.LOGIN_FAILED,
        exception: error,
        sender: className,
      })
    );
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: className }));
  }
};

export type AutoLogin = typeof AutoLogin;

/**
 * Logout the user by removing from state and navigating to login screen
 */
export const Logout = () => async (
  dispatch: Redux.Dispatch<login.ILoginState>
) => {
  // Remove user from storage
  await dispatch(RemoveKey(StorageTypes.StorageConstants.STORAGE_USER_KEY));

  // Set state to logged out
  dispatch(
    loginTypes.LoginState(loginTypes.LoginConstants.LOGGED_OUT, null, false)
  );

  // Display login screen
  Actions.LoginScreen();
};

export type Logout = typeof Logout;
