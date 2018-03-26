// utility/actions/AppActions.test
/// <reference types="jest"/>
// @ts-ignore - bad mappings
import configureMockStore from 'redux-mock-store';

import { Store } from '../../../Store';
import * as types from '../types/';
import moment from 'moment';
import { CreateAd } from '.';

/**
 * Mock Redux store
 */
const store = configureMockStore<Store>();

// Navigator will call connected components
jest.mock('../../../navigator', () => ({
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

    const expectedActions: types.ICreateAction = {
        type: types.CreateConstants.CREATE_SUCCESS,
        createAd: { fromDate: moment(),
            toDate: moment().add(1, 'h'),
          },
      };

    // @ts-ignore - bad mappings
      store.dispatch(CreateAd());

    // @ts-ignore - bad mappings
    expect(store.getActions()).toMatchSnapshot();
    // @ts-ignore - bad mappings
    expect(store.getActions()).toEqual([expectedActions]);
  });
});