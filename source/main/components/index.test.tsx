// main/components/index.test
import React from 'react';
import { shallow } from 'enzyme';

import * as types from '../../types';
import { MainBase } from './';

jest.unmock('react-native');

// Navigator will call connected components
jest.mock('../../navigator', () => ({
  Routes: 'View',
  AppNavigator: 'Button',
}));

function setup() {
  const props: types.IProps = {
    login: {
      user: null,
      isLoggedIn: false,
    },
  };

  const enzymeWrapper = shallow(<MainBase {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('Main', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
