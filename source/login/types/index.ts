// login/types/index
import { FacebookLogin, GoogleLogin, BankIdLogin } from '../actions';
import _ from 'lodash';

export type FacebookLogin = typeof FacebookLogin;

export type GoogleLogin = typeof GoogleLogin;

export type BankIdLogin = typeof BankIdLogin;

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
  username?: string;
  password?: string;
  email?: string;
  autologin?: boolean;
}

export class User implements IUser {
  constructor(
    readonly accessToken: string = null,
    readonly name: string = null,
    readonly picture: string = '',
    readonly type: string = null,
    readonly username: string = null,
    readonly password: string = null,
    readonly email: string = null,
    readonly autologin: boolean = false
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
   */
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',

  /**
   * Login state: authentication in progress
   */
  LOGIN_BUSY = 'Kollar vem du är',

  /**
   * Login state: logged out of app
   */
  LOGGED_OUT = 'LOGGED_OUT',

  /**
   * Login state: login was cancelled by user
   */
  LOGIN_CANCELLED = 'Inloggning avbruten',
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

  /**
   * Action type constant string
   *
   * @type {LoginConstants}
   * @memberof ILoginState
   */
  type: LoginConstants;
}

/**
 * Returns a {ILoginState} object
 * @param type Action type
 * @param user User object
 * @param isLoggedIn Determines if the user is logged in
 */
export const LoginState = (
  type: LoginConstants = null,
  user: IUser = null,
  isLoggedIn: boolean = false
): ILoginState => {
  const r: ILoginState = {
    type: type,
    user: _.isNil(user) ? new User() : user,
    isLoggedIn: isLoggedIn,
  };
  return r;
};
