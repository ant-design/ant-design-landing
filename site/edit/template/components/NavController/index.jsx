/* eslint-disable no-console */
import React from 'react';
import { message, Button, Modal, Popconfirm, Tooltip } from 'antd';
import Icon, {
  LoadingOutlined,
  SaveOutlined,
  EyeOutlined,
  CodeOutlined,
  CloudUploadOutlined,
  ToolOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import { FormattedMessage, injectIntl } from 'react-intl';
import 'codemirror/mode/javascript/javascript.js';

import { saveJsZip, saveJSON } from '../saveJsZip';
import { formatCode } from '../../utils';
import { getNewHref, RemoveLocalStorage } from '../../../../utils';
import { saveData } from '../../../../shared/utils';
import * as actions from '../../../../shared/redux/actions';
import * as ls from '../../../../shared/localStorage';
import { DEFAULT_USER_NAME } from '../../../../shared/constants';

import NewFileButton from './NewFileButton';
import HistoryButton from './HistoryButton';
import PublishModal from './PublishModal';

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  constructor(props) {
    super(props);
    this.state = {
      code: JSON.stringify(props.templateData.data),
      publishModalShow: false,
    };
  }

  onPreview = () => {
    /* this.onSave(e, () => {
      message.success('生成预览成功。');
    }); */
    if (!location.port && window.gtag) {
      window.gtag('event', 'preview');
    }
    message.success(this.props.intl.formatMessage({ id: 'app.header.preview.message' }));
    const { templateData } = this.props;
    // 如果在预览页清除数据，再生成预览将没有数据，手动写入；
    window.document.getElementById('myIframe').contentWindow.postMessage(templateData, '*');
    const url = `${location.port ? `${location.protocol}//${location.hostname}:7113/`
      : `${location.origin}/templates/`}#uid=${templateData.uid}`;
    window.open(url);
  }

  onSave = (e, type, templateData, cb) => {
    if (type === 'menu' && !location.port && window.gtag) {
      window.gtag('event', 'save');
    }
    this.setState({
      saveLoad: true,
    }, () => {
      const finalTemplateData = templateData || this.props.templateData;
      saveData(finalTemplateData).then(() => {
        const { dispatch } = this.props;
        dispatch(actions.setTemplateData(finalTemplateData));
        if (!cb) {
          message.success(this.props.intl.formatMessage({ id: 'app.header.save.message' }));
        } else {
          cb();
        }
        this.setState({ saveLoad: false });
      }).catch((error) => {
        console.error(JSON.stringify(error));
        message.error(this.props.intl.formatMessage({ id: 'app.header.save.message.error' }));
        cb();
      });
    });
  }

  onSaveCode = () => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'download');
    }
    this.setState({
      downloadLoad: true,
    }, () => {
      saveJsZip(this.props.templateData, (c) => {
        if (c !== 'error') {
          message.success(
            this.props.intl.formatMessage({ id: 'app.header.download.message' })
          );
        }
        this.setState({
          downloadLoad: false,
        });
      });
    });
  }

  // TODO: move this to localStorage.js?
  onRemoveAllLocalStorage = () => {
    const templateIds = ls.getUserTemplateIds(DEFAULT_USER_NAME);
    templateIds.forEach((id) => {
      if (!id) return;
      ls.removeTemplate(id);
    });
    ls.removeUserTemplateIds(DEFAULT_USER_NAME);

    location.href = location.origin;
  }

  onChangeDataOpenModal = () => {
    if (!this.state.codeModalShow) {
      formatCode({
        code: JSON.stringify(this.props.templateData.data),
        cb: (code) => {
          this.setState({
            code,
          });
        },
        parser: 'json',
      });
    }
    this.setState({
      codeModalShow: !this.state.codeModalShow,
    });
  }

  onSaveJSON = () => {
    const { data } = this.props.templateData;
    saveJSON(JSON.stringify(data), () => {
      message.success(this.props.intl.formatMessage({ id: 'app.header.save.message' }));
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
    dispatch(actions.setTemplateData(templateData));
    setTimeout(() => {
      if (currentEditData) {
        currentEditData.reRect();
      }
      this.onChangeDataOpenModal();
    }, 100);
  }

  onUploadCloud = () => {
    this.setState({
      publishModalShow: !this.state.publishModalShow,
    });
  }

  changePublishState = (b) => {
    this.setState({
      publishLoad: b,
    });
  }

  render() {
    const { saveLoad, downloadLoad, publishLoad, code, codeModalShow, publishModalShow } = this.state;
    const menuChild = [
      {
        name: <FormattedMessage id="app.header.save" key="m" />,
        icon: saveLoad ? <LoadingOutlined /> : <SaveOutlined />,
        onClick: saveLoad ? null : (e) => this.onSave(e, 'menu'),
      },
      {
        name: <FormattedMessage id="app.header.preview" key="m" />,
        icon: <EyeOutlined />,
        onClick: this.onPreview,
      },
      {
        name: <FormattedMessage id="app.header.download" key="m" />,
        icon: downloadLoad ? <LoadingOutlined /> : <CodeOutlined />,
        onClick: downloadLoad ? null : this.onSaveCode,
      },
      {
        name: <FormattedMessage id="app.header.publish-cloud" key="m" />,
        icon: publishLoad ? <LoadingOutlined /> : <CloudUploadOutlined />,
        onClick: this.onUploadCloud,
      },
      {
        name: <FormattedMessage id="app.header.edit-data" key="m" />,
        icon: <ToolOutlined />,
        onClick: this.onChangeDataOpenModal,
      },
      {
        name: <FormattedMessage id="app.header.clear-cache" key="m" />,
        icon: <Icon component={() => RemoveLocalStorage('18')} />,
        onClick: this.onRemoveAllLocalStorage,
        tooltip: <FormattedMessage id="app.header.clear-exp" key="t" />,
      },
    ].map((item, i) => {
      let children = (
        <Tooltip title={item.name}>
          <a onClick={item.tooltip ? null : item.onClick} disabled={!item.onClick}>
            {item.icon}
          </a>
        </Tooltip>
      );

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
        <li key={i.toString()}>
          {children}
        </li>
      );
    });
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
        <NewFileButton />
        <HistoryButton />
        <Modal
          title={<FormattedMessage id="app.header.edit-data.header" />}
          visible={codeModalShow}
          width={800}
          footer={null}
          onCancel={this.onChangeDataOpenModal}
        >
          <p style={{ marginBottom: 16 }}>
            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
            <FormattedMessage id="app.header.edit-data.remarks" />
          </p>
          <CodeMirror
            value={code}
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
          <Button type="primary" onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>
            <FormattedMessage id="app.header.edit-data.download" />
          </Button>
          <Button key="close" style={{ marginLeft: 8 }} onClick={this.onChangeDataOpenModal}>
            <FormattedMessage id="app.common.cancel" />
          </Button>
        </Modal>
        <PublishModal
          title={<FormattedMessage id="app.header.publish-cloud.header" />}
          visible={publishModalShow}
          width={640}
          footer={null}
          location={this.props.location}
          onCancel={this.onUploadCloud}
          templateData={this.props.templateData}
          onSave={this.onSave}
          changePublishState={this.changePublishState}
        />
      </div>
    );
  }
}
export default injectIntl(NavController);
