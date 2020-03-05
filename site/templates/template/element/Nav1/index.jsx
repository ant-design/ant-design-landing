import React from 'react';
import { findDOMNode } from 'react-dom';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
/* replace-start */
import { polyfill } from 'react-lifecycles-compat';
import './index.less';
/* replace-end */

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps && func) {
      nextState.phoneOpen = func.open;
    }
    return nextState;
  }

  /* replace-end */
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
  }

  phoneClick = () => {
    const menu = findDOMNode(this.menu);
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? menu.scrollHeight : 0,
    });
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { menuHeight, phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = Object.keys(navData)
      .map((key, i) => {
        const { a, ...navProps } = navData[key];
        return (
          <Item
            {...navProps}
            key={i.toString()}
            /* replace-start */
            data-edit="Menu"
          /* replace-end */
          >
            <a
              {...a}
              href={a.link}
              target={a.blank && '_blank'}
            >
              {
                /* replace-start-value = a.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: a.children } })
                /* replace-end-value */
              }
            </a>
          </Item>
        );
      }
      );

    // user 涉及到数据，请自行替换。
    const userTitle = (
      <div
        {...dataSource.user}
      >
        <span className="img" {...dataSource.user.img}>
          <img
            src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
            width="100%"
            height="100%"
            alt="img"
          />
        </span>
        <span>
          用户名
        </span>
      </div>
    );
    navChildren.push(
      (
        <Item {...dataSource.help} key="help">
          <QuestionCircleOutlined />
          <span>
            {
              /* replace-start-value = dataSource.help.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.help.children } })
              /* replace-end-value */
            }
          </span>
        </Item>),
      (
        <SubMenu
          className="user"
          title={userTitle}
          key="user"
        >
          <Item key="a">
            用户中心
          </Item>
          <Item key="b">
            修改密码
          </Item>
          <Item key="c">
            登出
          </Item>
        </SubMenu>)
    );
    const menuProps = {
      mode: isMobile ? 'inline' : 'horizontal',
      defaultSelectedKeys: ['0'],
      theme: isMobile ? 'dark' : 'default',
    };
    if (isMobile) {
      menuProps.openKeys = ['user'];
    }
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{
              x: -30, delay: 100, type: 'from', ease: 'easeOutQuad',
            }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
              /* replace-start */
              data-edit="Menu"
            /* replace-end */
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={(c) => { this.menu = c; }}
            style={isMobile ? { height: menuHeight } : null}
            /* replace-start */
            data-edit="Menu"
          /* replace-end */
          >
            <Menu
              {...menuProps}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

/* replace-start-value = export default Header */
export default polyfill(Header);
/* replace-end-value */
