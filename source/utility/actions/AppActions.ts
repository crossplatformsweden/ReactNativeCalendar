// utility/actions/AppActions
import * as Redux from 'redux';
import * as types from '../types';
import Sentry from 'sentry-expo';
import _ from 'lodash';

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
}: types.IUtilityLoadingChangedPayload) => (
  dispatch: Redux.Dispatch<types.IAppLoadingChangedAction>
) => {
  dispatch(
    types.AppLoadingChangedAction(
      isBusy
        ? types.UtilityConstants.APP_LOAD_BUSY
        : types.UtilityConstants.APP_LOAD_DONE,
      reason,
      sender
    )
  );
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
}: types.IAppErrorPayload) => (
  dispatch: Redux.Dispatch<types.IAppErrorChangedAction>
) => {
  if (!_.isNil(exception)) {
    try {
      Sentry.captureException(exception);
    } catch (ex) {
      console.log(ex);
    }
  }
  dispatch(
    types.AppErrorChangedAction(
      hasError
        ? types.UtilityConstants.APP_HAS_ERROR
        : types.UtilityConstants.APP_NO_ERROR,
      exception,
      reason,
      sender
    )
  );
};

export type AppErrorChanged = typeof AppErrorChanged;
