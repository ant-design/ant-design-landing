import React from 'react';
import { Icon, message, Menu, Dropdown, Button, Modal, Input, Form, Tooltip } from 'antd';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import 'codemirror/mode/javascript/javascript.js';

import { formatCode, getNewHref, hasErrors } from '../utils';
import { getURLData, setURLData } from '../../../theme/template/utils';
import {
  saveData, userName, newTemplate, removeTemplate, setTemplateData, signUpUser,
  removeUser,
} from '../../../edit-module/actions';
import { saveJsZip, saveJSON } from './saveJsZip';

const { Item, ItemGroup } = Menu;
const FormItem = Form.Item;

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
    message.success('生成预览成功。');
    const { templateData } = this.props;
    const url = `${location.port ? `${location.protocol}//${location.hostname}:7113/`
      : `${location.origin}/templates/`}#uid=${templateData.uid}`;
    window.open(url);
  }

  onSave = (e, cb) => {
    saveData(this.props.templateData, this.props.dispatch, (b) => {
      if (b.code) {
        message.error('保存出错，请重试。');
      } else if (!cb) {
        message.success('保存成功。');
      } else {
        cb();
      }
    });
  }

  onSaveCode = () => {
    /*     if (!location.port && window.ga) {
      window.ga('send', 'event', 'button', 'click', 'download');
    } */
    /* this.onSave(e, () => {
      saveJsZip(this.props.templateData, () => {
        message.success('生成代码成功。');
      });
    }); */
    saveJsZip(this.props.templateData, () => {
      message.success('生成代码成功。');
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
    // json 保存
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

  onLockData = () => {
    this.setState({
      lockModalShow: !this.state.lockModalShow,
    });
  }

  onSignUp = () => {
    const { templateData, dispatch } = this.props;
    signUpUser(templateData, this.password, dispatch, () => {
      this.onLockData();
      message.success('加密成功，请保存。');
    });
  }

  oonUnLockData = () => {
    const { templateData, dispatch } = this.props;
    removeUser(templateData, dispatch, () => {
      message.success('解除密码成功，请保存');
    });
  }

  getPasswordChild = () => {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.onSignUp} >
        <p style={{ marginBottom: '1em' }}>
          <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
          设定密码后，编辑此页面需要输入密码才可以编辑。
        </p>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {
            getFieldDecorator('password', {
              rules: [{ min: 6, message: 'Password must be at least 6 characters.' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  this.password = e.target.value;
                }}
              />
            )
          }
        </FormItem>
        <FormItem>
          <Button
            disabled={hasErrors(getFieldsError())}
            type="primary"
            htmlType="submit"
          >
            确定
          </Button>
        </FormItem>
      </Form>
    );
  }

  render() {
    const { templateData } = this.props;
    const isLock = templateData.data
      && templateData.data.user
      && templateData.data.user.username
      && !templateData.data.user.delete;
    const menuChild = [
      { name: '保存', icon: 'save', onClick: this.onSave },
      { name: '预览', icon: 'eye-o', onClick: this.onPreview },
      { name: '下载', icon: 'code-o', onClick: this.onSaveCode },
      { name: '编辑数据', icon: 'tool', onClick: this.onMoadlOpenClose },
    ].map((item, i) => (
      <li key={i.toString()} onClick={item.onClick}>
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
    const passwordChild = this.getPasswordChild();
    return (
      <div className={this.props.className}>
        <div className="logo">
          <a href={getNewHref()} target="_blank">
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
        <Tooltip placement="bottom" title={isLock ? '取消加密' : '编辑加密'}>
          <div className="right-icon" onClick={isLock ? this.oonUnLockData : this.onLockData}>
            <Icon type={isLock ? 'lock' : 'unlock'} />
          </div>
        </Tooltip>
        <Modal
          title="当前编辑数据"
          visible={this.state.codeModalShow}
          width={800}
          footer={null}
          onCancel={this.onMoadlOpenClose}
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
          <Button type="primary" style={{ marginTop: '1em' }} onClick={this.onSaveData}>保存</Button>
          <Button key="re" style={{ marginLeft: 8 }} onClick={this.onReData}>重置</Button>
          <Button onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>下载 JSON</Button>
        </Modal>
        <Modal
          title="编辑加密"
          visible={this.state.lockModalShow}
          width={400}
          footer={null}
          onCancel={this.onLockData}
          wrapClassName="password-modal"
        >
          {passwordChild}
        </Modal>
      </div>
    );
  }
}
export default Form.create()(NavController);
