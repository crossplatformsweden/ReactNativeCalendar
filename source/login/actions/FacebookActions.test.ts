// login/actions/index.test
// @ts-ignore
/// <reference types="jest"/>
import configureMockStore from 'redux-mock-store';
import AxiosMockFactory from 'axios-mock-adapter';

import { Store } from '../../Store';
import * as loginTypes from '../types';
import * as types from '../../Types';
import { FacebookLogin, axios } from '../actions/FacebookActions';
import { UtilityTypes } from '../../utility/';
import { StorageTypes } from '../../storage';

/**
 * Mock Redux store
 */
const storeMock = configureMockStore<Store>();
/**
 * Mocks Axios HTTP requests for FacebookActions
 */
const axiosMock = new AxiosMockFactory(axios);

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

describe('Facebook actions', () => {
  beforeEach(() => {
    // @ts-ignore
    storeMock.clearActions();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('FacebookLogin returns SUCCESS when done', async () => {
    const token = 'fbTokenMock';
    const expectedReply = {
      name: 'MockName',
      picture: {
        data: {
          url: 'http://mockImageUrl/',
        },
      },
    };

    axiosMock
      .onGet(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`
      )
      .reply(200, expectedReply);

    const expectedPayload = new loginTypes.User(
      token,
      expectedReply.name,
      expectedReply.picture.data.url,
      'Facebook',
      null,
      null,
      null,
      false
    );

    const StorageSavedAction = StorageTypes.StorageState(
      StorageTypes.StorageConstants.STORAGE_SAVED,
      StorageTypes.StorageConstants.STORAGE_USER_KEY,
      expectedPayload
    );

    const methodName = 'FacebookLogin';
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
    await storeMock.dispatch(FacebookLogin());

    // @ts-ignore
    const actionResult = storeMock.getActions();

    expect(actionResult).toMatchSnapshot();

    // @ts-ignore
    expect(actionResult).toEqual(expectedActions);
  });
});
