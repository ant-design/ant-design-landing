import React from 'react';
import { Icon, Tooltip, Modal, Form, Button, Input, message } from 'antd';
import DrawerMenu from 'rc-drawer';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import webData from '../template.config';
import {
  signUpUser,
  removeUser,
} from '../../../edit-module/actions';
import { hasErrors } from '../utils';
import * as utils from '../../../theme/template/utils';
import { getNewHref } from '../../../utils';

const FormItem = Form.Item;

class SideMenu extends React.PureComponent {
  state = {
    editMenuOpen: false,
    lockModalShow: false,
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  getDrawer = (isZhCN) => {
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
              <video src={child.src} width="100%" height="100%" autoPlay loop>
                <track kind="captions" />
              </video>
            )
              : <img src={child.src} width="100%" alt="img" draggable="false" />}
          </div>
          <p>
            {isZhCN ? child.text : child.textEn}
          </p>
        </div>
      ));
    };
    Object.keys(webData).sort((a, b) => (webData[a].order > webData[b].order))
      .forEach((key) => {
        if (key !== 'Other') {
          const item = webData[key];
          children.push((
            <div className="title" key={key}>
              {item.name}
            </div>));
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

  onLockData = () => {
    this.setState({
      lockModalShow: !this.state.lockModalShow,
    });
  }

  onSignUp = (e) => {
    e.preventDefault();
    const { templateData, dispatch } = this.props;
    signUpUser(templateData, this.password, dispatch, () => {
      this.onLockData();
      message.success(
        this.context.intl.formattedMessage({ id: 'app.side.encryption.message' })
      );
      this.props.form.resetFields();
    });
  }

  oonUnLockData = () => {
    const { templateData, dispatch } = this.props;
    removeUser(templateData, dispatch, () => {
      message.success(
        this.context.intl.formattedMessage({ id: 'app.side.encryption.decrypt' })
      );
    });
  }

  getPasswordChild = () => {
    const { form } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.onSignUp}>
        <p style={{ marginBottom: '1em' }}>
          <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
          <FormattedMessage id="app.side.encryption.remarks" />
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
        <FormItem style={{ marginBottom: 0 }}>
          <Button
            disabled={hasErrors(getFieldsError()) || !this.password}
            type="primary"
            htmlType="submit"
          >
            确定
          </Button>
        </FormItem>
        <p>
          <Icon type="warning" style={{ marginRight: 8 }} />
          <FormattedMessage id="app.side.encryption.remarks2" />
        </p>
      </Form>
    );
  }

  handleLangChange = () => {
    const { pathname } = this.props.location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href = currentProtocol + currentHref.replace(
      window.location.pathname,
      utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
    );
  }

  render() {
    const { templateData, location } = this.props;
    const isLock = templateData.data
      && templateData.data.user
      && templateData.data.user.username
      && !templateData.data.user.delete;
    const passwordChild = this.getPasswordChild();
    const isZhCN = utils.isZhCN(location.pathname);
    const drawerChild = this.getDrawer(isZhCN);
    return (
      <div
        className="edit-side-menu-wrapper"
        onMouseLeave={this.hideMenu}
      >
        <DrawerMenu
          level={null}
          getContainer={null}
          handler={null}
          open={this.state.editMenuOpen}
          wrapperClassName="edit-side-drawer"
        >
          <div className="img-content-wrapper">
            {drawerChild}
          </div>
        </DrawerMenu>
        <div className="edit-side-menu">
          <div className={isZhCN ? 'add add-zh' : 'add'} onMouseEnter={this.showMenu}>
            <Icon type="plus-circle-o" />
            <FormattedMessage id="app.side.add" />
          </div>
          <ul className="other" onMouseEnter={this.hideMenu}>
            <Tooltip title={<FormattedMessage id="app.side.lang" />} placement="right">
              <li onClick={this.handleLangChange}>
                {isZhCN ? 'En' : 'Zh'}
              </li>
            </Tooltip>
            <Tooltip title={isLock ? <FormattedMessage id="app.side.decrypt" />
              : <FormattedMessage id="app.side.encryption" />}
              placement="right"
            >
              <li onClick={isLock ? this.oonUnLockData : this.onLockData}>
                <Icon type={isLock ? 'lock' : 'unlock'} />
              </li>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.side.umi-example" />} placement="right">
              <li>
                <a href="https://github.com/ant-motion/landing-umi-example" target="_blank">
                  <Icon type="folder" />
                </a>
              </li>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.side.video-help" />} placement="right">
              <li>
                <a href={`${getNewHref('7111', '', true)}/docs/edit/video`} target="_blank">
                  <Icon type="video-camera" />
                </a>
              </li>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.side.help" />} placement="right">
              <li>
                <a href={`${getNewHref('7111', '', true)}/docs/edit/edit-block`} target="_blank">
                  <Icon type="exclamation-circle-o" />
                </a>
              </li>
            </Tooltip>
          </ul>
        </div>
        <Modal
          title={<FormattedMessage id="app.side.encryption" />}
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
export default Form.create()(SideMenu);
