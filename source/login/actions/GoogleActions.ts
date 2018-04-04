// login/actions/GoogleActions
import { Google, Constants } from 'expo';
import * as Redux from 'redux';
import * as loginTypes from '../types/';

import { AppLoadingChanged, AppErrorChanged } from '../../utility';
import { StorageTypes, SaveByKey } from '../../storage';

// Remarks: native will only work on standalone deployment
const config =
  Constants.appOwnership === 'standalone'
    ? Constants.platform.ios
      ? {
          iosStandaloneAppClientId:
            Constants.manifest.extra.google.iosStandaloneAppClientId,
        }
      : {
          androidStandaloneAppClientId:
            Constants.manifest.extra.google.androidStandaloneAppClientId,
        }
    : {
        androidClientId: Constants.manifest.extra.google.androidClientId,
        iosClientId: Constants.manifest.extra.google.iosClientId,
        webClientId: Constants.manifest.extra.google.webClientId,
      };

/**
 * The resulting user
 * @type {User}
 * @memberof GoogleActions
 */
let user: loginTypes.IUser = null;

const methodName = 'GoogleLogin';

/**
 * Login to Google and store user to AsyncStorage
 * @function GoogleLogin
 * @returns {UserDispatch}
 * @memberof GoogleActions
 * @public
 * @global
 */
export const GoogleLogin = () => async (
  dispatch: Redux.Dispatch<loginTypes.ILoginState>
) => {
  dispatch(
    AppLoadingChanged({
      isBusy: true,
      reason: loginTypes.LoginConstants.LOGIN_BUSY,
      sender: methodName,
    })
  );

  try {
    const result = await Google.logInAsync(config);
    if (result.type === 'success') {
      /** @type {GoogleActions.User} */
      user = new loginTypes.User(
        result.idToken,
        result.user.name,
        result.user.photoUrl,
        'Google'
      );

      dispatch(
        loginTypes.LoginState(
          loginTypes.LoginConstants.LOGIN_SUCCESS,
          user,
          true
        )
      );

      // Trigger Save to storage action
      await dispatch(
        SaveByKey(StorageTypes.StorageConstants.STORAGE_USER_KEY, user)
      );

      // Reset errors
      dispatch(AppErrorChanged({ hasError: false, sender: methodName }));
    } else {
      dispatch(
        loginTypes.LoginState(
          loginTypes.LoginConstants.LOGIN_CANCELLED,
          null,
          false
        )
      );
    }
  } catch (error) {
    dispatch(
      AppErrorChanged({
        hasError: true,
        reason: loginTypes.LoginConstants.LOGIN_FAILED,
        exception: error,
        sender: methodName,
      })
    );
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: methodName }));
  }
};
