// login/actions/index
import * as Redux from 'redux';
import axios from 'axios';
import { Constants, Facebook } from 'expo';

import * as loginTypes from '../types/';
import { AppErrorChanged, AppLoadingChanged } from '../../utility/';
import { StorageTypes, SaveByKey } from '../../storage';

/**
 * The resulting user
 * @type {User}
 * @memberof FacebookActions
 */
let user: loginTypes.IUser = null;

const methodName = 'FacebookLogin';

/**
 * Login to Facebook and store user to AsyncStorage
 * @function FacebookLogin
 * @returns {UserDispatch}
 * @memberof FacebookActions
 * @public
 * @global
 */
export const FacebookLogin = () => async (
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
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      Constants.manifest.facebookAppId,
      {
        behavior: Constants.appOwnership === 'standalone' ? 'native' : 'web',
      }
    );

    if (type === 'success' && token) {
      // Get the user's name using Facebook's Graph API
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`
      );

      /** @type {FacebookActions.User} */
      user = new loginTypes.User(
        token,
        response.data.name,
        response.data.picture.data.url,
        'Facebook'
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
    } else if (type === 'cancel') {
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

export { axios };
