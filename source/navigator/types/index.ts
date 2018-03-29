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
  //
  // Create ad Screen
  //
  ADCREATE?: Function;
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
   * The Create ad booking
   */
  ADCREATE = 'createAdScreen',
}
