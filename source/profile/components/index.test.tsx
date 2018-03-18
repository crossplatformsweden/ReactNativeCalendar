// profile/components/index.test
/// <reference types="jest"/>
import * as React from 'react';
import * as enzyme from 'enzyme';

import * as types from '../../Types';
import * as ProfileTypes from '../types';
import { LoginTypes } from '../../login';
import { ProfileBase } from '.';
import { BusyIndicator } from '../../utility';

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
  const instance = enzymeWrapper.instance() as ProfileBase;

  return {
    props,
    enzymeWrapper,
    instance,
  };
}

describe('components', () => {
  describe('Profile', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
