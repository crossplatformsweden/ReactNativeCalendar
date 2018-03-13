/// <reference types="jest"/>
import React from 'react';
import { View, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { shallow } from 'enzyme';

import * as types from '../../types';
import ModalBase, { IProps } from './ModalBase';

jest.unmock('react-native');

function setup() {
  const props: IProps = {
    children: [<View />],
    horizontalPercent: 0.5,
    verticalPercent: 0.5,
    hideClose: false,
  };

  const enzymeWrapper = shallow(<ModalBase {...props} />);

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
  describe('ModelBase', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
