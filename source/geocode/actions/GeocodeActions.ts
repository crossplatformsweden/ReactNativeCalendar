// geocode/actions/index
import * as Redux from 'redux';
import { Constants } from 'expo';
import axios from 'axios';

import * as types from '../types';
import { AppLoadingChanged, AppErrorChanged } from '../../utility';
import _ from 'lodash';

/**
 * The base uri for Google Geocoding API
 * @type {String}
 */
const baseUri =
  `https://maps.googleapis.com/maps/api/geocode/json?key=${Constants.manifest.extra.google.maps}&`;

const geocodeAddress = 'GeocodeAddress';

/**
 * Get coordinates for the specified address
 * @param {string} address - the address to look up
 */
const GeocodeAddress = (address: string) =>
  async (dispatch: Redux.Dispatch<types.IGeocodeAction>) => {
    dispatch(AppLoadingChanged({
      isBusy: true,
      reason: types.GeocodingConstants.GEOCODING_BUSY,
      sender: geocodeAddress,
    }));

    try {
      const request = `${baseUri}address=${address}`;
      console.log('Geocode request:');
      console.log(request);

      const response = await axios.get(request);

      if (_.isNil(response)) {
        dispatch(AppErrorChanged({
          hasError: true,
          reason: types.GeocodingConstants.GEOCODING_FAILED,
          exception: new Error('Geocode invalid data'),
          sender: geocodeAddress,
        }));
        return;
      }

      /**
       * The reponse from Google Geocoding API
       * @type {GeocodeResponse}
       */
      const results: Array<types.Result> = response.data.results;
      let geocodeDispatch: types.IGeocodeAction = {
        type: types.GeocodingConstants.GEOCODING_SUCCESS,
        results,
      };

      dispatch(geocodeDispatch);
      dispatch(AppErrorChanged({ hasError: false, sender: geocodeAddress }));
    } catch (error) {
      dispatch(AppErrorChanged({
        hasError: true,
        reason: types.GeocodingConstants.GEOCODING_FAILED,
        exception: error,
        sender: geocodeAddress,
      }));
    } finally {
      dispatch(AppLoadingChanged({ isBusy: false, sender: geocodeAddress }));
    }
  };

export type GeocodeAddress = typeof GeocodeAddress;

export { axios };
export default GeocodeAddress;