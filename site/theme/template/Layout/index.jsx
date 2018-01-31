import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../module/reducers';
import Layout from './Layout';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function Index(props) {
  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
}
