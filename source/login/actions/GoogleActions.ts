// login/actions/GoogleActions
import { Google, Constants } from 'expo';
import * as Redux from 'redux';
import * as login from '../types/';

import { SaveByKey } from '../../storage';
import { AppLoadingChanged, AppErrorChanged } from '../../utility';
import { StorageConstants } from '../../storage/types';

// Remarks: native will only work on standalone deployment
const config =
 Constants.appOwnership === 'standalone' ? Constants.platform.ios ? {
   iosStandaloneAppClientId: Constants.manifest.extra.google.iosStandaloneAppClientId,
} : {
   androidStandaloneAppClientId: Constants.manifest.extra.google.androidStandaloneAppClientId,
} :
{
  androidClientId: Constants.manifest.extra.google.androidClientId,
  iosClientId: Constants.manifest.extra.google.iosClientId,
  webClientId: Constants.manifest.extra.google.webClientId,
};

/**
 * The resulting user
 * @type {User}
 * @memberof GoogleActions
 */
let user: login.IUser = null;

const googleLogin = 'GoogleLogin';

/**
 * Login to Google and store user to AsyncStorage
 * @function GoogleLogin
 * @returns {UserDispatch}
 * @memberof GoogleActions
 * @public
 * @global
 */
export const GoogleLogin = () => async (dispatch: Redux.Dispatch<login.ILoginAction>) => {
  dispatch(AppLoadingChanged({
    isBusy: true,
    reason: login.LoginConstants.LOGIN_BUSY,
    sender: googleLogin,
  }));

  try {
    const result = await Google.logInAsync(config);
    if (result.type === 'success') {
      /** @type {GoogleActions.User} */
      user = new login.User (
        result.idToken,
        result.user.name,
        result.user.photoUrl,
        'Google'
      );

      const resultAction: login.ILoginAction = {
        type: login.LoginConstants.LOGIN_SUCCESS,
        user,
        isLoggedIn: true,
      };

      dispatch(resultAction);

      // Trigger Save to storage action
      await dispatch(SaveByKey(StorageConstants.STORAGE_USER_KEY, user));
      dispatch(AppErrorChanged({ hasError: false, sender: googleLogin }));
    } else {
      dispatch(AppErrorChanged({
        hasError: true,
        reason: 'Login was cancelled',
        exception: new Error(login.LoginConstants.LOGIN_FAILED),
        sender: googleLogin,
      }));
    }
  } catch (error) {
    dispatch(AppErrorChanged({
      hasError: true,
      reason: login.LoginConstants.LOGIN_FAILED,
      exception: error,
      sender: googleLogin,
    }));
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: googleLogin }));
  }
};