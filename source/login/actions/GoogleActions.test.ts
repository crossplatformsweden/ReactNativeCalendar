// login/actions/index.test
// @ts-ignore
/// <reference types="jest"/>
import configureMockStore from 'redux-mock-store';
import AxiosMockFactory from 'axios-mock-adapter';

import { Store } from '../../Store';
import * as loginTypes from '../types';
import * as types from '../../Types';
import { GoogleLogin } from '../actions/GoogleActions';
import { UtilityTypes } from '../../utility/';
import { StorageConstants } from '../../storage/types';

/**
 * Mock Redux store
 */
const store = configureMockStore<Store>();

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

function NoError(
  sender: string,
  reason: string = null,
  exception: string = null
) {
  return {
    sender,
    type: UtilityTypes.UtilityConstants.APP_NO_ERROR,
    reason,
    exception,
  };
}

function AppLoading(sender: string, reason: string) {
  return {
    sender,
    reason,
    type: UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
  };
}

function AppLoadDone(sender: string, reason: string = null) {
  return {
    sender,
    type: UtilityTypes.UtilityConstants.APP_LOAD_DONE,
    reason,
  };
}

describe('Google actions', () => {
  beforeEach(() => {
    // @ts-ignore
    store.clearActions();
  });

  test('GoogleLogin returns SUCCESS when done', async () => {
    const expectedPayload = {
      name: 'test',
      picture: 'http://www.crossplatform,se/',
      accessToken: 'id',
      type: 'Google',
    };

    const expectedActions = [
      AppLoading('GoogleLogin', loginTypes.LoginConstants.LOGIN_BUSY),
      {
        type: loginTypes.LoginConstants.LOGIN_SUCCESS,
        payload: expectedPayload,
      },
      AppLoading('SaveByKey', StorageConstants.STORAGE_BUSY),
      {
        type: StorageConstants.STORAGE_SAVED,
        key: StorageConstants.STORAGE_USER_KEY,
        value: expectedPayload,
      },
      NoError('SaveByKey'),
      AppLoadDone('SaveByKey'),
      NoError('GoogleLogin'),
      AppLoadDone('GoogleLogin'),
    ];

    // Dispatch action
    // @ts-ignore
    await store.dispatch(GoogleLogin());

    // @ts-ignore
    expect(store.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(store.getActions()).toEqual(expectedActions);
  });
});
