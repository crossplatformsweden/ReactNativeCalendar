import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Store, { configurePersistStore } from './Store';
import { Routes, AppNavigator } from './navigator/';
import { BusyIndicator, IndicatorType } from './utility';

const AppContainer = () => (
  <Provider store={Store}>
    <PersistGate
      persistor={configurePersistStore}
      loading={
        <BusyIndicator
          message='Warming up...'
          type={IndicatorType.WaveIndicator}
          isBusy
        />
      }
    >
      <AppNavigator
        // @ts-ignore
        navigator={Routes}
      />
    </PersistGate>
  </Provider>
);

export default AppContainer;
