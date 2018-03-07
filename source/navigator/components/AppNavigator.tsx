// @ts-nocheck
import React from 'react';
import { Platform } from 'react-native';
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

const reducerCreate = (params: any) => {
    const defaultReducer = new Reducer(params);
    return (state: any, action: any) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};

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
                        hideNavBar>
                        <Lightbox key='lightbox'>
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
