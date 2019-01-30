import React from 'react';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import enLocale from '../en-US';
import cnLocale from '../zh-CN';

import Layout from './layout';

import { store } from '../../utils';
import { isZhCN } from '../../theme/template/utils';
import '../static/style';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);
    this.state = {
      appLocale,
    };
  }

  render() {
    const { appLocale } = this.state;
    return (
      <Provider store={store}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <LocaleProvider locale={enUS}>
            <Layout {...this.props} />
          </LocaleProvider>
        </IntlProvider>
      </Provider>
    );
  }
}

export default Edit;
