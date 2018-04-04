import { NavigatorTypes } from './navigator/';
import { LoginTypes } from './login/';
import { UtilityTypes } from './utility/';
import { StorageTypes, SaveByKey, RemoveKey, GetByKey } from './storage';
import { GeocodeTypes, GeocodeAddress } from './geocode';
import { AutoLogin, Logout } from './login/actions/';

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
  geocoding?: GeocodeTypes.IGeocodeState;
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
  AppErrorChanged?: UtilityTypes.IAppErrorChangedAction;
  AppLoadingChanged?: UtilityTypes.IAppLoadingChangedAction;
  GoogleLogin?: LoginTypes.GoogleLogin;
  GeocodeAddress?: GeocodeAddress;
  BankIdLogin?: LoginTypes.BankIdLogin;
  GetByKey?: GetByKey;
  RemoveKey?: RemoveKey;
  SaveByKey?: SaveByKey;
  AutoLogin?: AutoLogin;
  Logout?: Logout;
}
