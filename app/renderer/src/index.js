/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './components/DevTools';
import AppContainer from './containers/AppContainer';
import configureStore from './store';
import { IS_DEV } from '../../constants';

const store = configureStore();

// load the dev tools if necessary
let devTools = '';
if (IS_DEV) {
  devTools = <DevTools />;
}

const DextApp = () => (
  <Provider store={store}>
    <div>
      <AppContainer />
      {devTools}
    </div>
  </Provider>
);

const rootNode = document.getElementById('app');

ReactDOM.render(<DextApp />, rootNode);
