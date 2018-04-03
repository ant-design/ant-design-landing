import React from 'react';
import { Icon, message, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { getState } from '../utils';
import { saveData } from '../../../edit-module/actions';
import saveJsZip from './saveJsZip';

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  onPreview = (e) => {
    this.onSave(e, () => {
      message.success('生成预览成功。');
    });
    const { templateData } = this.props;
    const url = `${location.port ? `${location.protocol}//${location.hostname}:7113/`
      : `${location.origin}/templates/`}#uid=${templateData.uid}`;
    window.open(url);
  }

  onSave = (e, cb) => {
    console.log(this.props.templateData);
    saveData(this.props.templateData, (b) => {
      if (b.code) {
        message.error('保存出错，请重试。');
      } else if (!cb) {
        message.success('保存成功。');
      } else {
        cb();
      }
    });
  }

  onSaveCode = (e) => {
    /*     if (!location.port && window.ga) {
      window.ga('send', 'event', 'button', 'click', 'download');
    } */
    this.onSave(e, () => {
      message.success('生成代码成功。');
      saveJsZip(this.props.templateData);
    });
  }

  render() {
    const menuChild = [
      { name: '保存编辑', icon: 'save', onClick: this.onSave },
      { name: '生成预览', icon: 'eye-o', onClick: this.onPreview },
      { name: '生成代码', icon: 'code-o', onClick: this.onSaveCode },
    ].map((item, i) => (
      <li key={i.toString()} onClick={item.onClick}>
        <Icon type={item.icon} />
        {item.name}
      </li>
    ));
    const menuNewDropdown = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>);
    return (
      <div className={this.props.className}>
        <div className="logo">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" alt="logo" />
        </div>
        <ul className="menu">
          {menuChild}
        </ul>
        <Dropdown
          overlay={menuNewDropdown}
          placement="bottomRight"
        >
          <div className="new">
            <Icon type="file-add" />
          </div>
        </Dropdown>
      </div>
    );
  }
}
export default connect(getState)(NavController);
