// login/actions/LoginActions
import * as Redux from 'redux';
import * as login from '../types/';

import { GetByKey } from '../../storage';
import { AppLoadingChanged, AppErrorChanged } from '../../utility';
import { StorageConstants } from '../../storage/types';
import * as LoginTypes from '../../login/types';
import Store from '../../Store';

const className = 'LoginActions';

/**
 * Try to automatically login the user by getting the user from storage
 *
 * Will dispatch login state as "logged in" if user exist
 */
export const AutoLogin = () => async (
  dispatch: Redux.Dispatch<login.ILoginAction>
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
    await dispatch(GetByKey(StorageConstants.STORAGE_USER_KEY));

    const newUser = Store.getState().storage.value as LoginTypes.IUser;

    if (newUser) {
      // Report user as logged in
      const newLoginState: LoginTypes.ILoginAction = {
        type: login.LoginConstants.LOGIN_SUCCESS,
        user: newUser,
        isLoggedIn: true,
      };

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