import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import * as types from '../../Types';
import { StorageTypes, GetByKey } from '../../storage';
import { FacebookLogin, GoogleLogin } from '..';
import { ComponentBase } from '../../utility';
import { Agenda } from 'react-native-calendars';

interface IState {}

/**
 * Login base component. Doesn't implement ComponentBase
 * @class
 */
export class LoginBase extends React.Component<types.IProps, IState> {
  componentWillMount() {
    if (!this.props.login.isLoggedIn) {
      this.props.GetByKey(StorageTypes.StorageConstants.STORAGE_USER_KEY);
    }

    if (super.componentWillMount) {
      super.componentWillMount();
    }
  }

  /**
   * Wraps {@link FacebookActions.FacebookLogin}
   * @type {function}
   * @private
   */
  async facebookLogin() {
    await this.props.FacebookLogin();
    // @ts-ignore
    if (super.checkLogin) {
      // @ts-ignore
      super.checkLogin();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../resources/icon.png')}
            style={{
              width: 120,
              height: 120,
            }}
          /></View>
        <SocialIcon
          title='Sign In With Facebook'
          button
          // @ts-ignore - id is unknown
          id='buttonFacebook'
          onPress={this.facebookLogin}
          type='facebook'
        />
        <SocialIcon
          title='Sign In With Google'
          button
          // @ts-ignore - id is unknown
          id='buttonGoogle'
          onPress={this.props.GoogleLogin}
          type='google-plus-official'
        />
        <Agenda style={{}}
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={
            {'2018-05-22': [{text: 'item 1 - any js object'}],
            '2018-05-23': [{text: 'item 2 - any js object'}],
            '2018-05-24': [],
            '2018-05-25': [{text: 'item 3 - any js object'}, {text: 'any js object'}],
            }}
            // specify how each item should be rendered in agenda
        />
      </View>
    );
  }
}

/**
 * Login component. Implements ComponentBase
 */
export const Login = ComponentBase(LoginBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const mapStateToProps = (state: types.IApplicationState) => ({
  login: state.login,
  utility: state.utility,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  FacebookLogin: bindActionCreators(FacebookLogin, dispatch),
  GoogleLogin: bindActionCreators(GoogleLogin, dispatch),
  GetByKey: bindActionCreators(GetByKey, dispatch),
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(Login);
