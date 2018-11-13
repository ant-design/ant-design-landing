import React from 'react';
import { Icon, message, Menu, Dropdown, Button, Modal } from 'antd';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import 'codemirror/mode/javascript/javascript.js';

import { formatCode } from '../utils';
import { getNewHref } from '../../../utils';
import { getURLData, setURLData } from '../../../theme/template/utils';
import {
  saveData, userName, newTemplate, removeTemplate, setTemplateData,
} from '../../../edit-module/actions';
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
      isLoad: null,
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
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

  onPreview = () => {
    /* this.onSave(e, () => {
      message.success('生成预览成功。');
    }); */
    if (!location.port && window.gtag) {
      window.gtag('event', 'preview');
    }
    message.success('生成预览成功。');
    const { templateData } = this.props;
    const url = `${location.port ? `${location.protocol}//${location.hostname}:7113/`
      : `${location.origin}/templates/`}#uid=${templateData.uid}`;
    window.open(url);
  }

  onSave = (e, cb) => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'save');
    }
    this.setState({
      isLoad: '保存',
    }, () => {
      saveData(this.props.templateData, this.props.dispatch, (b) => {
        if (b.code) {
          message.error('保存出错，请重试。');
        } else if (!cb) {
          message.success('保存成功。');
        } else {
          cb();
        }
        this.setState({ isLoad: null });
      });
    });
  }

  onSaveCode = () => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'download');
    }
    this.setState({
      isLoad: '下载',
    }, () => {
      saveJsZip(this.props.templateData, () => {
        message.success('生成代码成功。');
        this.setState({
          isLoad: null,
        });
      });
    });
  }

  onClickNew = () => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'newTemplate');
    }
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

  onSyncData = (key) => {
    window.localStorage.removeItem(key);
    const current = getURLData('uid');
    if (current === key) {
      message.success('数据已刷新。', 0.1, () => {
        location.reload();
      });
    } else {
      message.success('数据已刷新, 当前模板不是你刷新的模板，请自行切换。');
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
              this.onSyncData(key);
            }}
            size="small"
            shape="circle"
            icon="sync"
            style={{ margin: '0 8px' }}
          />
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
      <Menu style={{ width: 280, textAlign: 'center' }} onClick={this.onClickItem}>
        <ItemGroup title="近期所建" key="0">
          {localChild}
        </ItemGroup>
      </Menu>);
  }

  onChangeDataOpenModal = () => {
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
    // json 保存
    if (!location.port && window.gtag) {
      window.gtag('event', 'saveJson');
    }
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
      {
        name: '保存',
        icon: this.state.isLoad === '保存' ? 'loading' : 'save',
        onClick: this.state.isLoad === '保存' ? null : this.onSave,
      },
      {
        name: '预览',
        icon: 'eye-o',
        onClick: this.onPreview,
      },
      {
        name: '下载',
        icon: this.state.isLoad === '下载' ? 'loading' : 'code-o',
        onClick: this.state.isLoad === '下载' ? null : this.onSaveCode,
      },
      { name: '编辑数据', icon: 'tool', onClick: this.onChangeDataOpenModal },
    ].map((item, i) => (
      <li key={i.toString()} onClick={item.onClick} disabled={!item.onClick}>
        <Icon type={item.icon} />
        {item.name}
      </li>
    ));
    const menuNewDropdown = this.getNewMenu();
    const newIcon = (
      <div className="right-icon" onClick={this.onClickNew}>
        <Icon type="file-add" />
      </div>
    );
    return (
      <div className={this.props.className}>
        <a href={getNewHref('7111', null, true)}>
          <div className="logo">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg"
              alt="logo"
            />
          </div>
        </a>
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
          onCancel={this.onChangeDataOpenModal}
        >
          <p style={{ marginBottom: 16 }}>
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
          <Button type="primary" style={{ marginTop: '1em' }} onClick={this.onSaveData}>
            保存
          </Button>
          <Button key="re" style={{ marginLeft: 8 }} onClick={this.onReData}>
            重置
          </Button>
          <Button onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>
            下载 JSON
          </Button>
        </Modal>
      </div>
    );
  }
}
export default NavController;
