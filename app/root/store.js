import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import rootReducer from './reducer/root';
import middlewares from './middlewares/';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

export default store;

