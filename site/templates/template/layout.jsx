import React from 'react';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import webData from './element/template.config';
import {
  getEditDomData,
  setDataIdToDataSource,
} from './utils';
import { getState, mergeEditDataToDefault, mdId } from '../../utils';
import { getURLData } from '../../theme/template/utils';
import { getUserData } from '../../edit-module/actions';

import Point from './other/Point';

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.scrollScreen = false;
    this.isEdit = getURLData('isEdit');
    if (!this.isEdit) {
      const { dispatch } = props;
      dispatch(getUserData());
    } else {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'body::-webkit-scrollbar{display:none;}';
      document.body.appendChild(style);
    }
    this.styleTag = this.createStyle();
    this.state = {
      templateData: props.templateData,
      isMobile,
    };
  }

  componentDidUpdate() {
    if (this.isEdit) {
      this.setData();
    }
    scrollScreen.unMount();
    if (this.scrollScreen) {
      const docHeight = this.dom.getBoundingClientRect().height;
      scrollScreen.init({ docHeight });
    }
  }

  componentWillMount() {
    if (this.isEdit) {
      window.addEventListener('message', this.messageHandle);
    }
    enquireScreen((b) => {
      this.setState({ isMobile: b });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isEdit) {
      this.setState({
        templateData: nextProps.templateData,
      }, this.setScrollToWindow);
    }
  }

  componentWillUpdate() {
    this.scrollTop = window.scrollY;
  }

  setData = () => {
    const editData = getEditDomData(this.dom.children);
    // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
    // window.parent.postMessage(editData, '*');
    if (window.parent.receiveDomData) {
      window.parent.receiveDomData(editData, window, mdId);
    }
  }

  messageHandle = (e) => {
    if (e.data.type && e.data.type.indexOf('webpack') === -1) {
      window.localStorage.setItem(e.data.uid, JSON.stringify({
        id: e.data.uid,
        attributes: e.data.data,
      }));
      this.setState({
        templateData: e.data,
      }, this.setScrollToWindow);
    }
  }

  setScrollToWindow = () => {
    // 拖动模板后，滚动回位；
    if (this.scrollTop) {
      window.scrollTo(0, this.scrollTop);
    }
  }

  createStyle = () => {
    const style = document.createElement('style');
    document.body.appendChild(style);
    return style;
  }

  setStyleData = (style) => {
    const getCssToString = (css, className) => Object.keys(css).sort((a, b) => (
      stateSort[a] - stateSort[b]
    )).map((key) => {
      switch (key) {
        case 'default':
          return css[key].trim() && `${className} {${css[key]}}`;
        default:
          return css[key].trim() && `${className}:${key} {${css[key]}}`;
      }
    }).filter(c => c);
    let cssStyle = '';
    let cssMobileCss = '';
    style.forEach((item) => {
      const cssName = item.className;
      const css = getCssToString(item.css, cssName);
      const mobileCss = getCssToString(item.mobileCss, cssName);
      if (css.length) {
        cssStyle += css.join();
      }
      if (mobileCss.length) {
        cssMobileCss += mobileCss.join();
      }
    });
    this.styleTag.innerHTML = `${cssStyle || ''}${cssMobileCss
      ? `${mobileTitle}${cssMobileCss}}` : ''}`;
  }

  getDataToChildren = () => {
    const { templateData } = this.state;
    const { data, funcData } = templateData;
    const func = { ...funcData };
    const template = data.template;
    this.setStyleData(data.style);
    const otherData = data.other;
    const configData = data.config || {};
    const children = template.map((key) => {
      const keys = key.split('_');
      const componentName = keys[0];
      const componentData = webData[componentName];
      /*       if (key.indexOf('Nav2') >= 0) {
              const pageArray = template.filter(cKey => !cKey.match(/Nav|Footer/ig));
              const menuLink = getDataSourceValue('menuLink', configData, [key, 'dataSource']);
              console.log(menuLink);
              ([].concat(pageArray)).forEach((cKey) => {
                const menuChild = menuLink.children || [];
                console.log(cKey, menuChild.map(item => item.name), menuChild.findIndex(item => item.name === cKey) === -1)
                if (menuChild.findIndex(item => item.name === cKey) === -1) {
                  const index = pageArray.indexOf(cKey);
                  const obj = {
                    name: cKey,
                    to: cKey,
                    children: cKey,
                  };
                  menuChild.splice(index, 0, obj);
                  menuLink.children = menuChild;
                }
              });
            } */
      const d = configData[key] || {};
      const dataSource = this.isEdit ? setDataIdToDataSource(mergeEditDataToDefault(d, componentData, true), key)
        : mergeEditDataToDefault(d, componentData, true);
      return React.createElement(componentData.component, {
        key,
        id: key,
        dataSource,
        func: func[key],
        isMobile: this.state.isMobile,
      });
    });
    this.scrollScreen = false;
    Object.keys(otherData).forEach((key) => {
      switch (key) {
        case 'point': {
          children.push((
            <Point
              key="point"
              data={template}
              {...otherData[key]}
            />
          ));
          break;
        }
        case 'full':
          if (!this.isEdit) {
            this.scrollScreen = true;
          }
          break;
        default:
          break;
      }
    });
    return children;
  }

  getTemplatesToChildren = () => {
    const { templateData } = this.state;
    const { type } = templateData;
    switch (type) {
      case 'default':
        return (
          <div>
            {' '}
            加载中。。。
            {' '}
          </div>
        );
      case 'error':
        return (
          <div>
            {' '}
            数据加载错误。。。
          </div>
        );
      default:
        return this.getDataToChildren();
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

export default connect(getState)(Layout);
