// storage/actions/index.test
import configureMockStore from 'redux-mock-store';

import { Store } from '../../Store';
import * as storageTypes from '../types';
import {UtilityTypes} from '../../utility';
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
    const expectedActions = [
      { type: UtilityTypes.UtilityConstants.APP_LOAD_BUSY, reason: storageTypes.StorageConstants.STORAGE_BUSY, sender: 'RemoveKey' },
      { type: storageTypes.StorageConstants.STORAGE_REMOVEDKEY, key },
      { type: UtilityTypes.UtilityConstants.APP_LOAD_DONE, reason: null, sender: 'RemoveKey' },
    ];

    // @ts-ignore
    await storeMock.dispatch(RemoveKey(key));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });

  test('SaveByKey returns  expected actions', async () => {
    const model = { name: 'test name', phone: '555-222 33' };
    const expectedPayload = {
      key: 'test key',
      model,
    };

    const expectedActions = [
      { type: UtilityTypes.UtilityConstants.APP_LOAD_BUSY, reason: storageTypes.StorageConstants.STORAGE_BUSY, sender: 'SaveByKey' },
      {
        type: storageTypes.StorageConstants.STORAGE_SAVED,
        key: expectedPayload.key,
        value: model,
      },
      {
        type: UtilityTypes.UtilityConstants.APP_NO_ERROR, reason: null, exception: null, sender: 'SaveByKey',
      },
      { type: UtilityTypes.UtilityConstants.APP_LOAD_DONE, reason: null, sender: 'SaveByKey' },
    ];

    // Dispatch action
    // @ts-ignore
    await storeMock.dispatch(SaveByKey(expectedPayload.key, model));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });

  test('GetByKey returns expected actions', async () => {
    const key = 'GetByKey';
    const expectedModel = {
      key,
    };

    const expectedActions = [

      { type: UtilityTypes.UtilityConstants.APP_LOAD_BUSY, reason: storageTypes.StorageConstants.STORAGE_BUSY, sender: key },
      {
        type: storageTypes.StorageConstants.STORAGE_GOTKEY,
        key,
        value: expectedModel,
      },
      {
        type: UtilityTypes.UtilityConstants.APP_NO_ERROR, reason: null, exception: null, sender: key,
      },
      { type: UtilityTypes.UtilityConstants.APP_LOAD_DONE, reason: null, sender: key },
    ];

    // @ts-ignore
    await storeMock.dispatch(GetByKey(key));

    // @ts-ignore
    expect(storeMock.getActions()).toMatchSnapshot();
    // @ts-ignore
    expect(storeMock.getActions()).toEqual(expectedActions);
  });
});
