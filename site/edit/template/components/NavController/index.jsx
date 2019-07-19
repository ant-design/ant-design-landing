import React from 'react';
import { Icon, message, Button, Modal, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import CodeMirror from 'rc-editor-list/lib/components/common/CodeMirror';
import { FormattedMessage } from 'react-intl';
import 'codemirror/mode/javascript/javascript.js';

import { formatCode } from '../../utils';
import { getNewHref, RemoveLocalStorage } from '../../../../utils';
import {
  saveData, userName, setTemplateData,
} from '../../../../edit-module/actions';
import { saveJsZip, saveJSON } from '../saveJsZip';
import NewFileButton from './NewFileButton';
import HistoryButton from './HistoryButton';
import PublishModal from './PublishModal';

class NavController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-nav',
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      code: JSON.stringify(props.templateData.data),
      publishModalShow: false,
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
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

  onSave = (e, type, templateData, cb) => {
    if (type === 'menu' && !location.port && window.gtag) {
      window.gtag('event', 'save');
    }
    this.setState({
      saveLoad: true,
    }, () => {
      saveData(templateData || this.props.templateData, this.props.dispatch, (b) => {
        if (b.code) {
          message.error(this.context.intl.formatMessage({ id: 'app.header.save.message.error' }));
        } else if (!cb) {
          message.success(this.context.intl.formatMessage({ id: 'app.header.save.message' }));
        } else {
          cb();
        }
        this.setState({ saveLoad: false });
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
            this.context.intl.formatMessage({ id: 'app.header.download.message' })
          );
        }
        this.setState({
          downloadLoad: false,
        });
      });
    });
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
    const { saveLoad, downloadLoad, currentEditData, publishLoad, code, codeModalShow, publishModalShow } = this.state;
    const menuChild = [
      {
        name: <FormattedMessage id="app.header.save" key="m" />,
        icon: saveLoad ? 'loading' : 'save',
        onClick: saveLoad ? null : e => this.onSave(e, 'menu'),
      },
      {
        name: <FormattedMessage id="app.header.preview" key="m" />,
        icon: 'eye-o',
        onClick: this.onPreview,
      },
      {
        name: <FormattedMessage id="app.header.download" key="m" />,
        icon: downloadLoad ? 'loading' : 'code-o',
        onClick: downloadLoad ? null : this.onSaveCode,
      },
      {
        name: <FormattedMessage id="app.header.publish-cloud" key="m" />,
        icon: publishLoad ? 'loading' : 'cloud-upload',
        onClick: this.onUploadCloud,
      },
      { name: <FormattedMessage id="app.header.edit-data" key="m" />, icon: 'tool', onClick: this.onChangeDataOpenModal },
      {
        name: <FormattedMessage id="app.header.clear-cache" key="m" />,
        component: () => RemoveLocalStorage('18'),
        onClick: this.onRemoveAllLocalStorage,
        tooltip: <FormattedMessage id="app.header.clear-exp" key="t" />,
      },
    ].map((item, i) => {
      const iconProps = item.component ? { component: item.component } : { type: item.icon };
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
        <HistoryButton
          templateData={this.props.templateData}
          dispatch={this.props.dispatch}
          reRect={currentEditData ? currentEditData.reRect : null}
        />
        <Modal
          title={<FormattedMessage id="app.header.edit-data.header" />}
          visible={codeModalShow}
          width={800}
          footer={null}
          onCancel={this.onChangeDataOpenModal}
        >
          <p style={{ marginBottom: 16 }}>
            <Icon type="exclamation-circle" style={{ marginRight: 8 }} />
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
          <Button key="re" style={{ marginLeft: 8 }} onClick={this.onReData}>
            <FormattedMessage id="app.header.reset" />
          </Button>
          <Button onClick={this.onSaveJSON} style={{ marginLeft: 8 }}>
            <FormattedMessage id="app.header.edit-data.download" />
          </Button>
        </Modal>
        <PublishModal
          title={<FormattedMessage id="app.header.publish-cloud.header" />}
          visible={publishModalShow}
          width={640}
          footer={null}
          location={this.props.location}
          dispatch={this.props.dispatch}
          onCancel={this.onUploadCloud}
          templateData={this.props.templateData}
          onSave={this.onSave}
          changePublishState={this.changePublishState}
        />
      </div>
    );
  }
}
export default NavController;
