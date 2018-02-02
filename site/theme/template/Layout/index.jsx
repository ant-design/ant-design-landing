import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../module/reducers';
import Layout from './Layout';
import '../../static/style';

if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  require('../../static/style');

  // Expose to iframe
  window.react = React;
  window['react-dom'] = ReactDOM;
  window.antd = require('antd');
  /* eslint-enable global-require */
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function Index(props) {
  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
}
