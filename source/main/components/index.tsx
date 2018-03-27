import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect, Dispatch } from 'react-redux';
import * as types from '../../Types';
import Theme from '../../styles';
import { ComponentBase } from '../../utility';
import { NavigationConstants } from '../../navigator/types/index';

const styles = StyleSheet.create({
  padding: { padding: 20 },
});

function showBookPage() {
  Actions.push(NavigationConstants.ADBOOK);
}

export class MainBase extends React.Component<types.IProps, {}> {
  // componentDidMount() {
  //   // if (!this.props.login.isLoggedIn) {
  //   //   Actions.push('login');
  //   // }
  // }

  render() {
    return (
      <View style={[Theme.container, styles.padding]}>
        <Text>Home</Text>
        <Button title='Test Button' onPress={showBookPage}></Button>
      </View>
    );
  }
}

/**
 * Main component. Implements ComponentBase
 */
export const Main = ComponentBase(MainBase);

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
  login: state.login,
  utility: state.utility,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
});

export default connect<types.IApplicationState, types.IProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore - Redux base class issue
)(Main);
