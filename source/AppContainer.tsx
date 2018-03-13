import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Store, { configurePersistStore } from './Store';
import AppNavigator, { Routes } from './navigator/components';

    // <PersistGate persistor={configurePersistStore}>
    // </PersistGate>
const AppContainer = () => (
  <Provider store={Store}>
      <AppNavigator
       // @ts-ignore
       navigator={Routes} />
  </Provider>
);

export default AppContainer;
