import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import './index.less';

const Item = Menu.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }
  /* replace-start */
  componentWillReceiveProps(nextProps) {
    const { func } = nextProps;
    if (func) {
      this.setState({
        phoneOpen: func.open,
      });
    }
  }
  /* replace-end */

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;

    const navData = dataSource.menu.children;
    const navChildren = Object.keys(navData)
      .map((key, i) => (
        <Item
          key={i.toString()}
          {...navData[key]}
           /* replace-start */
          data-edit="Menu"
           /* replace-end */
        >
          <a href={navData[key].children.link} target={navData[key].children.blank && '_blank'}>{navData[key].children.name}</a>
        </Item>));
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${this.state.phoneOpen ? ' open' : ''}`}
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
            </div>)
          }
          <TweenOne
            {...dataSource.menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            /* replace-start */
            data-edit="Menu"
            /* replace-end */
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['0']}
              theme={isMobile ? 'dark' : 'default'}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>);
  }
}

export default Header;
