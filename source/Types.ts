import { NavigatorTypes } from './navigator/';
import { LoginTypes } from './login/';
import { UtilityTypes } from './utility/';
import { StorageTypes, SaveByKey, RemoveKey, GetByKey } from './storage';
import { AutoLogin } from './login/actions/LoginActions';

/**
 * The global application state as contained in Redux
 *
 * All state objects might not be available.
 *
 * @export
 * @interface IApplicationState
 */
export interface IApplicationState {
  route?: NavigatorTypes.INavigationState;
  login?: LoginTypes.ILoginState;
  utility?: UtilityTypes.IUtilityState;
  storage?: StorageTypes.IStorageState;
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
  BankIdLogin?: LoginTypes.BankIdLogin;
  GetByKey?: GetByKey;
  RemoveKey?: RemoveKey;
  SaveByKey?: SaveByKey;
  AutoLogin?: AutoLogin;
}
