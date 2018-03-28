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

const facebookLogin = 'FacebookLogin';

/**
 * Login to Facebook and store user to AsyncStorage
 * @function FacebookLogin
 * @returns {UserDispatch}
 * @memberof FacebookActions
 * @public
 * @global
 */
export const FacebookLogin = () => async (
  dispatch: Redux.Dispatch<loginTypes.ILoginAction>
) => {
  dispatch(
    AppLoadingChanged({
      isBusy: true,
      reason: loginTypes.LoginConstants.LOGIN_BUSY,
      sender: facebookLogin,
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
      const graphRequest = `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`;
      console.log('FACEBOOK GRAPH API REQUEST');
      console.log(graphRequest);
      const response = await axios.get(
        graphRequest
      );

      /** @type {FacebookActions.User} */
      user = new loginTypes.User(
        token,
        response.data.name,
        response.data.picture.data.url,
        'Facebook'
      );

      const resultAction: loginTypes.ILoginAction = {
        type: loginTypes.LoginConstants.LOGIN_SUCCESS,
        user,
        isLoggedIn: true,
      };

      dispatch(resultAction);

      // Trigger Save to storage action
      await dispatch(
        SaveByKey(StorageTypes.StorageConstants.STORAGE_USER_KEY, user)
      );

      // Reset errors
      dispatch(AppErrorChanged({ hasError: false, sender: facebookLogin }));
    } else if (type === 'cancel') {
      dispatch(
        AppErrorChanged({
          hasError: true,
          reason: 'Login was cancelled',
          exception: new Error(loginTypes.LoginConstants.LOGIN_FAILED),
          sender: facebookLogin,
        })
      );
    }
  } catch (error) {
    dispatch(
      AppErrorChanged({
        hasError: true,
        reason: loginTypes.LoginConstants.LOGIN_FAILED,
        exception: error,
        sender: facebookLogin,
      })
    );
  } finally {
    dispatch(AppLoadingChanged({ isBusy: false, sender: facebookLogin }));
  }
};

export { axios };
