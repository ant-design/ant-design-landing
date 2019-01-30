import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Icon } from 'antd';
import MobileMenu from 'rc-drawer';
import Animate from 'rc-animate';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import Article from './Article';
import * as utils from '../utils';

const { SubMenu } = Menu;

const { easing } = TweenOne;

function getActiveMenuItem(props) {
  const { children } = props.params;
  return (children && children.replace('-cn', ''))
    || props.location.pathname.replace(/(^\/|-cn$)/g, '');
}

function getModuleData(props) {
  const pathname = props.location.pathname;

  const moduleName = pathname.split('/').filter(item => item).slice(0, -1).join('/');

  const moduleData = props.picked[moduleName];
  const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
  return moduleData.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
}

function fileNameToPath(filename) {
  const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

export default class MainContent extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getSideBarOpenKeys(props) || [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps);
    if (openKeys) {
      this.setState({
        openKeys,
      });
    }
  }

  componentDidUpdate() {
    if (!location.hash) {
      const time = Date.now();
      ticker.clear(this.tickerId);
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop) {
        this.tickerId = ticker.add(() => {
          const timeDiffer = Date.now() - time;
          const top = easing.easeInOutCubic(timeDiffer, scrollTop, 0, 450);
          window.scrollTo(window.pageXOffset, top);
          if (timeDiffer > 450) {
            ticker.clear(this.tickerId);
          }
        });
      }
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        document.getElementById(decodeURI(location.hash.replace('#', ''))).scrollIntoView();
      }, 10);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMenuOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  }

  getSideBarOpenKeys(nextProps) {
    const pathname = nextProps.location.pathname;
    const prevModule = this.currentModule;
    this.currentModule = pathname.replace(/^\//).split('/')[1] || 'components';
    if (this.currentModule === 'react') {
      this.currentModule = 'components';
    }
    const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
    if (prevModule !== this.currentModule) {
      const moduleData = getModuleData(nextProps);
      const shouldOpenKeys = utils.getMenuItems(
        moduleData,
        locale,
        nextProps.themeConfig
      ).map(m => m.title[locale] || m.title);
      return shouldOpenKeys;
    }
  }

  generateMenuItem(isTop, item) {
    const locale = this.context.intl.locale;
    const key = fileNameToPath(item.filename);
    const text = [
      <span key="english">
        {item.title[locale] || item.title}
      </span>,
      <span className="chinese" key="chinese">
        {item.subtitle}
      </span>,
    ];
    const disabled = item.disabled;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').replace('scaffold/src/', '');
    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(/^components/.test(url) ? `${url}/` : url, locale === 'zh-CN')}
        disabled={disabled}
      >
        {text}
      </Link>
    )
      : (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          disabled={disabled}
          className="menu-item-link-outside"
        >
          {text}
          {' '}
          <Icon type="export" />
        </a>
      );
    return (
      <Menu.Item key={key} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  getMenuItems() {
    const { themeConfig } = this.props;
    const moduleData = getModuleData(this.props);
    const { locale } = this.context.intl;
    const menuItems = utils.getMenuItems(
      moduleData,
      locale,
      themeConfig,
    );
    return menuItems.map((menuItem) => {
      if (menuItem.children) {
        return (
          <SubMenu title={(
            <h4>
              {menuItem.title}
            </h4>
          )}
            key={menuItem.title}
          >
            {menuItem.children.map((child) => {
              if (child.type === 'type') {
                return (
                  <Menu.ItemGroup title={child.title} key={child.title}>
                    {child.children.sort((a, b) => {
                      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                    }).map(leaf => this.generateMenuItem(false, leaf))}
                  </Menu.ItemGroup>
                );
              }
              return this.generateMenuItem(false, child);
            })}
          </SubMenu>
        );
      }
      return this.generateMenuItem(true, menuItem);
    });
  }

  flattenMenu(menu) {
    if (menu.type === Menu.Item) {
      return menu;
    }

    if (Array.isArray(menu)) {
      return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
    }

    return this.flattenMenu(menu.props.children);
  }

  getFooterNav(menuItems, activeMenuItem) {
    const menuItemsList = this.flattenMenu(menuItems);
    let activeMenuItemIndex = -1;
    menuItemsList.forEach((menuItem, i) => {
      if (menuItem.key === activeMenuItem) {
        activeMenuItemIndex = i;
      }
    });
    const prev = menuItemsList[activeMenuItemIndex - 1];
    const next = menuItemsList[activeMenuItemIndex + 1];
    return {
      prev,
      next,
    };
  }

  render() {
    const { ...props } = this.props;
    const activeMenuItem = getActiveMenuItem(props);
    const menuItems = this.getMenuItems();
    const { prev, next } = this.getFooterNav(menuItems, activeMenuItem);
    const localizedPageData = props.localizedPageData;
    const menuChild = (
      <Menu
        inlineIndent="40"
        className="aside-container"
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>
    );
    const contentKey = props.location.pathname;
    return (
      <div className="main-wrapper">
        <Row className="">
          {
            props.isMobile ? (
              <MobileMenu
                key="mobile-menu"
                wrapperClassName="drawer-wrapper"
              >
                {menuChild}
              </MobileMenu>
            )
              : (
                <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
                  {menuChild}
                </Col>
              )
          }
          <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24} className="main-container">
            <Animate component="div" transitionName="landing-move" className="main-animate-wraper">
              {
                <Article {...props} content={localizedPageData} key={contentKey} />
              }
            </Animate>
          </Col>
        </Row>

        <Row>
          <Col
            xxl={{ span: 20, offset: 4 }}
            xl={{ span: 19, offset: 5 }}
            lg={{ span: 18, offset: 6 }}
            md={{ span: 18, offset: 6 }}
            sm={24}
            xs={24}
          >
            <section className="prev-next-nav">
              {
                prev
                  ? React.cloneElement(prev.props.children, {
                    className: 'prev-page',
                    children: [
                      <Icon className="footer-nav-icon-before" type="left" key="left" />,
                      ...prev.props.children.props.children,
                    ],
                  })
                  : null
              }
              {
                next
                  ? React.cloneElement(next.props.children, {
                    className: 'next-page',
                    children: [
                      ...next.props.children.props.children,
                      <Icon className="footer-nav-icon-after" type="right" key="right" />,
                    ],
                  })
                  : null
              }
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
