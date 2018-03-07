/// <reference types="react-native-router-flux" />
/// <reference types="react" />
/// <reference types="react-native" />

// @ts-nocheck
import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Reducer, Modal, Tabs} from 'react-native-router-flux';
import {
  FontAwesome
  // @ts-ignore - bad mappings
} from '@expo/vector-icons';

import Theme, { Colors, TabIconSize } from '../../styles';
import Main from '../../main';
import Login from '../../login';

const reducerCreate = (params: any) => {
  const defaultReducer = new Reducer(params);
  return (state: any, action: any) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const mainIcon = () => (
  <FontAwesome name='map-o' size={TabIconSize} style={Theme.tabBarIcon} />
);

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'myapp://myapp/' : 'myapp://';
const AppNavigator = () => {
  return (
    <Router
      createReducer={reducerCreate}
      // @ts-ignore
      uriPrefix={prefix}>
      <Scene key='root' style={Theme.container} hideNavBar panHandlers={null}>
        <Modal key='modal' style={Theme.container}>
            <Tabs
              activeBackgroundColor={Colors.CrossLightBlue}
              inactiveBackgroundColor={Colors.CrossDarkBlue}
              inactiveTintColor='grey'
              activeTintColor={Colors.CrossYellow}
              tabBarPosition='bottom'
              tabBarStyle={Theme.tabBar}
              lazy
              key='tabMain'>
              <Scene
                key='main'
                icon={mainIcon}
                tabBarLabel='Start'
                titleStyle={Theme.tabBarTitle}
                back={false}
                hideNavBar
                tintColor={Colors.CrossYellow}
                component={Main}
              />
              <Scene
                key='main2'
                icon={mainIcon}
                hideNavBar
                tintColor={Colors.CrossYellow}
                tabBarLabel='Login 2'
                back={false}
                component={Login}
              />
          </Tabs>
          <Scene key='login'
          component={Login} hideNavBar
                back={false} />
        </Modal>
        </Scene>
    </Router>
  );
};

export default AppNavigator;
