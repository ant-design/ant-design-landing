import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { getData } from '../utils';


class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

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
      <li key={i.toString()} onClick={item.onClick}>
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
export default connect(getData)(NavController);
