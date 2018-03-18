// utility/components/ComponentBase
import * as React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormValidationMessage } from 'react-native-elements';

import BusyIndicator from './BusyIndicator';
import * as types from '../../Types';
import { NavigatorTypes } from '../../navigator';
import Theme from '../../styles';

/**
 * Base class for componets. Has authentication logic built in (requires props to contain "login"
 *
 * @export
 * @abstract
 * @class ComponentBase
 * @extends {Component<{}, {}>}
 */
const componentBase = <P, S>(WrappedComponent: React.ComponentType<P>) =>
  class ComponentBase extends React.Component<P, S> {
    protected constructor(props: P) {
      super(props);
    }

    /**
     * Check login state and navigate if needed
     *
     * @memberof ComponentBase
     */
    protected checkLogin() {
      const iProps = this.props as types.IProps;
      if (iProps && iProps.login && iProps.login.isLoggedIn && Actions) {
        if (
          Actions.currentScene === NavigatorTypes.NavigationConstants.LOGIN &&
          Actions &&
          Actions.pop
        ) {
          // Close login modal
          Actions.pop();
        }
      } else if (Actions.LoginScreen) {
        Actions.LoginScreen();
      }
    }

    componentWillMount() {
      this.checkLogin();
      if (super.componentWillMount) {
        super.componentWillMount();
      }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
      this.checkLogin();
      if (super.componentWillReceiveProps) {
        super.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentDidUpdate(
      prevProps: Readonly<P>,
      prevState: Readonly<S>,
      prevContext: any
    ) {
      if (super.componentDidUpdate) {
        super.componentDidUpdate(prevProps, prevState, prevContext);
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    render() {
      const iProps = this.props as types.IProps;
      return (
        <View style={Theme.container}>
          <WrappedComponent {...this.props} />
          {iProps && iProps.utility && iProps.utility.hasError === true ? (
            <FormValidationMessage testID='validationMessage'>
              {iProps.utility.errorMessage}
            </FormValidationMessage>
          ) : null}
          <BusyIndicator
            testID='busyIndicator'
            isBusy={iProps.utility.isBusy}
            message={iProps.utility.busyReason}
          />
        </View>
      );
    }
  };

export default componentBase;
