import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect, Dispatch } from 'react-redux';

import * as types from '../../Types';
import Theme from '../../styles';

const styles = StyleSheet.create({
  padding: { padding: 20 },
});

export class Main extends React.Component<types.IProps, {}> {
  componentDidMount() {
    if (!this.props.login.isLoggedIn) {
      Actions.push('login');
    }
  }

  render() {
    return (
      <View style={[Theme.container, styles.padding]}>
        <Text>Home</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
  login: state.login,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
)(Main);
