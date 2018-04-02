/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './components/DevTools';
import AppContainer from './containers/AppContainer';
import configureStore from './store';
import { IS_DEV } from '../../constants';

const store = configureStore();
const DextApp = () => (
  <Provider store={store}>
    <div>
      <AppContainer />
      {IS_DEV && <DevTools />}
    </div>
  </Provider>
);

const rootNode = document.getElementById('app');
ReactDOM.render(<DextApp />, rootNode);
