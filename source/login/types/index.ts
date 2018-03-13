import { FacebookLogin } from '../actions';

export type FacebookLogin = typeof FacebookLogin;

/**
 * A user object created when logging in
 * @typedef IUser
 * @type {Object}
 * @public
 * @export
 * @property {string} accessToken - social provider access token
 * @property {string} name - full name of the user
 * @property {string} picture - profile picture url if any
 * @property {string} type - Facebook, Google etc
 * @public
 */
export interface IUser {
  accessToken: string;
  name: string;
  picture?: string;
  type: string;
}

export class User implements IUser {
  constructor(
    readonly accessToken: string,
    readonly name: string,
    readonly picture: string = '',
    readonly type: string
  ) {}
}

/**
 * LoginReducer constant string keys
 *
 * @namespace
 * @public
 * @typedef LoginConstants
 * @type {Object}
 */
export enum LoginConstants {
  /**
   * Login failed or was cancelled
   */
  LOGIN_FAILED = 'LOGIN_FAILED',
  /**
   * Login state: authentication succeeded
   *
   * @static
   * @memberof LoginConstants
   */
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',

  /**
   * Login state: authentication in progress
   *
   * @static
   * @memberof LoginConstants
   */
  LOGIN_BUSY = 'Kollar vem du är',
}

export interface ILoginState {
  /**
   * The user payload recived from login if any
   *
   * @type {IUser}
   * @memberof ILoginReducer
   */
  user?: IUser;
  /**
   * Determines if the user is successfully logged in
   *
   * @type {boolean}
   * @memberof ILoginReducer
   */
  isLoggedIn: boolean;
}

export interface ILoginAction extends ILoginState {
  type: LoginConstants;
}
