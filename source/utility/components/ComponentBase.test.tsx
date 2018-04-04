// utility/components/ComponentBase.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as types from '../../Types';
import { LoginTypes } from '../../login';
import { Main } from '../../main/components/';
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
    login: { isLoggedIn: false, type: null },
    utility: { isBusy: false, busyReason: null, hasError: false },
  };

  // We'll use Map as a concrete implementation of ComponentBase
  const enzymeWrapper = shallow(<Main {...props} />);

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
        Main.prototype,
        'componentWillMount'
      );
      const componentDidMount = jest.spyOn(Main.prototype, 'componentDidMount');
      const componentWillReceiveProps = jest.spyOn(
        Main.prototype,
        'componentWillReceiveProps'
      );
      const componentDidUpdate = jest.spyOn(
        Main.prototype,
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
