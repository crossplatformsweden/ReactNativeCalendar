// navigator/components/AppNavigator
// @ts-nocheck
import React from 'react';
import { Platform } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { Actions, Scene, Router, Modal, Tabs } from 'react-native-router-flux';
import {
  FontAwesome,
  // @ts-ignore - bad mappings
} from '@expo/vector-icons';

import * as types from '../../Types';
import Theme, { Colors, TabIconSize } from '../../styles';
import { NavigationConstants } from '../../navigator/types';

// Component views used in navigation
import { LoginContainer } from '../../login/';
import { MainContainer } from '../../main/';
import { ProfileContainer } from '../../profile/';
import { BookComponent } from '../../adbook';

interface RouterProps {
  sceneStyle?: any;
  backAndroidHandler?: Function;
  createReducer?: Function;
  wrapBy?: Function;
  dispatch?: any;
}

const homeIcon = () => (
  <FontAwesome name='home' size={TabIconSize} style={Theme.tabBarIcon} />
);

const profileIcon = () => (
  <FontAwesome
    name='user-circle-o'
    size={TabIconSize}
    style={Theme.tabBarIcon}
  />
);

// TODO: Prefix breaks current version: use when stable
/**
 * App uri prefix used to deep link into the app
 *
 * On Android, the URI prefix typically contains a host in addition to scheme
 */
export const AppLink =
  Platform.OS === 'android' ? 'myapp://myapp/' : 'myapp://';

/**
 * Navigation routes for application
 */
export const Routes = Actions.create(
  // @ts-ignore
  <Scene key='root' style={Theme.container} hideNavBar panHandlers={null}>
    <Modal
      // @ts-ignore
      key='modal'
      style={Theme.container}
    >
      <Tabs
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
          hideNavBar
          tintColor={Colors.CrossYellow}
          titleStyle={Theme.tabBarTitle}
          key={NavigationConstants.MAP}
          component={MainContainer}
          tabBarLabel='Home'
          initial
          // @ts-ignore - bad TS map
          icon={homeIcon}
        />
        <Scene
          hideNavBar
          key={NavigationConstants.PROFILE}
          component={ProfileContainer}
          tintColor={Colors.CrossYellow}
          tabBarLabel='Me'
          titleStyle={{ color: 'white' }}
          // @ts-ignore - bad TS map
          icon={profileIcon}
        />
      </Tabs>
      <Scene
        key={NavigationConstants.LOGIN}
        component={LoginContainer}
        hideNavBar
        back={false}
        direction='vertical'
      />
      <Scene
       key={NavigationConstants.ADBOOK}
       component={BookComponent}
       hideNavBar
       back={false}
       direction='vertical'
      />
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
