import React from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { enquireScreen } from 'enquire-js';
import Animate from 'rc-animate';

import enLocale from '../../en-US';
import cnLocale from '../../zh-CN';
import * as utils from '../utils';

import Header from './Header';
import Footer from './Footer';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
class Layout extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);

    this.state = {
      appLocale,
      isMobile,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    const { pathname } = this.props.location;
    const { appLocale } = this.state;
    const pathKey = pathname && (pathname.split('/')[1] || pathname.split('/')[0]);
    const childrenToRender = React.cloneElement(children, {
      ...children.props,
      isMobile: this.state.isMobile,
      key: pathKey,
    });
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <LocaleProvider locale={enUS}>
          <div className={(pathname === '/' || pathname === 'index-cn') ? 'home' : ''}>
            <div className="header-placeholder" />
            <Header {...restProps} isMobile={this.state.isMobile} />
            <Animate component="div" transitionName="landings-move">
              {childrenToRender}
            </Animate>
            <Footer {...restProps} isMobile={this.state.isMobile} />
          </div>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

export default Layout;
