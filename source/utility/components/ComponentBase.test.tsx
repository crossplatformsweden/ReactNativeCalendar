// utility/components/ComponentBase.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as types from '../../Types';
import { Login, LoginTypes } from '../../login';
import BusyIndicator from './BusyIndicator';

jest.unmock('react-native');

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

function setup() {

  const user: LoginTypes.IUser = {
    accessToken: '1',
    name: 'test',
    picture: '',
    type: 'Google',
  };
  const props: types.IProps = {
    GetByKey: jest.fn(),
    FacebookLogin: jest.fn(),
    GoogleLogin: jest.fn(),
    utility: { isBusy: false, busyReason: null, hasError: false },
    login: {
      user,
      isLoggedIn: false,
    },
    storage: {
      key: '',
      value: null,
    },
  };

  // We'll use Map as a concrete implementation of ComponentBase
  const enzymeWrapper = shallow(<Login {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('ComponentBase', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();

      // Test busy indicator in base class
      const busyProps = enzymeWrapper.find(BusyIndicator).props();
      expect(busyProps.isBusy).toBe(false);
    });
  });
});
