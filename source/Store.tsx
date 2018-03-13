import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

// Allows us to resolve async actions (promises) with Redux. Example: Fetching data from an API.
import promise from 'redux-promise';

// Logs the previous state, action and the next state in the console.
import logger from 'redux-logger';

// Redux thunk let’s us to return a function inside an action instead returning a object.
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

// Apply middleware
const middleware = applyMiddleware(thunk, promise, logger);

// Redux Store that hold the whole application state
const Store = createStore(
    RootReducer,
    compose(
      middleware
    )
  );

  // Persist state to app storage
  export const configurePersistStore = persistStore(Store);

  // Export type for use with TypeScript
  export type Store = typeof Store;

  // Make store available globally
  export default Store;