import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './store/store';
import { register } from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
register();
