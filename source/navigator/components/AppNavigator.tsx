/// <reference types="react" />
/// <reference types="react-redux" />
/// <reference types="react-native" />
/// <reference types="react-native-router-flux" />

// @ts-nocheck
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Platform } from 'react-native';
import { Actions, Scene, Router, Modal, Tabs } from 'react-native-router-flux';
import {
  FontAwesome,
  // @ts-ignore - bad mappings
} from '@expo/vector-icons';

import * as types from '../../Types';
import Theme, { Colors, TabIconSize } from '../../styles';
import Main from '../../main/components';
import Login from '../../login/components';

interface RouterProps {
  sceneStyle?: any;
  backAndroidHandler?: Function;
  createReducer?: Function;
  wrapBy?: Function;
  dispatch?: any;
}

const mainIcon = () => (
  <FontAwesome name='map-o' size={TabIconSize} style={Theme.tabBarIcon} />
);

/**
 * Navigation routes for application
 */
export const Routes = Actions.create(
  // @ts-ignore
  <Scene key='root' style={Theme.container} hideNavBar panHandlers={null}>
    <Modal
  // @ts-ignore
    key='modal' style={Theme.container}>
      <Tabs
  // @ts-ignore
        activeBackgroundColor={Colors.CrossLightBlue}
        inactiveBackgroundColor={Colors.CrossDarkBlue}
        inactiveTintColor='grey'
        activeTintColor={Colors.CrossYellow}
        tabBarPosition='bottom'
        tabBarStyle={Theme.tabBar}
        lazy
        key='tabMain'
      >
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
      <Scene key='login' component={Login} hideNavBar back={false} />
    </Modal>
  </Scene>
);

const mapStateToProps = (state: types.IApplicationState) => ({
  route: state.route,
});

const mapDispatchToProps = (dispatch: Dispatch<types.IProps>) => ({
  dispatch,
});

export default connect<types.IApplicationState, RouterProps>(
  mapStateToProps,
  mapDispatchToProps
)(Router);
