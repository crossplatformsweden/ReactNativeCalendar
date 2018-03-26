import { NavigatorTypes } from './navigator/';
import { LoginTypes } from './login/';
import { UtilityTypes } from './utility/';
import { StorageTypes, SaveByKey, RemoveKey, GetByKey } from './storage';
import { CreateAdTypes } from './features/create-ad-page';

/**
 * The global application state as contained in Redux
 *
 * All state objects might not be available.
 *
 * @export
 * @interface appTypes.IApplicationState
 */
export interface IApplicationState {
  route?: NavigatorTypes.INavigationState;
  login?: LoginTypes.ILoginState;
  utility?: UtilityTypes.IUtilityState;
  storage?: StorageTypes.IStorageState;
  createAd?: CreateAdTypes.ICreateState;
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
  FacebookLogin?: LoginTypes.FacebookLogin;
  AppErrorChanged?: UtilityTypes.IAppErrorChanged;
  AppLoadingChanged?: UtilityTypes.IAppLoadingChanged;
  GoogleLogin?: LoginTypes.GoogleLogin;
  GetByKey?: GetByKey;
  RemoveKey?: RemoveKey;
  SaveByKey?: SaveByKey;
}
