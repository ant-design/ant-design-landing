/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import * as r from 'ramda';
import { Icon, Button, Form, Modal, Input, Tooltip, message, notification } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import ticker from 'rc-tween-one/lib/ticker';
import store from 'store';

import { saveJsZip } from '../saveJsZip';
import { isZhCN } from '../../../../theme/template/utils';

const { Item } = Form;
const { TextArea } = Input;

const buildId = 'antd-landing-build';

const nowURL = 'https://antd-landing.now.sh/';

const remarks = {
  'en-US': (
    <span>
      Disclaimer: Since we are an open source project, so we will post your edited web page directly to
      {' '}
      <a target="_blank" href="https://zeit.co/now">Now</a>
      {' '}
      free space, if you have any questions, you can ask questions on
      <a target="_blank" href="https://github.com/ant-design/ant-design-landing/issues">
        Github Issues
      </a>
      , Any copyright or other liability issues are not related to this website.
    </span>
  ),
  'zh-CN': (
    <span>
      免责说明: 由于我们是开源项目，所以我们将你编辑的网页直接发布到
      {' '}
      <a target="_blank" href="https://zeit.co/now">Now</a>
      {' '}
      的免费空间上, 如有任何问题都可以在
      {' '}
      <a target="_blank" href="https://github.com/ant-design/ant-design-landing/issues">
        Github Issues
      </a>
      {' '}
      上提问！任何版权或其它责任问题与本网站无关。
    </span>
  ),
};

class PublishModal extends React.Component {
  state = {
    isLoad: false,
    explain: [
      <p key="0"><FormattedMessage id="app.header.publish-cloud.build" /></p>,
      <p key="1">
        <FormattedMessage id="app.header.publish-cloud.state" />
        {' FORMAT'}
      </p>,
    ],
  };

  componentDidMount() {
    // 监听有没有在发布
    const { templateData } = this.props;
    const currentBuild = store.get(buildId);
    if (currentBuild && currentBuild[templateData.uid]) {
      this.setState({ isLoad: true }, () => {
        this.props.changePublishState(true);
        this.onMonitorPublishState(currentBuild[templateData.uid]);
      });
    }
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { templateData } = this.props;
        templateData.data.page = values;
        if (!location.port && window.gtag) {
          window.gtag('event', 'save_publish');
        }
        this.setState({
          isLoad: true,
        }, () => {
          this.props.onSave(e, 'modal', templateData, () => {
            this.props.changePublishState(true);
            this.onPublish(templateData, values);
          });
        });
      }
    });
  }

  publishEnd = () => {
    this.setState({
      isLoad: false,
    });
    const currentBuild = store.get(buildId);
    const { templateData } = this.props;
    delete currentBuild[templateData.uid];
    store.set(buildId, currentBuild);
    this.props.changePublishState(false);
    ticker.clear(this.getPublishState);
  }

  onMonitorPublishState = (id) => {
    const { explain } = this.state;
    const { templateData } = this.props;
    ticker.clear(this.getPublishState);
    const currentUrl = `${templateData.uid}.antdlanding.now.sh`;
    this.getPublishState = ticker.interval(() => {
      fetch(`${nowURL}api/deploy/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then((res) => {
        const { url, lambdas: [item] } = res;
        if (item) {
          switch (item.readyState) {
            case 'READY':
              notification.open({
                message: this.props.intl.formatMessage({ id: 'app.header.publish-cloud.success' }),
                description: (
                  <p>
                    {this.props.intl.formatMessage({ id: 'app.header.publish-cloud.successRemarks' })}
                    <a href={`https://${currentUrl}`} target="_blank">
                      {currentUrl}
                    </a>
                  </p>
                ),
              });
              console.log('当前生成的 URL:', url);
              this.publishEnd();
              break;
            case 'ERROR':
              message.error(this.props.intl.formatMessage({ id: 'pp.header.publish-cloud.error' }));
              this.publishEnd();
              break;
            default:
              explain.push((
                <p key={explain.length.toString()}>
                  <FormattedMessage id="app.header.publish-cloud.state" />
                  {' '}
                  {item.readyState}
                </p>
              ));
              this.setState({ explain });
              break;
          }
        }
      });
    }, 5000);
  }

  onPublish = (templateData, pageData) => {
    saveJsZip(templateData, (data) => {
      if (data === 'error') {
        this.setState({
          isLoad: false,
        });
        this.props.changePublishState(false);
        return;
      }
      fetch(`${nowURL}api/deploy`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: templateData.uid,
          files: [
            {
              file: 'pages/document.ejs',
              data: `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <title>${pageData.title || ''}</title>
    <meta name="Description" content="${pageData.description || ''}" />
    ${pageData.fraction ? `<link rel="icon" href="${pageData.fraction}" type="image/x-icon"></link>` : ''}
  </head>
  <body>
    <div id="<%= context.config.mountElementId %>"></div>
  </body>
</html>`,
            },
            ...data,
          ],
        }),
      }).then(res => res.json())
        .then(({ id }) => {
          // 记录发布状态；
          const currentBuild = store.get(buildId);
          currentBuild[templateData.uid] = id;
          store.set(buildId, currentBuild);
          this.onMonitorPublishState(id);
        })
        .catch(error => console.error('Error:', error));
    }, true);
  }

  render() {
    const { templateData, location, onSave, changePublishState, form, ...props } = this.props;
    const { getFieldDecorator } = form;
    const { isLoad, explain } = this.state;
    const locale = isZhCN(location.pathname) ? 'zh-CN' : 'en-US';
    const page = templateData.data.page || {};
    const url = `${templateData.uid}.antdlanding.now.sh`;
    return (
      <Modal
        {...props}
      >
        {isLoad ? (
          <div
            style={{
              color: '#E6E1DC',
              backgroundColor: '#202020',
              boxShadow: 'inset 0 0 10px black',
              height: 300,
              overflowY: 'auto',
              padding: 16,
            }}
          >
            {explain}
          </div>
        ) : (
          <>
            <h3 style={{ marginBottom: 16 }}>
              <FormattedMessage id="app.header.publish-cloud.explain" />
            </h3>
            <p>
              <Icon type="profile" />
              {' '}
              {remarks[locale]}
            </p>
            <p style={{ margin: '8px 0' }}>
              <Icon type="experiment" />
              {' '}
              <FormattedMessage id="app.header.publish-cloud.remarks" />
            </p>
            <p>
              <Icon type="exclamation-circle" />
              {' '}
              <FormattedMessage id="app.header.publish-cloud.remarks2" />
            </p>
            <h3 style={{ marginTop: 16 }}>
              <FormattedMessage id="app.header.publish-cloud.meta" />
            </h3>
            <Form onSubmit={this.onClick} className="modal-form">
              <Item label="Title">
                {getFieldDecorator('title', {
                  initialValue: page.title,
                })(<Input />)}
              </Item>
              <Item label="Description">
                {getFieldDecorator('description', {
                  initialValue: page.description,
                })(<TextArea />)}
              </Item>
              <Item
                label={(
                  <span>
                      Favicon (ico, png or jpg)
                    <Tooltip title={<FormattedMessage id="app.header.publish-cloud.favicon" />}>
                      <Icon type="question-circle" style={{ margin: '0 8px' }} />
                    </Tooltip>
                  </span>
                  )}
              >
                {getFieldDecorator('favicon', {
                  initialValue: page.favicon,
                })(<Input />)}
              </Item>
              <Item style={{ marginTop: 16 }}>
                <Button disabled={isLoad} type="primary" icon={isLoad ? 'loading' : 'cloud-upload'} htmlType="submit">
                  <FormattedMessage id="app.header.publish-cloud.button" />
                </Button>

              </Item>
            </Form>
            <p style={{ lineHeight: 2, fontSize: 14, marginTop: 8 }}>
              <FormattedMessage id="app.header.publish-cloud.currentURL" />
              <a href={`https://${url}`} target="_blank">
                {url}
              </a>
            </p>
          </>
        )}
      </Modal>
    );
  }
}

export default r.compose(
  connect(),
  Form.create({ name: 'form_modal' }),
)(injectIntl(PublishModal));
