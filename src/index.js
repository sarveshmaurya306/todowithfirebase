import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store, persistor} from './store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div style={{background:"black"}}>
        <App/>
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
