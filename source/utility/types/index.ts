// utility/types/index

/**
 * Describes a sending method
 *
 * @export
 * @interface IUtilitySender
 */
export interface ISenderMethod {
  /**
   * Optional sending method name
   *
   * @type {string?}
   * @memberof IUtilityLoadingChangedPayload
   */
  sender?: string;
}

/**
 * A payload with optional strings from reason message and sending function
 *
 * @export
 * @interface IUtilityLoadingChangedPayload
 */
export interface IReasonSender extends ISenderMethod {
  /**
   * Optional message for user
   *
   * @type {string?}
   * @memberof IUtilityLoadingChangedPayload
   */
  reason?: string;
}

/**
 * Utility action types
 * @namespace
 * @public
 * @typedef UtilityConstants
 * @type {Object}
 */
export enum UtilityConstants {
  /**
   * App is busy loading
   * @memberof UtilityConstants
   * @constant
   */
  APP_LOAD_BUSY = 'APP = BUSY LOADING',
  /**
   * App is done loading
   * @memberof UtilityConstants
   * @constant
   */
  APP_LOAD_DONE = 'APP = DONE LOADING',
  /**
   * App has error(s)
   * @memberof UtilityConstants
   * @constant
   */
  APP_HAS_ERROR = 'APP = HAS ERROR',
  /**
   * App has no errors
   * @memberof UtilityConstants
   * @constant
   */
  APP_NO_ERROR = 'APP NO ERROR',
}

/**
 * App loading changed action dispatch
 * @typedef IUtilityLoadingChangedActionAction
 * @public
 * @export
 * @property {UtilityConstants} type
 * @property {string?} reason
 * @property {sender?} sender
 */
export interface IAppLoadingChanged extends IReasonSender {
  type: UtilityConstants;
}

export interface IUtilityLoadingChangedPayload extends IReasonSender {
  /**
   * The new busy state
   *
   * @type {boolean}
   * @memberof IUtilityLoadingChangedPayload
   */
  isBusy: boolean;
}

/**
 * Describes an exception caused by the app
 *
 * @export
 * @interface IUtilityException
 * @extends {IReasonSender}
 */
export interface IUtilityException extends IReasonSender {
  /**
   * The exception that occured if any
   *
   * @type {string?}
   * @memberof IUtilityException
   */
  exception?: string;
}

export interface IUtilityErrorPayload extends IUtilityException {
  /**
   * New error state
   *
   * @type {boolean}
   * @memberof IUtilityErrorPayload
   */
  hasError: boolean;
}

/**
 * Dispatch from utility action
 *
 * @export
 * @interface IUtilityErrorAction
 * @extends {IUtilityException}
 */
export interface IAppErrorChanged extends IUtilityException {
  type: UtilityConstants;
}

/**
 * The possible actions in the Utility module
 */
export type UtilityActionTypes =
  | IAppErrorChanged
  | IAppLoadingChanged;

/**
 * Redux state object containing utility properties
 *
 * @export
 * @interface IUtilityState
 * @extends {ISenderMethod}
 */
export interface IUtilityState extends ISenderMethod {
  /**
   * app busy state
   *
   * @type {boolean}
   * @memberof IUtilityReducer
   */
  isBusy: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof IUtilityReducer
   */
  hasError: boolean;
  /**
   *
   *
   * @type {string}
   * @memberof IUtilityReducer
   */
  errorMessage?: string;
  /**
   * Optional message for user
   *
   * @type {string}
   * @memberof IUtilityReducer
   */
  busyReason?: string;
  /**
   * The exception that occured if any
   *
   * @type {string}
   * @memberof IUtilityException
   */
  exception?: string;
}
