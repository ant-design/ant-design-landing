import React from 'react';
import ReactDOM from 'react-dom';
import dragula from 'dragula';

import { getCurrentDom } from '../utils';
import { isImg, mergeEditDataToDefault, getTemplateDataAtPath, setTemplateDataAtPath, mdId, objectEqual, getChildRect } from '../../../utils';
import * as utils from '../../../theme/template/utils';
import webData from '../template.config';
import tempData from '../../../templates/template/element/template.config';
import * as actions from '../../../shared/redux/actions';

import EditButton from './StateComponents/EditButtonView';
import Editor from './MediumEditor';
import iframeManager from '../../../shared/iframe';
import EditStageOverlayElement from './EditStageOverlayElement';
import emitter from '../../../shared/emitter';

class EditStateController extends React.Component {
  static defaultProps = {
    className: 'edit-stage',
  };

  state = {
    data: null,
    currentHoverRect: {},
    currentSelectRect: {},
  }

  scrollTop = 0;

  componentDidMount() {
    // 接收子级里传来的 dom 数据;
    // window.addEventListener('message', this.receiveDomData);
    window.receiveDomData = this.receiveDomData;
    // 重置框
    window.addEventListener('resize', this.resetRect);
    emitter.on('edit-stage-reset-rect', this.resetRect);

    // 拖动
    let newId;
    this.side = document.querySelector('.edit-side-drawer .drawer-content .img-content-wrapper');
    this.stage = document.querySelector('.edit-stage .overlay');

    let stateChild;
    const t = dragula([this.side, this.stage], {
      copy: (el, source) => source === this.side,
      moves: (el, container, handle) => (
        handle.classList.contains('drag-hints') || handle.classList.contains('img')
        || handle.tagName.toLocaleLowerCase() === 'img'
      ),
      accepts: (el, source) => {
        if (source === this.stage) {
          const elKey = el.getAttribute('data-key');
          const data = this.state.data;
          const dArr = Object.keys(data).filter(key => key.split('_')[0] === elKey)
            .map(key => parseFloat(key.split('_')[1])).sort();
          newId = `${elKey}_${(dArr[dArr.length - 1] + 1) || 0}`;
          const sourceArray = Array.prototype.slice.call(source.children);
          stateChild = stateChild || sourceArray;
          const placeholder = source.querySelectorAll('.placeholder')[0];
          const ci = sourceArray.indexOf(placeholder);
          if (ci >= 0) {
            const dom = sourceArray[(ci - 1 >= 0) ? ci - 1 : 0];
            if (dom) {
              placeholder.style.top = ci ? `${dom.offsetTop + dom.offsetHeight}px` : 0;
              placeholder.style.zIndex = dom.style.zIndex;
            }
          }
          const ii = sourceArray.indexOf(el);
          if (ii >= 0
            && sourceArray.map(item => item.getAttribute('id')).join()
            !== stateChild.map(item => item.getAttribute('id')).join()) {
            this.setPropsData(el, sourceArray);
            stateChild = sourceArray;
          }
        }
        return source === this.stage;
      },
    });
    t.on('drag', () => {
      newId = '';
      stateChild = null;
      this.isDrag = true;
      this.resetRect();
      this.state.className = `${this.state.className} drag`;
    })
      .on('dragend', () => {
        this.state.className = this.stage.className.replace('drag', '').trim();
        this.isDrag = false;
      })
      .on('drop', (el) => {
        if (el.className === 'placeholder') {
          el.innerHTML = '';
          el.setAttribute('id', newId);
        }
      })
      .on('shadow', (e) => {
        // 挡掉上下拖动滚动跳动；
        this.dom.scrollTop = this.scrollTop;
        // 占位符
        if (e.className.indexOf('img-wrapper') >= 0) {
          e.className = 'placeholder';
          const isZhCN = utils.isZhCN(this.props.location.pathname);
          e.innerHTML = isZhCN ? '放在此处' : 'Placed here';
        }
      })
      .on('out', (el, source) => {
        if (source === this.stage) {
          if (el.className === 'placeholder') { // || el.className === 'overlay-elem'
            this.setPropsData(el, Array.prototype.slice.call(source.children), true);
          }
        }
      })
      .on('cloned', (clone, original, type) => {
        if (type === 'mirror' && clone.className.indexOf('img-wrapper') === -1) {
          const key = clone.getAttribute('data-key');
          const keyName = key.replace(/[^a-z]/ig, '');
          const keyId = parseFloat(key.replace(/[a-z]/ig, ''));
          const item = webData[keyName].data
            .filter((c, i) => (c.uid === keyId || i === keyId))[0];
          clone.style.backgroundImage = `url(${item && item.src})`;
          clone.style.backgroundSize = 'cover';
          clone.style.backgroundPosition = 'center top';
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mediaStateSelect !== this.props.mediaStateSelect) {
      this.resetRect();
    }
  }

  resetRect = (noDispatch) => {
    this.reEditItemVisibility();
    this.currentData = null;
    this.mouseCurrentData = null;
    this.isInput = false;
    this.setState({
      currentHoverRect: {},
      currentSelectRect: {},
      openEditText: false,
    }, () => {
      if (!noDispatch) {
        this.props.dispatch(actions.setCurrentData());
      }
    });
  }

  reEditItemVisibility = () => {
    if (this.currentData) {
      this.currentData.item.style.visibility = '';
    }
  }

  onOverlayScroll = (e) => {
    if (e.target === this.dom) {
      iframeManager.get().scrollTo(0, e.target.scrollTop);
      this.scrollTop = e.target.scrollTop;
    }
    // this.resetRect();
  }

  refreshCurrentData = rectArray => rectArray.filter(item => (
    item.dataId === this.currentData.dataId
  ))[0];


  wrapperMove = (e) => {
    if (this.state.openEditText) {
      return;
    }
    const dom = e.target;
    const { data, currentHoverRect } = this.state;
    let currentSelectRect = this.state.currentSelectRect;
    if (!this.isDrag && dom.getAttribute('data-key')) {
      const id = dom.getAttribute('id');
      const currentElemData = data[id];
      if (id) {
        // 重置数据里的 rect，滚动条发生变化会随着变化。
        currentElemData.rect = currentElemData.item.getBoundingClientRect();
        // 获取子级带 data-id 的 rect; 由于有动画组件，所以时时获取
      }
      const rectArray = currentElemData
        ? getChildRect(currentElemData).concat(data.currentPopover)
        : data.currentPopover;

      if (this.currentData) {
        // dom 在 queueAnim 删除后将不再是当前 dom; 当前从新获取；
        this.currentData = this.refreshCurrentData(rectArray) || this.currentData;
        currentSelectRect = this.currentData.item.getBoundingClientRect();
        this.currentData.rect = currentSelectRect;
      }
      const domRect = this.dom.getBoundingClientRect();
      const pos = {
        x: e.pageX - domRect.x,
        y: e.pageY - domRect.y,
      };
      // console.log({pos, rectArray}, getCurrentDom(pos, rectArray), currentElemData)
      this.mouseCurrentData = getCurrentDom(pos, rectArray) || currentElemData;
      if (this.mouseCurrentData && !objectEqual(this.mouseCurrentData.rect, currentHoverRect)) {
        this.setState({
          currentHoverRect: this.mouseCurrentData.rect,
          currentSelectRect,
        });
      }
    }
  }

  receiveDomData = (data, id) => {
    const { templateData } = this.props;
    const { template } = templateData ? templateData.data : { template: [] };
    let isChange;
    if (template.some(key => key.indexOf('Nav2') >= 0)) {
      isChange = this.addNavLinkData(templateData);
    }
    if (isChange) {
      const { dispatch } = this.props;
      dispatch(actions.setTemplateData(templateData));
    } else {
      Object.keys(id).forEach((key) => {
        mdId[key] = id[key];
      });
      const newState = {
        data,
      };
      const { parentData } = this.currentData || {};
      if (parentData) {
        const rectArray = getChildRect(parentData);
        const isParentNode = this.currentData.dataId === parentData.dataId;
        this.currentData = isParentNode ? this.currentData : this.refreshCurrentData(rectArray);
        if (this.currentData) {
          const currentSelectRect = this.currentData.item.getBoundingClientRect();
          this.currentData.rect = currentSelectRect;
          newState.currentSelectRect = currentSelectRect;
          newState.currentHoverRect = currentSelectRect;
          this.setState(newState);
        } else {
          this.resetRect();
        }
      } else {
        this.setState(newState);
      }
    }
  }

  wrapperLeave = () => {
    if (this.state.openEditText) {
      return;
    }
    this.setState({
      currentHoverRect: {},
    });
  }

  closeEditText = () => {
    this.setState({
      openEditText: false,
    });
  }

  setTemplateConfigData = (text, noHistory = false) => {
    const { templateData } = this.props;
    templateData.noHistory = noHistory;

    const [componentId, path] = this.currentData.dataId.split('-');
    const [templateId] = componentId.split('_');
    setTemplateDataAtPath({
      sourceData: templateData.data.config,
      path: [path, 'children'].join('&'),
      value: text,
      componentId,
      templateId,
    });

    this.props.dispatch(actions.setTemplateData(templateData));
  }

  setTemplateConfigObject = (obj) => {
    const { templateData } = this.props;
    const [componentId, path] = this.currentData.dataId.split('-');
    const [templateId] = componentId.split('_');

    setTemplateDataAtPath({
      sourceData: templateData.data.config,
      path,
      value: obj,
      componentId,
      templateId,
    });

    this.props.dispatch(actions.setTemplateData(templateData));
  }

  editTextHandleChange = (text) => {
    this.isInput = true;
    // 修改 props 里的 dataSource 数据
    this.setTemplateConfigData(text, true);
  }

  editTextHandleBlur = () => {
    const { templateData, dispatch } = this.props;
    // history 实现再刷一次
    dispatch(actions.setTemplateData(templateData));
  }

  getDataSourceChildren = (_t, id) => {
    const ids = id.split('&');
    let t = _t;
    ids.forEach((key) => {
      const nameKey = key.split('=');
      if (nameKey.length > 1 && nameKey[0] === 'array_name') {
        t.forEach((item) => {
          if (item.name === nameKey[1]) {
            t = item;
          }
        });
      } else {
        t = t[key];
      }
    });
    return t;
  }

  getCatcherDom = (rect, css) => {
    if (rect.width || rect.width === 0) {
      let editText;
      let editData;
      if (css === 'select') {
        const currentConfigDataSource = mergeEditDataToDefault(
          this.props.templateData.data.config[this.currentIdArray[0]], tempData[this.editId]);
        editData = this.getDataSourceChildren(currentConfigDataSource,
          this.editChildId);
        editText = editData.children;
        editText = typeof editText === 'string' && editText.match(isImg) ? 'Please enter...' : editText;
      }
      return (
        <div className={css}
          style={{
            width: rect.width,
            height: rect.height,
            left: rect.x,
            top: rect.y + this.scrollTop,
          }}
        >
          {css === 'select' && (
            <EditButton
              setTemplateConfigData={this.setTemplateConfigData}
              setTemplateConfigObject={this.setTemplateConfigObject}
              closeEditText={this.closeEditText}
              openEditTextFunc={this.editTextFunc}
              editButtonArray={this.state.editButton}
              currentData={this.currentData}
              scrollTop={this.scrollTop}
              onParentChange={this.onEditSelectChange}
              editText={editData.children}
              editData={editData}
            />
          )}
          {css === 'select' && this.state.openEditText ? (
            <div className="edit-text-wrapper">
              <Editor
                onChange={this.editTextHandleChange}
                onBlur={this.editTextHandleBlur}// 记录编辑 history
                text={editText}
                ref={(c) => {
                  const d = ReactDOM.findDOMNode(c);
                  if (!d) {
                    return;
                  }
                  if (!this.isInput) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(d);
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                }}
              />
              <style
                dangerouslySetInnerHTML={{
                  __html: `.edit-text-wrapper{${
                    document.defaultView.getComputedStyle(this.currentData.item).cssText}
                    visibility: inherit;
                  }`,
                }}
              />
            </div>
          ) : null}
        </div>
      );
    }
  }

  selectSteState = (currentSelectRect, editData, dom, id) => {
    this.setState({
      currentHoverRect: currentSelectRect,
      currentSelectRect,
      editButton: editData && editData.split(','), // 文字与图片按钮配置
      openEditText: false,
    }, () => {
      const { data } = this.state;
      this.props.dispatch(actions.setCurrentData(
        {
          dom,
          parentDom: dom.parentNode,
          id,
          currentPopover: data && data.currentPopover,
        }
      ));
    });
    this.reEditItemVisibility();
  }

  setPropsData = (el, children, add) => {
    const template = children.map(item => item.getAttribute('id')).filter(id => id);
    const { templateData } = this.props;
    if (el.className === 'placeholder') {
      el.remove();
    }
    templateData.data = {
      ...templateData.data,
      template,
    };
    // 添加 scrollLink 导航的时候，自动添加数据。
    if (add) {
      this.addNavLinkData(templateData);
    }
    const { dispatch } = this.props;
    dispatch(actions.setTemplateData(templateData));
  };

  onClick = (e) => {
    const dom = e.target;
    if (!this.isDrag && dom.getAttribute('data-key') && this.mouseCurrentData) {
      this.selectParentDom = dom;
      this.currentIdArray = this.mouseCurrentData.dataId.split('-');
      this.editId = this.currentIdArray[0].split('_')[0]; // template id
      this.editChildId = this.currentIdArray[1];
      this.currentData = this.mouseCurrentData;
      // console.log(this.state);
      // console.log(this.mouseCurrentData);
      const currentDom = this.currentData.item;
      const editData = currentDom.getAttribute('data-edit');

      this.selectSteState(this.state.currentHoverRect,
        editData, currentDom, this.mouseCurrentData.dataId);
    }
    this.isDrag = false;
  }

  onEditSelectChange = (v) => {
    if (!v) {
      return;
    }
    this.currentIdArray = v.dataId.split('-');
    this.editId = this.currentIdArray[0].split('_')[0];
    this.editChildId = this.currentIdArray[1];
    this.currentData = v;
    const currentDom = v.item;
    const currentDomRect = currentDom.getBoundingClientRect();
    this.currentData.rect.y = currentDomRect.y;
    const editData = currentDom.getAttribute('data-edit');
    this.selectSteState(this.currentData.rect, editData, currentDom, v.dataId);
  }

  editTextFunc = () => {
    this.currentData.item.style.visibility = 'hidden';
    this.isInput = false;
    this.setState({
      openEditText: true,
    });
  }

  onDoubleClick = (e) => {
    const dom = e.target;
    if (dom.getAttribute('data-key') && this.mouseCurrentData) {
      this.currentData = this.mouseCurrentData;
      const editData = this.currentData.item.getAttribute('data-edit');
      if (editData && editData.indexOf('text') >= 0
        && editData !== 'texty' && editData.indexOf('textAndImage') === -1) {
        this.editTextFunc();
      }
    }
  }

  onFuncClick = (type, key) => {
    this.resetRect();
    const { templateData } = this.props;
    const { template, style } = templateData.data;
    const config = templateData.data.config;
    const current = template.indexOf(key);
    switch (type) {
      case 'up':
        template[current] = template.splice(current - 1, 1, template[current])[0];
        break;
      case 'down':
        template[current] = template.splice(current + 1, 1, template[current])[0];
        break;
      default:
        template.splice(current, 1);
        templateData.data.style = style.filter((item) => {
          if (item.cid === key) {
            const styleNode = iframeManager.get().document.getElementById(item.id);
            if (styleNode) {
              styleNode.parentNode.removeChild(styleNode);
            }
          }
          return item.cid !== key;
        });
        delete config[key];
        this.removeNavLinkData(templateData, key);
        break;
    }
    if (this.state.openEditText) {
      this.setState({
        openEditText: false,
      }, () => {
        this.props.dispatch(actions.setTemplateData(templateData));
      });
    } else {
      this.props.dispatch(actions.setTemplateData(templateData));
    }
  }

  addNavLinkData = (templateData) => {
    const { template } = templateData.data;
    const nav2Array = template.filter(key => key.indexOf('Nav2') >= 0);
    const pageArray = template.filter(key => !key.match(/Nav|Footer/ig));
    const config = templateData.data.config;
    let change = false;
    nav2Array.forEach((key) => {
      const menuLink = getTemplateDataAtPath({
        sourceData: config,
        path: 'LinkMenu',
        componentId: key,
        templateId: key.split('_')[0],
      });
      ([].concat(pageArray)).forEach((cKey) => {
        const menuChild = (menuLink && menuLink.children) || [];
        if (menuChild.findIndex(item => item.name === cKey) === -1) {
          const index = pageArray.indexOf(cKey);
          const obj = {
            name: cKey,
            to: cKey,
            children: cKey,
            className: 'menu-item',
          };
          menuChild.splice(index, 0, obj);
          setTemplateDataAtPath({
            sourceData: config,
            path: 'LinkMenu&children',
            componentId: key,
            templateId: key.split('_')[0],
            value: menuChild,
          });
          change = true;
        }
      });
    });
    return change;
  }

  removeNavLinkData = (templateData, current) => {
    const template = templateData.data.template;
    const nav2Array = template.filter(key => key.indexOf('Nav2') >= 0);
    const config = templateData.data.config;
    nav2Array.forEach((key) => {
      const menuLink = getTemplateDataAtPath({
        sourceData: config,
        path: 'menuLink',
        componentId: key,
        templateId: key.split('_')[0],
      });
      const menuChild = (menuLink && menuLink.children) || [];
      const index = menuChild.findIndex(item => item.name === current);
      menuChild.splice(index, 1);
      setTemplateDataAtPath({
        sourceData: config,
        path: 'menuLink&children',
        componentId: key,
        templateId: key.split('_')[0],
        value: menuChild,
      });
    });
  }

  render() {
    const { className, mediaStateSelect } = this.props;
    const { data, currentHoverRect, currentSelectRect, openEditText } = this.state;
    // 去除弹框的数据
    const dataArray = data ? Object.keys(data).filter(key => key !== 'currentPopover') : [];
    const iframe = iframeManager.get();
    const overlayHeight = iframe && iframe.document.getElementById('react-content').offsetHeight;
    return (
      <div
        className={`${className}${mediaStateSelect === 'Mobile' ? ' mobile' : ''}`}
        onScroll={this.onOverlayScroll}
        onMouseLeave={this.wrapperLeave}
        ref={(c) => { this.dom = c; }}
      >
        <div
          data-key="wrapper"
          onMouseMove={this.wrapperMove}
          onMouseEnter={this.wrapperMove}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          className="overlay"
          style={{ height: overlayHeight }}
        >
          {dataArray.map((id, i) => (
            <EditStageOverlayElement key={id} id={id} idx={i} siblingsCount={dataArray.length} onClickToolbarItem={this.onFuncClick} />
          ))}
        </div>
        <div className="mouse-catcher" style={{ height: overlayHeight }}>
          {!objectEqual(currentHoverRect, currentSelectRect) && !openEditText
            && this.getCatcherDom(currentHoverRect, 'hover')}
          {this.currentData && this.getCatcherDom(currentSelectRect, 'select')}
        </div>
      </div>
    );
  }
}
export default EditStateController;
