import React from 'react';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import DrawerMenu from 'rc-drawer-menu';
import webData from '../template.config';

export default class SideMenu extends React.PureComponent {
  state = {
    editMenuOpen: false,
  }
  getDrawer = () => {
    const children = [];
    const pushData = (child, i, key) => {
      children.push((
        <div
          className="img-wrapper"
          key={`${key}${child.uid || i}`}
          data-key={`${key}${child.uid || i}`}
        >
          <div className="img">
            {child.isVideo ? (
              <video src={child.src} width="100%" height="100%" autoPlay loop >
                <track kind="captions" />
              </video>) :
              <img src={child.src} width="100%" alt="img" draggable="false" />}
          </div>
          <p>{child.text}</p>
        </div>
      ));
    };
    Object.keys(webData).sort((a, b) => (webData[a].order > webData[b].order))
      .forEach((key) => {
        if (key !== 'Other') {
          const item = webData[key];
          children.push((<div className="title" key={key}>{item.name}</div>));
          item.data // .sort((a, b) => (a.order - b.order))
            .forEach((child, i) => {
              pushData(child, i, key);
            });
        }
      });
    return children;
  }
  showMenu = () => {
    this.setState({
      editMenuOpen: true,
    });
  }
  hideMenu = () => {
    this.setState({
      editMenuOpen: false,
    });
  }
  render() {
    const drawerChild = this.getDrawer();
    return (
      <div
        className="edit-side-menu-wrapper"
        onMouseLeave={this.hideMenu}
      >
        <DrawerMenu
          level={null}
          parent={null}
          iconChild={null}
          width="320px"
          open={this.state.editMenuOpen}
          wrapperClassName="edit-side-drawer"
        >
          {drawerChild}
        </DrawerMenu>
        <div className="edit-side-menu">
          <div className="add" onMouseEnter={this.showMenu}>
            <Icon type="plus-circle-o" />
            添加内容
          </div>
          <ul className="other" onMouseEnter={this.hideMenu}>
            <Tooltip title="dva-cli 例子" placement="right">
              <li>
                <Icon type="folder" />
              </li>
            </Tooltip>
            <Tooltip title="视频教程" placement="right">
              <li>
                <Icon type="video-camera" />
              </li>
            </Tooltip>
            <Tooltip title="注意事项" placement="right">
              <li>
                <Icon type="exclamation-circle-o" />
              </li>
            </Tooltip>
          </ul>
        </div>
      </div>
    );
  }
}
