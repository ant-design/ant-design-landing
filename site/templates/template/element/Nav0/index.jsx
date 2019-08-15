import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: undefined,
      /* replace-start */
      openKeys: [],
      /* replace-end */
    };
  }

  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    const { func } = props;
    if (prevProps && func) {
      nextState.phoneOpen = func.open;
      nextState.openKeys = func.currentMenu ? [func.currentMenu] : [];
    }

    return nextState;
  }
  /* replace-end */

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const {
      phoneOpen,
      /* replace-start */
      openKeys,
      /* replace-end */
    } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = navData.map((item) => {
      const { a, subItem, className, ...itemProps } = item;
      if (subItem) {
        return (
          <SubMenu
            key={item.name}
            {...itemProps}
            /* replace-start */
            data-edit="Menu"
            /* replace-end */
            title={(
              <div {...a}>
                {
                  /* replace-start-value = a.children */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: a.children } })
                  /* replace-end-value */
                }
              </div>
            )}
            popupClassName={`header0-item-child ${className || ''}`.trim()}
          >
            {subItem.map((($item, ii) => {
              const { children: childItem } = $item;
              const child = $item.href ? (
                <a
                  {...childItem}
                  /* replace-start */
                  data-edit="titleWrapper"
                  /* replace-end */
                >
                  {childItem.children.map(getChildrenToRender)}
                </a>
              ) : (
                <div
                  {...childItem}
                  /* replace-start */
                  data-edit="titleWrapper"
                  /* replace-end */
                >
                  {childItem.children.map(getChildrenToRender)}
                </div>
              );
              return (
                <Item key={$item.name || ii.toString()} {...$item}>
                  {child}
                </Item>
              );
            }))}
          </SubMenu>
        );
      }
      return (
        <Item
          key={item.name}
          {...itemProps}
          /* replace-start */
          data-edit="Menu"
        /* replace-end */
        >
          <a
            {...a}
            /* replace-start */
            data-edit="linkA,text"
          /* replace-end */
          >
            {
              /* replace-start-value = a.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: a.children } })
              /* replace-end-value */
            }
          </a>
        </Item>
      );
    });
    const moment = phoneOpen === undefined ? 300 : null;
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
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
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
          )
          }
          <TweenOne
            {...dataSource.Menu}
            animation={{
              x: 0,
              height: 0,
              duration: 300,
              onComplete: (e) => {
                if (this.state.phoneOpen) {
                  e.target.style.height = 'auto';
                }
              },
              ease: 'easeInOutQuad',
            }}
            moment={moment}
            reverse={!!phoneOpen}
            /* replace-start */
            data-edit="Menu"
          /* replace-end */
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['item0']}
              /* replace-start */
              openKeys={openKeys}
              onOpenChange={(keys) => {
                this.setState({
                  openKeys: keys,
                });
              }}
              /* replace-end */
              theme={isMobile ? 'dark' : 'default'}
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
