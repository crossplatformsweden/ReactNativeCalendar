// login/actions/GoogleActions
import * as Redux from 'redux';
import * as login from '../types/';

import { SaveByKey } from '../../storage';
import { AppLoadingChanged, AppErrorChanged } from '../../utility';
import { StorageConstants } from '../../storage/types';
import { WebBrowser } from 'expo';

/**
 * The resulting user
 * @type {User}
 * @memberof GoogleActions
 */
let user: login.IUser = null;

const bankIdLogin = 'BankIdLogin';

/**
 * Login with European BankId
 * @function BankIdLogin
 * @returns {UserDispatch}
 * @public
 * @global
 */
// @ts-ignore
export const BankIdLogin = (personalNr: string) => async (
  dispatch: Redux.Dispatch<login.ILoginAction>
) => {
  dispatch(
    AppLoadingChanged({
      isBusy: true,
      reason: login.LoginConstants.LOGIN_BUSY,
      sender: bankIdLogin,
    })
  );

  try {
    // Call bankid
    const result = await WebBrowser.openBrowserAsync(
      'bankid:///?autostarttoken=a4904c4c-3bb4-4e3f-8ac3-0e950e529e5f&' +
      'redirect=https%3a%2f%2fdemo.bankid.com%2fnyademobanken%2fCavaClientRedirReceiver.aspx%3forder' +
      'Ref%3dbedea56d-7b46-47b1-890bf787c650bc93%26returnUrl%3d.%2fCavaClientAuth.aspx%26Environment%3dKundtest'
    );

    // @ts-ignore
    if (result.type === 'success') {
      user = new login.User(
        'result.idToken',
        'result.user.name',
        'result.user.photoUrl',
        'BankId'
      );

      dispatch({
        type: login.LoginConstants.LOGIN_SUCCESS,
        payload: user,
      });

      // Trigger Save to storage action
      await dispatch(SaveByKey(StorageConstants.STORAGE_USER_KEY, user));

      // Reset errors
      dispatch(AppErrorChanged({ hasError: false, sender: bankIdLogin }));
    } else {
      // Cancelled
      dispatch(
        AppErrorChanged({
          hasError: true,
          reason: 'Login was cancelled',
          exception: new Error(login.LoginConstants.LOGIN_FAILED),
          sender: bankIdLogin,
        })
      );
    }
  } catch (error) {
    dispatch(
      AppErrorChanged({
        hasError: true,
        reason: login.LoginConstants.LOGIN_FAILED,
        exception: error,
        sender: bankIdLogin,
      })
    );
  } finally {
    // Reset busy
    dispatch(AppLoadingChanged({ isBusy: false, sender: bankIdLogin }));
  }
};
