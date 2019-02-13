import React from 'react';
import { Icon, message, notification, Button, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import NavController from './components/NavController';
import SideMenu from './components/SideMenu';
import EditInfluence from './components/EditInfluence';
import Iframe from './components/Iframe';
import EditStageController from './components/EditStageController';
import EditListController from './components/EditListController';
import { getState, getNewHref } from '../../utils';
import { hasErrors } from './utils';
import { getUserData, loginIn } from '../../edit-module/actions';
import NewFileButton from './components/NewFileButton';


const FormItem = Form.Item;

class Layout extends React.PureComponent {
  state = {
    loading: false,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserData());
    notification.open({
      placement: 'bottomRight',
      message: '问题收集',
      description: (
        <p>
          目前编辑器处于测试阶段，如果你在编辑的过程中出现任何问题，都可以在
          {' '}
          <a href="https://github.com/ant-design/ant-design-landing/issues" target="_black">Landing issues</a>
          {' '}
          上提出，我们会及时解决你的问题，谢谢！
        </p>),
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      duration: 0,
    });
  }

  componentDidUpdate() {
    if (!this.validateForm && this.props.templateData.data) {
      this.props.form.validateFields();
      this.validateForm = true;
    }
  }

  onLogin = (event) => {
    event.preventDefault();
    const { templateData, dispatch, form } = this.props;
    const id = templateData.data.user.userId;
    this.setState({
      loading: true,
    }, () => {
      form.validateFields((error, values) => {
        if (!error) {
          loginIn(values.password, id, dispatch, (e) => {
            this.setState({
              loading: false,
            }, () => {
              if (e) {
                message.success('登入成功。');
              } else {
                form.setFields({
                  password: {
                    value: values.password,
                    errors: [new Error('password error')],
                  },
                });
              }
            });
          });
        }
      });
    });
  }

  render() {
    const { templateData, userIsLogin, form } = this.props;
    if (!templateData.data) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </div>
      );
    }
    if (templateData.data.user && templateData.data.user.userId && !templateData.data.user.delete && !userIsLogin) {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
      const passwordError = isFieldTouched('password') && getFieldError('password');
      const passwordNo = (getFieldError('password') || []).indexOf('password error') >= 0;
      return (
        <div className="login-controller" key="1">
          <div className={`login-view${passwordNo ? ' password-no' : ''}`}>
            <a href={getNewHref('7111', null, true)} target="_blank" className="header">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg"
                alt="logo"
                width="20"
              />
            </a>
            <Form onSubmit={this.onLogin}>
              <p>
                <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
                <FormattedMessage id="app.login.title" />
              </p>
              <FormItem
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {
                  getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Password must be at least 6 characters.' },
                      { min: 6, message: 'Password must be at least 6 characters.' },
                    ],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                <Button
                  loading={this.state.loading}
                  disabled={hasErrors(getFieldsError())}
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  <FormattedMessage id="app.common.ok" />
                </Button>

              </FormItem>
            </Form>
            <div>
              <p>
                <Icon type="warning" />
                {' '}
                <FormattedMessage id="app.login.noPassword" />
              </p>
              <NewFileButton>
                <Button style={{ width: '100%' }}><FormattedMessage id="app.login.new" /></Button>
              </NewFileButton>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="edit-wrapper" key="2">
        <div className="edit-left-view">
          <NavController {...this.props} />
          <div className="edit-content-wrapper">
            <SideMenu {...this.props} />
            <div className="edit-stage-wrapper">
              <EditInfluence {...this.props} />
              <Iframe
                className="edit-preview"
              />
              <EditStageController {...this.props} />
            </div>
          </div>
        </div>
        <div className="edit-right-view">
          <EditListController {...this.props} />
        </div>
      </div>
    );
  }
}


export default connect(getState)(Form.create()(Layout));
