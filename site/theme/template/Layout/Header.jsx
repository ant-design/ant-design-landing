import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import PhoneNav from './PhoneNav';
import { getLocalizedPathname } from '../utils';

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  getMenuToRender = () => {
    const { isMobile, location, intl } = this.props;
    const isZhCN = intl.locale === 'zh-CN';
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, -1).join('/');
    const activeMenuItem = module || 'home';
    const winLocation = window.location;
    const protocol = winLocation.protocol;
    const isLocalMode = winLocation.port;
    const port = isLocalMode ? ':7112' : '';
    const mainPath = isLocalMode ? '' : '/edit';
    const href = `${protocol}//${winLocation.hostname}${port}${mainPath}`;
    return (
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/spec">
          <Link to={getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.language" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs/instructions">
          <Link to={getLocalizedPathname('/docs/instructions/use-witch-ant-design-pro', isZhCN)}>
            <FormattedMessage id="app.header.menu.docs" />
          </Link>
        </Menu.Item>
        {!isMobile && (
          <Menu.Item key="edit">
            <a
              target="_blank"
              href={href}
            >
              <FormattedMessage id="app.header.menu.edit" />
            </a>
          </Menu.Item>
        )}
      </Menu>
    );
  }
  render() {
    const menu = this.getMenuToRender();
    const { isMobile, intl } = this.props;
    const isZhCN = intl.locale === 'zh-CN';
    return (
      <div id="header" className="header page-wrapper">
        {isMobile && (<PhoneNav>{menu}</PhoneNav>)}
        <Row className="page">
          <Col md={6} sm={24}>
            <Link className="logo" to={getLocalizedPathname('/', isZhCN)}>
              <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" />
              <span>LANDINGS</span>
            </Link>
          </Col>
          {
            !isMobile && (
              <Col md={18} sm={0} >
                <div className="menu">
                  {menu}
                  <a
                    href="https://github.com/ant-design/landings"
                    alt="git"
                    target="_blank"
                    className="gitbtn"
                  >
                    Github
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
