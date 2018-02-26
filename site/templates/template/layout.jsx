import React from 'react';
import ReactDOM from 'react-dom';
import { scrollScreen } from 'rc-scroll-anim';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import webData from './element/template.config';
import {
  getEditDomData,
} from './utils';
import { getData } from '../../edit/template/utils';
import { getURLData } from '../../theme/template/utils';
import { getUserData } from '../../edit-module/actions';

const Point = require('./other/Point');

const $ = window.$ || {};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.isEdit = getURLData('isEdit');
    if (!this.isEdit) {
      const { dispatch } = props;
      dispatch(getUserData());
    } else {
      $(document.body).append(`
      <style type="text/css">body::-webkit-scrollbar{display:none;}</style>
      `);
    }
    this.state = {
      templateData: props.templateData,
    };
  }
  componentDidUpdate() {
    if (this.isEdit) {
      this.setData();
    }
  }

  componentWillMount() {
    if (this.isEdit) {
      window.addEventListener('message', this.messageHandle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.isEdit) {
      this.setState({
        templateData: nextProps.templateData,
      });
    }
  }

  setData = () => {
    const editData = getEditDomData(this.dom.children);
    // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
    // window.parent.postMessage(editData, '*');

    window.parent.receiveDomData(editData, window);
  }

  messageHandle = (e) => {
    this.setState({
      templateData: e.data,
    });
  }

  getDataToChildren = (data) => {
    const templateData = data.template;
    const otherData = data.other || '';
    const configData = data.config || {};
    const children = templateData.map((key) => {
      const keys = key.split('_');
      const componentName = keys[0];
      const componentData = webData[componentName];
      const d = configData[key] || {};
      const dataSource = { ...componentData.dataSource, ...d.dataSource };
      const dataProps = { ...componentData.dataProps, ...d.dataProps };
      return React.createElement(componentData.component, {
        'data-id': key,
        key,
        dataSource,
        dataProps,
      });
    });
    return children;
  }

  getTemplatesToChildren = () => {
    const { templateData } = this.state;
    const { data, type } = templateData;
    switch (type) {
      case 'default':
        return (
          <div> 加载中。。。 </div>
        );
      case 'error':
        return (
          <div> 数据加载错误。。。</div>
        );
      default:
        return this.getDataToChildren(data);
    }
  };
  render() {
    const children = this.getTemplatesToChildren();
    return (
      <div
        id="templates-wrapper"
        className="templates-wrapper"
        ref={(c) => { this.dom = c; }}
      >
        {children}
      </div>);
  }
}

export default connect(getData)(Layout);
