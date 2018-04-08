import React from 'react';
import { Icon, message, Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux';
import { getState } from '../utils';
import { getURLData, setURLData } from '../../../theme/template/utils';
import { saveData, userName, newTemplate, removeTemplate } from '../../../edit-module/actions';
import saveJsZip from './saveJsZip';

const { Item, ItemGroup } = Menu;

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  constructor(props) {
    super(props);
    this.state = {
      localStorage: window.localStorage.getItem(userName).split(',').filter(c => c),
    };
  }

  componentWillReceiveProps() {
    this.setState({
      localStorage: window.localStorage.getItem(userName).split(',').filter(c => c),
    });
  }
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

  onClickNew = () => {
    newTemplate(() => {
      location.reload();
    });
  }

  onClickItem = (e) => {
    setURLData('uid', e.key);
    location.reload();
  }
  onRemoveLocalStorage = (key) => {
    const localStorage = this.state.localStorage.filter(c => c !== key);
    window.localStorage.setItem(userName, localStorage.join(','));
    this.setState({
      localStorage,
    });
    removeTemplate(key);
    const current = getURLData('uid');
    if (current === key) {
      this.onClickItem({ key: localStorage[0] });
    }
  }

  getNewMenu = () => {
    const { localStorage } = this.state;
    const localChild = localStorage.map(key => (
      <Item
        key={key}

        title={key}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className="new-list-text"
        >
          {key}
        </span>
        <span className="new-list-remove">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              this.onRemoveLocalStorage(key);
            }}
            size="small"
            shape="circle"
            icon="delete"
          />
        </span>
      </Item>
    ));
    return localChild.length && (
    <Menu style={{ width: 150, textAlign: 'center' }} onClick={this.onClickItem}>
      <ItemGroup title="近期所建" key="0">
        {localChild}
      </ItemGroup>
    </Menu>);
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
    const menuNewDropdown = this.getNewMenu();
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
          <div className="new" onClick={this.onClickNew}>
            <Icon type="file-add" />
          </div>
        </Dropdown>
      </div>
    );
  }
}
export default connect(getState)(NavController);
