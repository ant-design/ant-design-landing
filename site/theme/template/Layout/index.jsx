import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moduleReducers from '../module';
import Layout from './Layout';

const store = createStore(moduleReducers);
export default function Index(props) {
  console.log(props);
  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
}
