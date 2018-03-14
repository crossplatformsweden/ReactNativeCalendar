// login/components/index
import React from 'react';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect, Dispatch } from 'react-redux';
import { SocialIcon } from 'react-native-elements';

import * as types from '../../Types';
import * as Navigator from '../../navigator/components';
import Theme from '../../styles';
import { FacebookLogin } from '../actions';
import { BusyIndicator } from '../../utility';

export class Login extends React.Component<types.IProps, {}> {
  render() {
    return (
      <Navigator.ModalBase hideClose>
        <View style={[Theme.alignCentered, Theme.paddingDefault]}>
          <Text style={[Theme.alignTop, Theme.paddingDefault]}>Login</Text>
        <SocialIcon
          title='Sign In With Facebook'
          button
          style={{width: 200}}
          onPress={this.facebookLogin}
          type='facebook'
        />
        </View>
        <BusyIndicator
        isBusy={this.props.utility.isBusy}
        message={this.props.utility.busyReason} />
      </Navigator.ModalBase>
    );
  }

  /**
   * Wraps {@link FacebookActions.FacebookLogin}
   * @type {function}
   * @private
   */
  facebookLogin = async () => {
    await this.props.FacebookLogin();
    if (this.props.login.isLoggedIn) {
      Actions.pop();
    }
  }

  userName: string = 'unknown';
}

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
  login: state.login,
  utility: state.utility,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
  FacebookLogin: bindActionCreators(FacebookLogin, dispatch),
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
