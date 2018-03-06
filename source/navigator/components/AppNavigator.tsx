// @ts-nocheck
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

import Main from '../../main';
import Login from '../../login';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

const getSceneStyle = () => ({
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'myapp://myapp/' : 'myapp://';
const AppNavigator = () => {
    return (
        <Router
            createReducer={reducerCreate}
            // @ts-ignore
            getSceneStyle={getSceneStyle}
            uriPrefix={prefix}>
            <Scene key='root'>
                <Overlay key='overlay'>
                    <Modal
                        // @ts-ignore
                        key='modal'
                        hideNavBar
                        transitionConfig={() => ({
                            screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid,
                        })}>
                        <Lightbox key='lightbox'
                        verticalPercent={0.5}
                        horizontalPercent={0.9}>
                            <Stack
                                hideNavBar
                                key='root2'
                                // @ts-ignore
                                titleStyle={{ alignSelf: 'center' }}>
                                <Scene
                                    key='main'
                                    title='Start'
                                    initial
                                    component={Main} />
                            </Stack>
                            <Scene key='login' component={Login} hideNavBar />
                        </Lightbox>
                    </Modal>
                </Overlay>
            </Scene>
        </Router>
    );
};
export default AppNavigator;
