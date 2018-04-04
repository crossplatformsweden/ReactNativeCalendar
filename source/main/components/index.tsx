import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, Dispatch } from 'react-redux';

import * as types from '../../Types';
import Theme from '../../styles';
import { ComponentBase } from '../../utility';

const styles = StyleSheet.create({
  padding: { padding: 20 },
});

export class MainBase extends React.Component<types.IProps, {}> {
  render() {
    return (
      <View style={[Theme.container, styles.padding]}>
        <Text>Home</Text>
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
