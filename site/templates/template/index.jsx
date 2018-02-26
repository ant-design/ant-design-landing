import React from 'react';
import { Provider } from 'react-redux';

import Layout from './layout';
import { store } from '../../edit/template/utils';
import '../static/index.less';
import '../static/point.less';

function Index() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>);
}

export default Index;
