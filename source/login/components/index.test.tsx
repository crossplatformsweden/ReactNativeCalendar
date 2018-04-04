// login/components/index
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { SocialIcon } from 'react-native-elements';

import { LoginBase } from './';
import { BusyIndicator, UtilityTypes } from '../../utility';
import * as loginTypes from '../types/';
import { StorageTypes } from '../../storage';
import * as types from '../../Types';

jest.unmock('react-native');
jest.unmock('react-native-elements');

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

function setup() {
  const user = new loginTypes.User('1', 'test', '', 'Google');

  const props: types.IProps = {
    GetByKey: jest.fn(),
    FacebookLogin: jest.fn(),
    GoogleLogin: jest.fn(),
    AutoLogin: jest.fn(),
    utility: { isBusy: false, busyReason: null, hasError: false },
    login: loginTypes.LoginState(
      loginTypes.LoginConstants.LOGIN_SUCCESS,
      user,
      false
    ),
    storage: StorageTypes.StorageState(),
  };

  const enzymeWrapper = shallow(<LoginBase {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('Login', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();

      const buttonFacebook = enzymeWrapper
        .find(SocialIcon)
        .at(0)
        .props();
      expect(buttonFacebook.type).toEqual('facebook');

      const buttonGoogle = enzymeWrapper
        .find(SocialIcon)
        .at(1)
        .props();
      expect(buttonGoogle.type).toEqual('google-plus-official');
    });

    it('should be able to press Facebook button', () => {
      const { enzymeWrapper } = setup();
      const buttonFacebook = enzymeWrapper
        .find(SocialIcon)
        .at(0)
        .props();
      buttonFacebook.onPress();
    });

    it('should be able to press Google button', () => {
      const { enzymeWrapper } = setup();
      const buttonGoogle = enzymeWrapper
        .find(SocialIcon)
        .at(1)
        .props();
      buttonGoogle.onPress();
    });
  });
});
