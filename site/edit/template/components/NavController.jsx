import React from 'react';
import { Icon, message, Menu, Dropdown, Button, Modal, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import { FormattedMessage } from 'react-intl';
import 'codemirror/mode/javascript/javascript.js';

import { formatCode } from '../utils';
import { getNewHref, RemoveLocalStorage } from '../../../utils';
import { getURLData, setURLData } from '../../../theme/template/utils';
import {
  saveData, userName, newTemplate, setTemplateData,
} from '../../../edit-module/actions';
import { saveJsZip, saveJSON } from './saveJsZip';

const { Item, ItemGroup } = Menu;

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
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
    message.success(this.context.intl.formatMessage({ id: 'app.header.preview.message' }));
    const { templateData } = this.props;
    // 如果在预览页清除数据，再生成预览将没有数据，手动写入；
    window.document.getElementById('myIframe').contentWindow.postMessage(templateData, '*');
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
          message.error(this.context.intl.formatMessage({ id: 'app.header.save.message.error' }));
        } else if (!cb) {
          message.success(this.context.intl.formatMessage({ id: 'app.header.save.message' }));
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
        message.success(
          this.context.intl.formatMessage({ id: 'app.header.download.message' })
        );
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
    window.localStorage.removeItem(key);
    this.setState({
      localStorage,
    });
    // 删除线上数据
    // removeTemplate(key);
    const current = getURLData('uid');
    if (current === key) {
      this.onClickItem({ key: localStorage[0] });
    }
  }

  onRemoveAllLocalStorage = () => {
    window.localStorage.getItem(userName).split(',').forEach((key) => {
      if (!key) {
        return;
      }
      window.localStorage.removeItem(key);
    });
    window.localStorage.removeItem(userName);
    location.href = location.origin;
  }

  onSyncData = (key) => {
    window.localStorage.removeItem(key);
    const current = getURLData('uid');
    if (current === key) {
      message.success(
        this.context.intl.formatMessage({ id: 'app.header.new-file.message' }),
        0.1,
        () => {
          location.reload();
        });
    } else {
      message.success(
        this.context.intl.formatMessage({ id: 'app.header.new-file.message2' })
      );
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
            style={{ margin: '0 8px' }}
          >
            <Icon component={() => RemoveLocalStorage('14')} />
          </Button>
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
      <Menu style={{ width: 282, textAlign: 'center' }} onClick={this.onClickItem}>
        <ItemGroup title={<FormattedMessage id="app.header.new-file.header" />} key="0">
          {localChild}
        </ItemGroup>
      </Menu>
    );
  }

  onChangeDataOpenModal = () => {
    this.setState({
      codeModalShow: !this.state.codeModalShow,
    });
  }

  onSaveJSON = () => {
    const { data } = this.props.templateData;
    saveJSON(JSON.stringify(data), () => {
      message.success(this.context.intl.formatMessage({ id: 'app.header.save.message' }));
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
        name: <FormattedMessage id="app.header.save" key="m" />,
        icon: this.state.isLoad === '保存' ? 'loading' : 'save',
        onClick: this.state.isLoad === '保存' ? null : this.onSave,
      },
      {
        name: <FormattedMessage id="app.header.preview" key="m" />,
        icon: 'eye-o',
        onClick: this.onPreview,
      },
      {
        name: <FormattedMessage id="app.header.download" key="m" />,
        icon: this.state.isLoad === '下载' ? 'loading' : 'code-o',
        onClick: this.state.isLoad === '下载' ? null : this.onSaveCode,
      },
      { name: <FormattedMessage id="app.header.edit-data" key="m" />, icon: 'tool', onClick: this.onChangeDataOpenModal },
      {
        name: <FormattedMessage id="app.header.clear-cache" key="m" />,
        compoennt: () => RemoveLocalStorage('18'),
        onClick: this.onRemoveAllLocalStorage,
        tooltip: <FormattedMessage id="app.header.clear-exp" key="t" />,
      },
    ].map((item, i) => {
      const iconProps = item.compoennt ? { component: item.compoennt } : { type: item.icon };
      let children = [<Icon {...iconProps} key="icon" />, item.name];
      if (item.tooltip) {
        children = (
          <Popconfirm
            title={item.tooltip}
            onConfirm={item.onClick}
            okText={<FormattedMessage id="app.common.ok" />}
            cancelText={<FormattedMessage id="app.common.cancel" />}
            overlayStyle={{ width: 320 }}
          >
            {children}
          </Popconfirm>
        );
      }
      return (
        <li key={i.toString()} onClick={item.tooltip ? null : item.onClick} disabled={!item.onClick}>
          {children}
        </li>
      );
    });
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
          </Dropdown>
        ) : newIcon}
        <Modal
          title={<FormattedMessage id="app.header.edit-data.header" />}
          visible={this.state.codeModalShow}
          width={800}
          footer={null}
          onCancel={this.onChangeDataOpenModal}
        >
          <p style={{ marginBottom: 16 }}>
            <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
            <FormattedMessage id="app.header.edit-data.remarks" />
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
            <FormattedMessage id="app.header.save" />
          </Button>
          <Button key="re" style={{ marginLeft: 8 }} onClick={this.onReData}>
            <FormattedMessage id="app.header.reset" />
          </Button>
          <Button onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>
            <FormattedMessage id="app.header.edit-data.download" />
          </Button>
        </Modal>
      </div>
    );
  }
}
export default NavController;
