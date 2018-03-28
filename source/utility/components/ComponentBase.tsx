// utility/components/ComponentBase
import * as React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormValidationMessage } from 'react-native-elements';
import Sentry from 'sentry-expo';

import BusyIndicator from './BusyIndicator';
import * as types from '../../Types';
import * as NavigatorTypes from '../../navigator/types';
import Theme from '../../styles';

/**
 * Base class for componets with busy indicator and validation feedback.
 *
 * Busy indicator requires props to contain "login" from Redux store.
 *
 * Validator requires props to contain "utility" from Redux store
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
    protected async checkLogin() {
      const iProps = this.props as types.IProps;
      if (iProps && iProps.login && iProps.login.isLoggedIn) {
        // User is logged in - set user info for debugging
        if (iProps.login.user)
          Sentry.setUserContext({
            email: iProps.login.user.email,
            username: iProps.login.user.username,
            extra: { type: iProps.login.user.type },
          });

        if (
          Actions.currentScene === NavigatorTypes.NavigationConstants.LOGIN &&
          Actions &&
          Actions.pop
        ) {
          // Close login modal
          Actions.pop();
        }
      } else if (Actions.LoginScreen) {
        // Push login screen
        if (!iProps.login.isLoggedIn) {
          // Actions.LoginScreen();
        }
      }
    }

    componentWillMount() {
      this.checkLogin();
      if (typeof super.componentWillMount === 'function') {
        super.componentWillMount();
      }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
      this.checkLogin();
      if (typeof super.componentWillReceiveProps === 'function') {
        super.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    componentDidMount() {
      if (typeof super.componentDidMount === 'function') {
        super.componentDidMount();
      }
    }

    componentDidUpdate(
      prevProps: Readonly<P>,
      prevState: Readonly<S>,
      prevContext: any
    ) {
      if (typeof super.componentDidUpdate === 'function') {
        super.componentDidUpdate(prevProps, prevState, prevContext);
      }
    }

    componentWillUnmount() {
      if (typeof super.componentWillUnmount === 'function') {
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
