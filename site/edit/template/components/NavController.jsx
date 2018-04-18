import React from 'react';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { connect } from 'react-redux';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import 'codemirror/mode/javascript/javascript.js';

import { formatCode } from '../utils';
import { getState } from '../../../utils';
import { getURLData, setURLData } from '../../../theme/template/utils';
import { saveData, userName, newTemplate, removeTemplate, setTemplateData } from '../../../edit-module/actions';
import { saveJsZip, saveJSON } from './saveJsZip';

const { Item, ItemGroup } = Menu;

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  constructor(props) {
    super(props);
    const user = window.localStorage.getItem(userName) || '';
    this.state = {
      localStorage: user.split(',').filter(c => c),
      code: JSON.stringify(props.templateData.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    const user = window.localStorage.getItem(userName) || '';
    formatCode({
      code: JSON.stringify(nextProps.templateData.data),
      cb: (code) => {
        this.setState({
          code,
        });
      },
      parser: 'json',
    });
    this.setState({
      localStorage: user.split(',').filter(c => c),
      codeModalShow: false,
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
      saveJsZip(this.props.templateData, () => {
        message.success('生成代码成功。');
      });
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
          className="bar-list-text"
        >
          {key}
        </span>
        <span className="bar-list-remove">
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

  onMoadlOpenClose = () => {
    this.setState({
      codeModalShow: !this.state.codeModalShow,
    });
  }

  onSaveJSON = () => {
    const { data } = this.props.templateData;
    saveJSON(JSON.stringify(data), () => {
      message.success('保存成功。');
    });
  }

  onSaveData = () => {
    const { code } = this.state;
    const { templateData, dispatch, currentEditData } = this.props;
    templateData.data = JSON.parse(code);
    dispatch(setTemplateData(templateData));
    setTimeout(() => {
      if (currentEditData) {
        currentEditData.reRect();
      }
    }, 100);
  }

  onReData = () => {
    const { templateData } = this.props;
    formatCode({
      code: JSON.stringify(templateData.data),
      parser: 'json',
      cb: (code) => {
        this.setState({
          code,
        });
      },
    });
  }

  render() {
    const menuChild = [
      { name: '保存编辑', icon: 'save', onClick: this.onSave },
      { name: '生成预览', icon: 'eye-o', onClick: this.onPreview },
      { name: '生成代码', icon: 'code-o', onClick: this.onSaveCode },
      { name: '编辑数据', icon: 'tool', onClick: this.onMoadlOpenClose },
    ].map((item, i) => (
      <li key={i.toString()} onClick={item.onClick}>
        <Icon type={item.icon} />
        {item.name}
      </li>
    ));
    const menuNewDropdown = this.getNewMenu();
    const winLocation = window.location;
    const protocol = winLocation.protocol;
    const isLocalMode = winLocation.port;
    const port = isLocalMode ? ':7111' : '';
    const href = `${protocol}//${winLocation.hostname}${port}`;
    const newIcon = (
      <div className="right-icon" onClick={this.onClickNew}>
        <Icon type="file-add" />
      </div>
    );
    return (
      <div className={this.props.className}>
        <div className="logo">
          <a href={href} target="_blank">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg"
              alt="logo"
            />
          </a>
        </div>
        <ul className="menu">
          {menuChild}
        </ul>
        {menuNewDropdown ? (
          <Dropdown
            overlay={menuNewDropdown}
            placement="bottomRight"
          >
            {newIcon}
          </Dropdown>) : newIcon}
        <Modal
          title="当前编辑数据"
          visible={this.state.codeModalShow}
          width={800}
          footer={null}
          onCancel={this.onMoadlOpenClose}
        >
          <p>
            <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
            将下载的 JSON 复制到此处，请不要随便改更数据。如果数据出错请刷新。
          </p>
          <CodeMirror
            value={this.state.code}
            options={{
              mode: { name: 'javascript', json: true },
              theme: 'ambiance',
            }}
            onChange={(e, metadata, v) => {
              this.setState({ code: v });
            }}
          />
          <Button type="primary" style={{ marginTop: '1em' }} onClick={this.onSaveData}>保存</Button>
          <Button key="re" style={{ marginLeft: 8 }} onClick={this.onReData}>重置</Button>
          <Button onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>下载 JSON</Button>
        </Modal>
      </div>
    );
  }
}
export default connect(getState)(NavController);
