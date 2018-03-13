import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Store, { configurePersistStore } from './Store';
import AppNavigator from './navigator/components';

const AppContainer = () => (
  <Provider store={Store}>
      <PersistGate persistor={configurePersistStore}>
        <AppNavigator />
      </PersistGate>
  </Provider>);

export default AppContainer;
