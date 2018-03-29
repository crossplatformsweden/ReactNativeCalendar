// login/components/index
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { SocialIcon } from 'react-native-elements';
import { BusyIndicator } from '../../../utility';
import * as createAdTypes from '../types/';
import * as types from '../../../Types';
import { CalendarPicker } from 'react-native-calendar-picker';
import moment from 'moment';
import { CreateAdBooking } from './';

jest.unmock('react-native');
jest.unmock('react-native-elements');

// Navigator will call connected components
jest.mock('../../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

function setup() {
  const createAd: createAdTypes.ICreateAdPage = {
    fromDate: moment(),
    toDate: moment(),
  };
  const props: types.IProps = {
    GetByKey: jest.fn(),
    FacebookLogin: jest.fn(),
    GoogleLogin: jest.fn(),
    AutoLogin: jest.fn(),
    utility: { isBusy: false, busyReason: null, hasError: false },
    storage: {
      key: '',
      value: null,
    },
  };

  const enzymeWrapper = shallow(<CreateAdBooking {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('CreateAdBooking', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();

      const calend = enzymeWrapper
        .find(CalendarPicker)
        .at(0)
        .props();
        // @ts-ignore
      expect(calend).toBeDefined();
    });

    // it('should be able to press button', () => {
    //   const { enzymeWrapper } = setup();
    //   const buttonFacebook = enzymeWrapper
    //     .find(SocialIcon)
    //     .at(0)
    //     .props();
    //   buttonFacebook.onPress();
    // });

    // it('should be able to press Google button', () => {
    //   const { enzymeWrapper } = setup();
    //   const buttonGoogle = enzymeWrapper
    //     .find(SocialIcon)
    //     .at(1)
    //     .props();
    //   buttonGoogle.onPress();
    // });
  });
});