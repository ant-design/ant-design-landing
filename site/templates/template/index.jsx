import React from 'react';
import { Provider } from 'react-redux';

import Layout from './layout';
import { store } from '../../utils';
import '../static/index.less';

function Index() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default Index;
