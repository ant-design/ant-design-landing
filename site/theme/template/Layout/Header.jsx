import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, notification } from 'antd';
import GitHubButton from 'react-github-button';

import PhoneNav from './PhoneNav';
import * as utils from '../utils';
import { getNewHref } from '../../../utils';

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    notification.open({
      placement: 'bottomLeft',
      duration: 10000,
      message: this.props.intl.formatMessage({ id: 'app.layout.notification.title' }),
      description: (
        <div>
          {this.props.intl.formatMessage({ id: 'app.layout.notification.content' })}
          <GitHubButton
            type="stargazers"
            namespace="ant-design"
            repo="ant-design-landing"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 8 }}
          />
        </div>
      ),
    });
  }

  handleLangChange = () => {
    const { pathname } = this.props.location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href = currentProtocol + currentHref.replace(
      window.location.pathname,
      utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
    );
  }

  getMenuToRender = (lang) => {
    const { isMobile, location, intl } = this.props;
    const isZhCN = intl.locale === 'zh-CN';
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/')[0];// .slice(0, -1).join('/');
    const activeMenuItem = (module.match('index') && 'home') || module;
    const href = getNewHref('7112');
    return (
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link to={utils.getLocalizedPathname('/docs/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.language" />
          </Link>
        </Menu.Item>
        {/*
        <Menu.Item key="docs/instructions">
          <Link to={getLocalizedPathname('/docs/instructions/use-witch-ant-design-pro', isZhCN)}>
            <FormattedMessage id="app.header.menu.docs" />
          </Link>
        </Menu.Item> */}
        {!isMobile && (
          <Menu.Item key="edit">
            <a
              href={href}
            >
              <FormattedMessage id="app.header.menu.edit" />
            </a>
          </Menu.Item>
        )}
        {
          isMobile && (
            <Menu.Item key="lang" onClick={this.handleLangChange}>
              {lang}
            </Menu.Item>
          )
        }
      </Menu>
    );
  }

  render() {
    const { isMobile, intl } = this.props;
    const lang = (<FormattedMessage id="app.footer.lang" />);
    const menu = this.getMenuToRender(lang);
    const isZhCN = intl.locale === 'zh-CN';
    return (
      <div id="header" className="header page-wrapper">
        {isMobile && (
          <PhoneNav>
            {menu}
          </PhoneNav>
        )}
        <Row className="page">
          <Col md={6} sm={24}>
            <Link className="logo" to={utils.getLocalizedPathname('/', isZhCN)}>
              <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" />
              <span>
                LANDING
              </span>
            </Link>
          </Col>
          {
            !isMobile && (
              <Col md={18} sm={0}>
                <div className="menu">
                  {menu}
                  <a
                    href="https://github.com/ant-design/ant-design-landing"
                    alt="git"
                    target="_blank"
                    className="gitbtn"
                  >
                    Github
                  </a>
                  <a className="gitbtn" onClick={this.handleLangChange}>
                    {lang}
                  </a>
                </div>
              </Col>
            )
          }
        </Row>
      </div>
    );
  }
}

export default injectIntl(Header);
