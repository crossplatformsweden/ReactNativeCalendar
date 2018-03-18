// utility/reducers/index.test

import AppReducer from './';
import * as types from '../types';

const senderFunc = 'AppReducer test';

describe('Utility Reducer', () => {
  const busyReason = 'Busy testing';

  test('should return initial state', () => {
    expect(AppReducer(null, { type: null })).toMatchSnapshot();
  });

  test(`should handle ${types.UtilityConstants.APP_LOAD_BUSY}`, () => {
    expect(
      AppReducer(null, {
        type: types.UtilityConstants.APP_LOAD_BUSY,
        reason: busyReason,
        sender: senderFunc,
      })
    ).toEqual({
      isBusy: true,
      busyReason: busyReason,
      sender: senderFunc,
    });
  });

  test(`should handle ${types.UtilityConstants.APP_LOAD_DONE}`, () => {
    expect(
      AppReducer(null, {
        type: types.UtilityConstants.APP_LOAD_DONE,
        sender: senderFunc,
      })
    ).toEqual({
      sender: senderFunc,
      isBusy: false,
      busyReason: null,
    });
  });

  test(`should handle ${types.UtilityConstants.APP_HAS_ERROR}`, () => {
    expect(
      AppReducer(null, {
        type: types.UtilityConstants.APP_HAS_ERROR,
        reason: 'error',
        exception: 'ex',
        sender: senderFunc,
      })
    ).toEqual({
      exception: 'ex',
      sender: senderFunc,
      hasError: true,
      errorMessage: 'error',
    });
  });

  test(`should handle ${types.UtilityConstants.APP_NO_ERROR}`, () => {
    expect(
      AppReducer(null, {
        type: types.UtilityConstants.APP_NO_ERROR,
        sender: senderFunc,
      })
    ).toEqual({
      errorMessage: null,
      exception: null,
      sender: senderFunc,
      hasError: false,
    });
  });
});
