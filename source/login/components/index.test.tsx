// login/components/index
import React from 'react';
import { TextInput } from 'react-native';
import { shallow } from 'enzyme';

import * as types from '../../types';
import { Login } from './';

jest.unmock('react-native');

function setup() {
  const props: types.IProps = {
    login: { isLoggedIn: false },
    utility: { isBusy: false, hasError: false, errorMessage: null },
  };

  const enzymeWrapper = shallow(<Login {...props} />);

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
  describe('Login', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
