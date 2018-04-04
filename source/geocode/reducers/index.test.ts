// geocode/reducers/index.test
/// <reference types="jest"/>
import GeocodingReducer from './';
import * as types from '../types';

describe('GeocodingReducer', () => {
  test('should return the initial state', () => {
    expect(GeocodingReducer(undefined, { type: null })).toMatchSnapshot();
  });

  test(`should handle ${types.GeocodingConstants.GEOCODING_SUCCESS}`, () => {
    const resultAddress = new Array<types.Result>({
      address_components: [
        {
          long_name: '1600',
          short_name: '1600',
          types: ['street_number'],
        },
      ],
    });

    const expectedState: types.IGeocodeState = {
      results: resultAddress,
    };

    const geoCodeAction: types.IGeocodeAction = {
      type: types.GeocodingConstants.GEOCODING_SUCCESS,
      results: resultAddress,
    };

    expect(GeocodingReducer(undefined, geoCodeAction)).toEqual(expectedState);
  });
});
