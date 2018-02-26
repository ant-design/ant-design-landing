import React from 'react';
import { Button, Icon, Modal, message, Tooltip } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';


class NavController extends React.Component {
  static defaultProps = {
    className: 'edit-nav',
  };
  constructor(props) {
    super(props);
  }

  saveCode = () => {
    if (!location.port && window.ga) {
      window.ga('send', 'event', 'button', 'click', 'download');
    }
    // saveJsZip(this.props.urlData);
  }

  render() {
    const menuChild = [
      { name: '保存编辑', icon: 'save' },
      { name: '生成预览', icon: 'eye-o' },
      { name: '生成代码', icon: 'code-o' },
    ].map((item, i) => (
      <li key={i.toString()}>
        <Icon type={item.icon} />
        {item.name}
      </li>
    ));
    return (
      <div className={this.props.className}>
        <div className="logo">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" alt="logo" />
        </div>
        <ul className="menu">
          {menuChild}
        </ul>
        <div className="new">
          <Icon type="file-add" />
        </div>
      </div>
    );
  }
}
export default NavController;
