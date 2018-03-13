export interface INavigationState {
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
