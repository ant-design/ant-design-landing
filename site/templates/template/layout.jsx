import React from 'react';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import webData from './element/template.config';
import {
  getEditDomData,
  setDataIdToDataSource,
} from './utils';
import { mergeEditDataToDefault, mdId, getChildRect } from '../../utils';
import { mapStateToProps } from '../../shared/utils';
import * as actions from '../../shared/redux/actions';
import * as ls from '../../shared/localStorage';

import BottomBar from './BottomBar';
import Point from './other/Point';

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
class Layout extends React.Component {
  static getDerivedStateFromProps(props, { prevProps, $self }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      if (!$self.isEdit) {
        nextState.templateData = props.templateData;
      }
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.scrollScreen = false;
    this.isEdit = window.frameElement && window.frameElement.tagName === 'IFRAME';
    if (!this.isEdit) {
      const { dispatch } = props;
      dispatch(actions.getUserData());
    } else {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'body::-webkit-scrollbar{display:none;}';
      document.body.appendChild(style);
      window.addEventListener('message', this.messageHandle);
    }
    this.styleTag = this.createStyle();
    this.state = {
      templateData: props.templateData,
      isMobile,
      $self: this,// eslint-disable-line
    };
  }

  componentDidUpdate(prevProps) {
    if (this.isEdit) {
      // 取不到弹框。
      setTimeout(this.setData);
    }
    scrollScreen.unMount();
    if (this.scrollScreen) {
      const { templateData } = this.state;
      const { data: { template } } = templateData || { data: { template: [] } };
      scrollScreen.init({ location: template.map((c) => !c.match(/Nav/ig) && c).filter((c) => c) });
    }
    if (!this.isEdit && this.props !== prevProps) {
      this.setScrollToWindow();
    }
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: b });
    });
  }

  getSnapshotBeforeUpdate() {
    this.scrollTop = window.scrollY;
    return null;
  }

  setData = () => {
    const editData = getEditDomData(this.dom.children);
    // 增加弹框之类的编辑，，导航的下拉菜单；
    const bodyChild = Array.prototype.slice.call(document.body.childNodes)
      .filter((item) => item.tagName && item.tagName.toLocaleLowerCase() === 'div' && item.getAttribute('id') !== 'react-content');
    const currentPopArray = bodyChild.map((item) => getChildRect(item)).filter((c) => c).flat(Infinity);
    editData.currentPopover = currentPopArray;
    // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
    // window.parent.postMessage(editData, '*');
    if (window.parent.receiveDomData) {
      window.parent.receiveDomData(editData, window, mdId);
    }
  }

  messageHandle = (e) => {
    // FIXME: need much better assert condition
    // console.log('预览页接收:', e.data);
    if (e.data.type && e.data.type.indexOf('webpack') === -1 && e.data.uid) {
      /* Object.keys(localStorage).forEach((key) => {
        localStorage.removeItem(key);
      }); */
      // console.log('预览页接收成功:', e.data);
      ls.saveTemplate({
        id: e.data.uid,
        attributes: e.data.data,
      });
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

  createStyle = (id = '') => {
    const style = document.createElement('style');
    document.body.appendChild(style);
    style.id = id;
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
    }).filter((c) => c);
    let cssStyle = '';
    let cssMobileCss = '';
    style.forEach((item) => {
      if ('cssString' in item) {
        const styleTag = document.getElementById(item.id) || this.createStyle(item.id);
        styleTag.innerHTML = item.cssString;
      } else {
        const cssName = item.className;
        const css = getCssToString(item.css, cssName);
        const mobileCss = getCssToString(item.mobileCss, cssName);
        if (css.length) {
          cssStyle += css.join();
        }
        if (mobileCss.length) {
          cssMobileCss += mobileCss.join();
        }
      }
    });
    // 版本兼容，两个 css render 都带上；
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
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {' '}
            Loading data...
            {' '}
          </div>
        );
      case 'error':
        return (
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {' '}
            Data loading error...
          </div>
        );
      default:
        return this.getDataToChildren();
    }
  };

  render() {
    const children = this.getTemplatesToChildren();
    return [
      (
        <div
          id="templates-wrapper"
          className="templates-wrapper"
          ref={(c) => { this.dom = c; }}
          key="templates"
        >
          {children}
        </div>
      ),
      !this.isEdit && <BottomBar key="bar" />,
    ];
  }
}

export default connect(mapStateToProps)(polyfill(Layout));
