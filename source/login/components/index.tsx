import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect, Dispatch } from 'react-redux';

import * as types from '../../Types';
import * as Navigator from '../../navigator/components';
import Theme from '../../styles';

export class Login extends React.Component<types.IProps, {}> {
  render() {
    return (
      <Navigator.ModalBase hideClose>
        <View style={[Theme.alignCentered, Theme.paddingDefault]}>
          <Text style={[Theme.alignTop, Theme.paddingDefault]}>Login</Text>
          <TextInput
            style={[Theme.alignTop, Theme.paddingDefault, { width: 200 }]}
            placeholder='Username'
            autoFocus
            keyboardType='email-address'
          />
          <TextInput
            style={[Theme.alignTop, Theme.paddingDefault, { width: 200 }]}
            placeholder='Password'
            secureTextEntry
            onChangeText={name => this.onTextChanged(name)}
          />
        </View>
      </Navigator.ModalBase>
    );
  }

  onTextChanged = (text: string) => {
    this.userName = text;
    if (text && text.length > 5) {
      Actions.pop();
    }
  }

  userName: string = 'unknown';
}

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
