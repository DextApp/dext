/* global window */
import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';
import DevTools from '../components/DevTools';

const getDebugSessionKey = () => {
  if (typeof window !== 'undefined') {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
  }
  return null;
};

const sagaMiddleware = createSagaMiddleware();

// compose a store enhancer with the DevTools
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  // run the saga
  sagaMiddleware.run(sagas);
  return store;
}
