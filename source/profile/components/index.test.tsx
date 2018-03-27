// profile/components/index.test
/// <reference types="jest"/>
import * as React from 'react';
import * as enzyme from 'enzyme';
import { Avatar, FormInput } from 'react-native-elements';
import { ScrollView, Switch } from 'react-native';

import * as types from '../../Types';
import * as ProfileTypes from '../types';
import { LoginTypes } from '../../login';
import { ProfileBase } from '.';
import { BusyIndicator } from '../../utility';
import instance from '../../map/services/index';

jest.unmock('react-native');
jest.unmock('react-native-elements');

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
    autologin: false,
  };
  const props: ProfileTypes.IProfileProps = {
    RemoveKey: jest.fn(),
    login: { isLoggedIn: false },
    utility: { isBusy: false, busyReason: null, hasError: false },
    storage: {
      key: '',
      value: user,
    },
  };

  // @ts-ignore
  const enzymeWrapper = enzyme.shallow(<ProfileBase {...props} />);
  const compInstance = enzymeWrapper.instance() as ProfileBase;

  return {
    props,
    enzymeWrapper,
    compInstance,
  };
}

describe('components', () => {
  describe('Profile', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();

      expect(enzymeWrapper).toMatchSnapshot();

      // Main scroll
      const scroll = enzymeWrapper.find(ScrollView);
      expect(scroll).toBeDefined();

      // User avatar image
      const avatar = enzymeWrapper.find(Avatar);
      expect(avatar).toBeDefined();
      const avatarProps = avatar.props();
      expect(avatarProps.rounded).toBeTruthy();
      expect(avatarProps.large).toBeTruthy();

      // Username
      const userName = enzymeWrapper.find(FormInput).at(0);
      expect(userName).toBeDefined();
      expect(userName.props().value).toEqual('test');
    });

    it('should change autologin when switched', () => {
      const { enzymeWrapper, props, compInstance } = setup();
      expect(compInstance.state.userLocal.autologin).toBeFalsy();

      // Get switch
      const switchComponent = enzymeWrapper.find(Switch).at(0);

      // Change value
      switchComponent.props().onValueChange(true);

      // Evaluate
      expect(compInstance.state.userLocal.autologin).toBeTruthy();
    });
  });
});
