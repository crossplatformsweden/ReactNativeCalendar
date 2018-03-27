// utility/actions/AppActions
import * as Redux from 'redux';
import * as appTypes from '../types';
import Sentry from 'sentry-expo';

/**
 * The app loading state has changed
 *
 * @function AppLoadingChanged
 * @memberof AppActions
 * @public
 * @global
 */
export const AppLoadingChanged = ({
  isBusy,
  reason = null,
  sender = null,
}: appTypes.IUtilityLoadingChangedPayload) => (
  dispatch: Redux.Dispatch<appTypes.IAppLoadingChanged>
) => {
  dispatch({
    type: isBusy
      ? appTypes.UtilityConstants.APP_LOAD_BUSY
      : appTypes.UtilityConstants.APP_LOAD_DONE,
    reason,
    sender,
  });
};

export type AppLoadingChanged = typeof AppLoadingChanged;

/**
 * The app error state has changed
 *
 * @function AppErrorChanged
 * @public
 * @global
 */
export const AppErrorChanged = ({
  hasError,
  reason = null,
  exception = null,
  sender = null,
}: appTypes.IUtilityErrorPayload) => (
  dispatch: Redux.Dispatch<appTypes.IAppErrorChanged>
) => {
  try {
    Sentry.captureException(exception);
  } catch (ex) {
    console.log(ex);
  }
  dispatch({
    type: hasError
      ? appTypes.UtilityConstants.APP_HAS_ERROR
      : appTypes.UtilityConstants.APP_NO_ERROR,
    reason,
    exception,
    sender,
  });
};

export type AppErrorChanged = typeof AppErrorChanged;
