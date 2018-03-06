import React from 'react';
import { View} from 'react-native';

import Navigator from './dist/navigator/components/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Navigator />
      </View>
    );
  }
}