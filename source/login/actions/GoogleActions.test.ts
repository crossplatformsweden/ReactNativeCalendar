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
import * as StorageTypes from '../../storage/types';

/**
 * Mock Redux store
 */
const store = configureMockStore<Store>();

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

describe('Google actions', () => {
  beforeEach(() => {
    // @ts-ignore
    store.clearActions();
  });

  test('GoogleLogin returns SUCCESS when done', async () => {
    const expectedPayload = new loginTypes.User(
      'id',
      'test',
      'http://www.crossplatform,se/',
      'Google'
    );

    const methodName = 'GoogleLogin';
    const methodNameStorageSave = 'SaveByKey';

    const expectedActions = [
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
        loginTypes.LoginConstants.LOGIN_BUSY,
        methodName
      ),
      loginTypes.LoginState(
        loginTypes.LoginConstants.LOGIN_SUCCESS,
        expectedPayload,
        true
      ),
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
        StorageTypes.StorageConstants.STORAGE_BUSY,
        methodNameStorageSave
      ),
      StorageTypes.StorageState(
        StorageTypes.StorageConstants.STORAGE_SAVED,
        StorageTypes.StorageConstants.STORAGE_USER_KEY,
        expectedPayload
      ),
      UtilityTypes.AppErrorChangedAction(
        UtilityTypes.UtilityConstants.APP_NO_ERROR,
        null,
        null,
        methodNameStorageSave
      ),
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_DONE,
        null,
        methodNameStorageSave
      ),
      UtilityTypes.AppErrorChangedAction(
        UtilityTypes.UtilityConstants.APP_NO_ERROR,
        null,
        null,
        methodName
      ),
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_DONE,
        null,
        methodName
      ),
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
