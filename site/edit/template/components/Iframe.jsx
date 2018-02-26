import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../../edit-module/actions';
import { getData } from '../utils';

class Iframe extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    const { templateData } = nextProps;
    const { type } = templateData;
    if (type === 'success'
      && this.iframe.contentWindow
      && this.iframe.contentWindow.postMessage) {
      // 与 iframe 通信；
      this.iframe.contentWindow.postMessage(templateData, '*');
    }
  }
  getData = () => {
    const { dispatch } = this.props;
    dispatch(getUserData());
  }
  render() {
    const { templateData, className } = this.props;
    const { type, uid } = templateData;
    const location = window.location;
    const protocol = location.protocol;
    const isLocalMode = location.port;
    const port = isLocalMode ? ':7113' : '';
    const mainPath = isLocalMode ? '' : '/templates';
    let iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#isEdit=true`;
    if (type === 'success') {
      // 通过路由刷新 iframe 里 props;
      iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#uid=${uid}&isEdit=true`;
    }
    return (
      <iframe
        src={iframeSrc}
        title="template"
        onLoad={this.getData}
        id="myIframe"
        ref={(c) => {
          this.iframe = c;
        }}
        className={className}
      />
    );
  }
}

export default connect(getData)(Iframe);
