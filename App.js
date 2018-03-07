import React from 'react';
import { View} from 'react-native';

import Navigator from './dist/navigator/components/AppNavigator';
import Theme from './dist/styles/'

export default class App extends React.Component {
  render() {
    return (
      <View style={Theme.container}>
        <Navigator />
      </View>
    );
  }
}