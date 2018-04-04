// utility/actions/AppActions.test
/// <reference types="jest"/>
// @ts-ignore - bad mappings
import configureMockStore from 'redux-mock-store';

import { Store } from '../../Store';
import * as types from '../types/';
import { AppLoadingChanged, AppErrorChanged } from './';
import { AppErrorChangedAction } from '../types/index';

/**
 * Mock Redux store
 */
const store = configureMockStore<Store>();

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

describe('App actions', () => {
  beforeEach(() => {
    // @ts-ignore - bad mappings
    store.clearActions();
  });

  test('AppLoadingChanged dispatches busy reason', () => {
    const busyReason = 'Loading test';

    const expectedActions = [
      types.AppLoadingChangedAction(
        types.UtilityConstants.APP_LOAD_BUSY,
        busyReason,
        'TestMethod'
      ),
    ];

    // Dispatch action
    // @ts-ignore - bad mappings
    store.dispatch(
      AppLoadingChanged({
        isBusy: true,
        reason: busyReason,
        sender: 'TestMethod',
      })
    );

    // @ts-ignore - bad mappings
    expect(store.getActions()).toMatchSnapshot();
    // @ts-ignore - bad mappings
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('AppErrorChanged dispatches error message', () => {
    const errorMessage = 'Error test';

    const expectedActions = [ types.AppErrorChangedAction(
      types.UtilityConstants.APP_HAS_ERROR,
      null,
      errorMessage,
      null
   )];

    // Dispatch action
    // @ts-ignore - bad mappings
    store.dispatch(
      AppErrorChanged({
        hasError: true,
        reason: errorMessage,
        sender: null,
      })
    );

    // @ts-ignore - bad mappings
    expect(store.getActions()).toMatchSnapshot();
    // @ts-ignore - bad mappings
    expect(store.getActions()).toEqual(expectedActions);
  });
});
