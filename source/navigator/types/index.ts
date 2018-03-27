export interface INavigationConstants {
  /**
   * The login screen
   */
  LOGIN?: Function;
  /**
   * The main screen
   */
  MAIN?: Function;
  /**
   *  The logged out screen
   */
  LOGOUT?: Function;
  /**
   * the map screen
   */
  MAP?: Function;
  /**
   * The profile screen
   */
  PROFILE?: Function;
  /**
   * The booking screen
   */
  BOOK?: Function;
}

export interface INavigationState extends INavigationConstants {
  /**
   * Current scene object in navigation
   *
   * @type {object}
   * @memberof INavigationReducer
   */
  scene: object;
}

export interface INavigationAction extends INavigationState {
  type: string;
}

/**
 * Navigation constant keys
 */
export enum NavigationConstants {
  /**
   * The login screen
   */
  LOGIN = 'LoginScreen',
  /**
   * The main screen
   */
  MAIN = 'MainScreen',
  /**
   *  The logged out screen
   */
  LOGOUT = 'LogoutScreen',
  /**
   * the map screen
   */
  MAP = 'MapScreen',
  /**
   * The profile screen
   */
  PROFILE = 'ProfileScreen',
  /**
   * The booking screen
   */
  ADBOOK = 'BookingScreen',
}
