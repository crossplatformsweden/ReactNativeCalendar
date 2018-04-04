// storage/actions/index.test
/// <reference types="jest"/>
import configureMockStore from 'redux-mock-store';

import { Store } from '../../Store';
import * as types from '../types';
import { UtilityTypes } from '../../utility';
import { SaveByKey, GetByKey, RemoveKey } from './';

/**
 * Mock Redux store
 */
const storeMock = configureMockStore<Store>();

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

describe('Storage actions', () => {
  beforeEach(() => {
    // @ts-ignore
    storeMock.clearActions();
  });

  test('RemoveKey returns expected actions', async () => {
    const key = 'RemoveKey';
    const methodName = 'RemoveKey';
    const expectedActions = [
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
        types.StorageConstants.STORAGE_BUSY,
        methodName
      ),
      types.StorageState(types.StorageConstants.STORAGE_REMOVEDKEY, key),
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

    // @ts-ignore
    await storeMock.dispatch(RemoveKey(key));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });

  test('SaveByKey returns  expected actions', async () => {
    const methodName = 'SaveByKey';
    const model = { name: 'test name', phone: '555-222 33' };
    const testKey = 'test key';

    const expectedActions = [
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
        types.StorageConstants.STORAGE_BUSY,
        methodName
      ),
      types.StorageState(types.StorageConstants.STORAGE_SAVED, testKey, model),
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
    await storeMock.dispatch(SaveByKey(testKey, model));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });

  test('GetByKey returns expected actions', async () => {
    const methodName = 'GetByKey';
    const model = {
      key: methodName,
    };

    const expectedActions = [
      UtilityTypes.AppLoadingChangedAction(
        UtilityTypes.UtilityConstants.APP_LOAD_BUSY,
        types.StorageConstants.STORAGE_BUSY,
        methodName
      ),
      types.StorageState(types.StorageConstants.STORAGE_GOTKEY, methodName, model),
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

    // @ts-ignore
    await storeMock.dispatch(GetByKey(methodName));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });
});
