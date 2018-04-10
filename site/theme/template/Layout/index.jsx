import React from 'react';
import ReactDOM from 'react-dom';
// import { createLogger } from 'redux-logger';
import Layout from './Layout';
import '../../static/style';

if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  require('../../static/style');

  // Expose to iframe
  window.react = React;
  window['react-dom'] = ReactDOM;
  // window.antd = require('antd');
  /* eslint-enable global-require */
}

export default function Index(props) {
  return (<Layout {...props} />);
}
