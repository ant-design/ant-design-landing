import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';
import './index.less';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    const dataSource = props.dataSource;
    delete props.dataSource;
    delete props.isMode;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const navData = dataSource[`${name}_menu`].children;
    const navChildren = Object.keys(navData).map((key, i) => (<Item key={i}>
      {navData[key]}
    </Item>));
    const userTitle = (<div>
      <span className="img">
        <img
          src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
          width="30"
          height="30"
        />
      </span>
      <span>用户名</span>
    </div>);
    navChildren.push(
      (<Item className="help" key="help">
        <Icon type="question-circle-o" />
        <span>帮助</span>
      </Item>),
      (<SubMenu className="user" title={userTitle} key="user">
        <Item key="a">用户中心</Item>
        <Item key="b">修改密码</Item>
        <Item key="c">登出</Item>
      </SubMenu>)
    );
    const func = dataSource[`${name}_menu`].func;
    return (<TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{
          x: -30, delay: 100, type: 'from', ease: 'easeOutQuad',
        }}
        id={`${this.props.id}-logo`}
      >
        <img width="100%" src={dataSource[`${name}_logo`].children} />
      </TweenOne>
      {isMode ? (
        <div
          className={`${this.props.className}-phone-nav${this.state.phoneOpen || (func && func.switch) ? ' open' : ''}`}
          id={`${this.props.id}-menu`}
        >
          <div
            className={`${this.props.className}-phone-nav-bar`}
            onClick={() => {
              this.phoneClick();
            }}
          >
            <em />
            <em />
            <em />
          </div>
          <div
            className={`${this.props.className}-phone-nav-text`}
          >
            <Menu
              defaultSelectedKeys={['0']}
              mode="inline"
              theme="dark"
              openKeys={(func && func.switchMenu) ? ['user'] : []}
            >
              {navChildren}
            </Menu>
          </div>
        </div>) : (
          <TweenOne
            animation={{
              x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad',
            }}
            className={`${this.props.className}-nav`}
          >
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['0']}
              id={`${this.props.id}-menu`}
              openKeys={(func && func.switchMenu) ? ['user'] : []}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        )}
    </TweenOne>);
  }
}

Header.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

Header.defaultProps = {
  className: 'header1',
};

export default Header;
