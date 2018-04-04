// geocode/reducers/index
import * as types from '../types';

/**
 * Default state for geocoding
 * @type {GeocodingActions.GeocodeDispatch}
 */
const initialState: types.IGeocodeState = {
  results: null,
};

/**
 * Transforms geolocation actions into Redux state
 * @param {GeolocationState} state
 * @param {GeocodingActions.GeocodeDispatch} action
 */
const GeoReducer = (
  state = initialState,
  action: types.IGeocodeAction
): types.IGeocodeState => {
  switch (action.type) {
    case types.GeocodingConstants.GEOCODING_SUCCESS:
      const newState: types.IGeocodeState = {
        results: action.results,
      };

      return Object.assign({}, state, newState);
    default:
      return state;
  }
};

export default GeoReducer;
