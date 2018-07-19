import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';
/* replace-start */
import './index.less';
/* replace-end */

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

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
          {...navData[key]}
          key={i.toString()}
          /* replace-start */
          data-edit="Menu"
        >
          <a href={navData[key].children.link} target={navData[key].children.blank && '_blank'}>
            {navData[key].children.name}
          </a>
        </Item>));
    // user 涉及到数据，请自行替换。
    const userTitle = (
      <div
        {...dataSource.user}
        /* replace-start */
        data-edit="Menu"
      /* replace-end */
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
      </div>);
    navChildren.push(
      (
        <Item {...dataSource.help} key="help">
          <Icon type="question-circle-o" />
          <span>
            {
              /* replace-start-value = navData[key].children} */
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
      </TweenOne>
    );
  }
}

export default Header;
