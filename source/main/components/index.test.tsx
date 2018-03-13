/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';

import * as types from '../../types';
import { Main } from './';

jest.unmock('react-native');

function setup() {
  const props: types.IProps = {};

  const enzymeWrapper = shallow(<Main {...props} />);

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
