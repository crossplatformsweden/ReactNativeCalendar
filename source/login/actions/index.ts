import * as types from '../types/';
import * as Redux from 'redux';
import { Constants, Facebook } from 'expo';

export const FacebookLogin = () => async (
  dispatch: Redux.Dispatch<types.ILoginAction>
) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    Constants.manifest.facebookAppId,
    {
      behavior: Constants.appOwnership === 'standalone' ? 'native' : 'web',
    }
  );

  if (type === 'success' && token) {
    /** @type {FacebookActions.User} */
    const user = new types.User(token, 'test', null, 'Facebook');

    dispatch({
      type: types.LoginConstants.LOGIN_SUCCESS,
      payload: user,
    });

    return;
  }

  dispatch({
    type: types.LoginConstants.LOGIN_FAILED,
  });
};
