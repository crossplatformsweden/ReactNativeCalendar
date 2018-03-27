// utility/components/ComponentBase.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { MapView } from 'expo';

import * as types from '../../Types';
import { LoginTypes } from '../../login';
import { Map } from '../../map/components/MapComponent';
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
    login: { isLoggedIn: false },
    utility: { isBusy: false, busyReason: null, hasError: false },
  };

  // We'll use Map as a concrete implementation of ComponentBase
  const enzymeWrapper = shallow(<Map {...props} />);

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

      const busyProps = enzymeWrapper.find(BusyIndicator).props();
      expect(busyProps.isBusy).toBe(false);
    });

    it('should call lifecycle methods', () => {
      const componentWillMount = jest.spyOn(
        Map.prototype,
        'componentWillMount'
      );
      const componentDidMount = jest.spyOn(Map.prototype, 'componentDidMount');
      const componentWillReceiveProps = jest.spyOn(
        Map.prototype,
        'componentWillReceiveProps'
      );
      const componentDidUpdate = jest.spyOn(
        Map.prototype,
        'componentDidUpdate'
      );

      setup();

      // Test lifecycle methods
      expect(componentWillMount).toHaveBeenCalled();
      expect(componentDidMount).toHaveBeenCalled();

      // Lifecycle methods NOT called first run
      expect(componentWillReceiveProps).not.toHaveBeenCalled();
      expect(componentDidUpdate).not.toHaveBeenCalled();

      componentWillMount.mockReset();
      componentWillMount.mockRestore();
      componentDidUpdate.mockReset();
      componentDidUpdate.mockRestore();
      componentDidMount.mockReset();
      componentDidMount.mockRestore();
      componentWillReceiveProps.mockReset();
      componentWillReceiveProps.mockRestore();
    });
  });
});
