// geocode/actions/index.test
/// <reference types="jest"/>
// @ts-ignore
import configureMockStore from 'redux-mock-store';
import * as types from '../types';
import AxiosMockFactory from 'axios-mock-adapter';
import { Constants } from 'expo';

import GeocodeAction, { axios } from './GeocodeActions';
import { UtilityConstants } from '../../utility/types';

const baseUri = `https://maps.googleapis.com/maps/api/geocode/json?key=${
  Constants.manifest.extra.google.maps
}&`;

/**
 * Mock Redux store
 */
const store = configureMockStore();
/**
 * Mocks Axios HTTP requests for GeocodeAction
 */
const axiosMock = new AxiosMockFactory(axios);

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

describe('geocoding actions', () => {
  beforeEach(() => {
    // @ts-ignore
    store.clearActions();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  // Mock Google API response
  const response: types.Geocode = {
      results: new Array<types.Result>({
        address_components: [
          {
            long_name: '1600',
            short_name: '1600',
            types: ['street_number'],
          },
        ],
      }),
  };

  // Mock HTTP request
  const address = 'Globen';
  axiosMock.onGet(`${baseUri}address=${address}`).reply(200, response);

  test('GeocodeAddress returns SUCCESS when done', async () => {
    const geocodeSuccess: types.IGeocodeAction = {
      type: types.GeocodingConstants.GEOCODING_SUCCESS,
      results: response.results,
    };
    const expectedActions = [
      {
        type: UtilityConstants.APP_LOAD_BUSY,
        reason: types.GeocodingConstants.GEOCODING_BUSY,
        sender: 'GeocodeAddress',
      },
      geocodeSuccess,
      {
        type: UtilityConstants.APP_NO_ERROR,
        reason: null,
        exception: null,
        sender: 'GeocodeAddress',
      },
      {
        type: UtilityConstants.APP_LOAD_DONE,
        reason: null,
        sender: 'GeocodeAddress',
      },
    ];

    // Dispatch action with the address parameter
    // @ts-ignore
    await store.dispatch(GeocodeAction(address));

    // Check that expected actions and result dispatch is correct
    // @ts-ignore
    expect(store.getActions()).toEqual(expectedActions);
    // @ts-ignore
    expect(store.getActions()).toMatchSnapshot();
  });
});
