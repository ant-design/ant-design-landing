import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import enLocale from '../en-US';
import cnLocale from '../zh-CN';

import Layout from './layout';

import store from '../../shared/redux';
import { isZhCN } from '../../theme/template/utils';
import '../static/style';
import emitter from '../../shared/emitter';
import iframeManager from '../../shared/iframe';
import elementRegistry from '../../shared/elementRegistry';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = isZhCN(pathname) ? cnLocale : enLocale;

    this.state = {
      appLocale,
    };
  }

  componentDidMount() {
    window.emitter = emitter;
    window.emitter.on('iframe-rendered', (iframeWindow) => {
      iframeManager.set(iframeWindow);
    });

    window.elementRegistry = elementRegistry;
  }

  render() {
    const { appLocale } = this.state;
    return (
      <Provider store={store}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <ConfigProvider locale={appLocale.locale === 'zh-CN' ? zhCN : null}>
            <Layout {...this.props} />
          </ConfigProvider>
        </IntlProvider>
      </Provider>
    );
  }
}

export default Edit;
