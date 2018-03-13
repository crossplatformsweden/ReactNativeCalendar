import * as navTypes from './navigator/types';

/**
 * The global application state as contained in Redux
 *
 * All state objects might not be available.
 *
 * @export
 * @interface appTypes.IApplicationState
 */
export interface IApplicationState {
    route?: navTypes.INavigationState;
}

/**
 * Describes possible props for a components.
 *
 * All actions and state objects might not be available.
 *
 * @export
 * @interface IProps
 */
export interface IProps extends IApplicationState {
    // AppLoadingChanged?: appActions.AppLoadingChanged;
    dispatch?: any;
}
