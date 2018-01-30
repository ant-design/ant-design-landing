import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu } from 'antd';

import { getLocalizedPathname } from '../utils';

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  getMenuToRender = () => {
    const { isMobile, location, intl } = this.props;
    const isZhCN = intl.locale === 'zh-CN';
    const path = location.pathname;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, -1).join('/');
    let activeMenuItem = module || 'home';
    if (/docs/.test(path)) {
      activeMenuItem = 'docs';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }
    return (
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="language">
          <Link to={getLocalizedPathname('/language/index', isZhCN)}>
            <FormattedMessage id="app.header.menu.language" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link to={getLocalizedPathname('/docs/index', isZhCN)}>
            <FormattedMessage id="app.header.menu.docs" />
          </Link>
        </Menu.Item>
        <Menu.Item key="edit">
          <Link to={getLocalizedPathname('/edit/index', isZhCN)}>
            <FormattedMessage id="app.header.menu.edit" />
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
  render() {
    const menu = this.getMenuToRender();
    return (
      <div id="header" className="header page-wrapper">
        <Row className="page">
          <Col md={6} sm={24}>
            <Link className="logo">
              <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" />
              <span>LANDINGS</span>
            </Link>
          </Col>
          <Col md={18} sm={0}>
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
        </Row>
      </div>
    );
  }
}

export default injectIntl(Header);
