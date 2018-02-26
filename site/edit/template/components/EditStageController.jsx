import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import deepEql from 'deep-eql';
import dragula from 'dragula';
import Editor from 'react-medium-editor';
import { setTemplateData } from '../../../edit-module/actions';
import { getData, getChildRect, getCurrentDom, isImg } from '../utils';
import { mergeURLDataToDefault } from '../../../templates/template/utils';
import webData from '../template.config';
import tempData from '../../../templates/template/element/template.config';
import EditButtton from './EditButtonView';

const $ = window.$ || {};
// const domElem = document.createElement('div');

class EditStateController extends React.PureComponent {
  static defaultProps = {
    className: 'edit-stage',
  };

  state = {
    data: null,
    iframe: null,
    rect: {},
    editText: '',
    currentRect: {},
  }
  scrollTop = 0;

  componentDidMount() {
    // 接收子级里传来的 dom 数据;
    // window.addEventListener('message', this.receiveDomData);
    window.receiveDomData = this.receiveDomData;
    // 重置框
    $(window).resize(this.reRect);
    // 拖动
    let newId;
    this.side = document.querySelector('.edit-side-drawer .drawer-content');
    this.stage = document.querySelector('.edit-stage .overlay');

    const t = dragula([this.side, this.stage], {
      copy: (el, source) => source === this.side,
      accepts: (el, source) => {
        if (source === this.stage) {
          const elKey = el.getAttribute('data-key');
          const data = this.state.data;
          const length = Object.keys(data).filter(key => key.split('_')[0] === elKey).length;
          newId = `${elKey}_${length}`;
        }
        return source === this.stage;
      },
    });
    t.on('drag', () => {
      newId = '';
      this.isDrap = true;
      this.setState({
        rect: {},
        currentRect: {},
      });
      $(this.stage).addClass('drag');
    })
      .on('dragend', () => {
        this.isDrap = false;
        $(this.stage).removeClass('drag');
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
          e.innerHTML = '放在此处';
        }
      })
      .on('out', (el, source) => {
        if (el.className === 'placeholder' || !el.className) {
          const children = Array.prototype.slice.call(source.children);
          const template = children.map(item => item.getAttribute('id')).filter(id => id);
          const { templateData } = this.props;
          if (el.className) {
            el.remove();
          }
          templateData.data = {
            ...templateData.data,
            template,
          };
          const { dispatch } = this.props;
          dispatch(setTemplateData(templateData));
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
          clone.style.backgroundPosition = 'center';
        }
      });
  }

  reRect = () => {
    this.setState({
      rect: {},
      currentRect: {},
    });
  }

  onOverlayScroll = (e) => {
    const iframeWindow = this.state.iframe;
    iframeWindow.scrollTo(0, e.target.scrollTop);
    this.scrollTop = e.target.scrollTop;
    // this.reRect();
  }

  wrapperMove = (e) => {
    if (!this.isDrap) {
      const dom = e.target;
      const id = dom.getAttribute('id');
      this.currentData = this.state.data[id];
      // 获取 data 里的 rect;
      const dataRect = this.currentData.item.getBoundingClientRect();
      // 重置数据里的 rect，滚动条发生变化会随着变化。
      this.currentData.rect = {
        width: dataRect.width,
        height: dataRect.height,
        x: dataRect.x,
        y: dataRect.y + this.scrollTop,
      };
      // 获取子级带 data-id 的 rect; 由于有动画组件，所以时时获取
      const rect = getChildRect(this.currentData);
      const pos = {
        x: e.pageX - 40, // 40 为左侧距离
        y: e.pageY - 80, // 80 为顶部距离
      };
      this.mouseCurrentData = getCurrentDom(pos, rect, this.scrollTop) || this.currentData;

      if (!deepEql(this.mouseCurrentData.rect, this.state.rect)) {
        this.setState({
          rect: this.mouseCurrentData.rect,
        });
      }
    }
  }

  receiveDomData = (data, iframe) => {
    this.setState({
      data,
      iframe,
    });
  }
  wrapperLeave = () => {
    this.setState({
      rect: {},
    });
  }


  closeEditText = () => {
    this.setState({
      openEditText: false,
    });
  }

  getEditButton = () => {

  }

  setTemplateConfigData = (text) => {
    const id = this.currentIdArray[0];
    const data = this.props.templateData;
    data.data.config[id] = data.data.config[id] || {};
    data.data.config[id].dataSource = data.data.config[id].dataSource || {};
    // domElem.innerHTML = text.replace(/<\/?[a-zA-Z]+[^><]*>/g, '');
    data.data.config[id].dataSource[this.editChildId] = text;// domElem.innerText;
    this.props.dispatch(setTemplateData(data));
    setTimeout(() => {
      // 等子级刷新。
      const rect = this.currentDom.getBoundingClientRect();
      this.setState({
        currentRect: {
          x: rect.x,
          y: rect.y + this.scrollTop,
          width: rect.width,
          height: rect.height,
        },
      });
    });
  }

  editTextHandleChange = (text) => {
    this.setState({
      editText: text,
      isInput: true,
    }, () => {
      // 修改 props 里的 dataSource 数据
      this.setTemplateConfigData(text);
    });
  }

  getCatcherDom = (rect, css) => {
    if (rect.width) {
      let editText;
      if (css === 'select') {
        this.currentConfigData = mergeURLDataToDefault(
          this.props.templateData.data.config[this.currentIdArray[0]], tempData[this.editId]);
        editText = this.currentConfigData.dataSource[this.editChildId];
      }
      return (
        <div className={css}
          style={{
            width: rect.width,
            height: rect.height,
            left: rect.x,
            top: rect.y,
          }}
        >
          {css === 'select' && <EditButtton
            setTemplateConfigData={this.setTemplateConfigData}
            closeEditText={this.closeEditText}
            openEditTextFunc={this.editTextFunc}
            editButtonArray={this.state.editButton}
            editText={editText}
          />}
          {css === 'select' && this.state.openEditText ? (
            <div className="edit-text-wrapper">
              <Editor
                text={this.state.editText}
                onChange={this.editTextHandleChange}
                options={{ toolbar: false }}
                ref={(c) => {
                  const d = ReactDOM.findDOMNode(c);
                  if (!d) {
                    return;
                  }
                  if (!this.state.isInput) {
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
                  __html: `.edit-text-wrapper{${this.state.editTextStyle}}`,
                }}
              />
            </div>) : null}
        </div>
      );
    }
  }

  onClick = () => {
    this.currentIdArray = this.mouseCurrentData.dataId.split('-');
    this.editId = this.currentIdArray[0].split('_')[0];
    this.editChildId = this.currentIdArray[1];
    this.currentDom = this.mouseCurrentData.item;
    const editData = this.currentDom.getAttribute('data-edit');
    this.setState({
      currentRect: this.state.rect,
      editButton: editData && editData.split(','), // 文字与图片按钮配置
      openEditText: false,
      isInput: false,
    });
  }

  editTextFunc = () => {
    this.currentConfigData = mergeURLDataToDefault(
      this.props.templateData.data.config[this.currentIdArray[0]], tempData[this.editId]);
    let editText = this.currentConfigData.dataSource[this.editChildId];
    editText = editText.match(isImg) ? '请输入...' : editText;
    this.setState({
      editText,
      openEditText: true,
      isInput: false,
      editTextStyle: document.defaultView.getComputedStyle(this.currentDom).cssText,
    });
  }

  onDoubleClick = () => {
    this.currentDom = this.mouseCurrentData.item;
    const editData = this.currentDom.getAttribute('data-edit');
    if (editData && editData.indexOf('text') >= 0) {
      this.editTextFunc();
    }
  }

  render() {
    const { className } = this.props;
    const { data, rect, currentRect, iframe, openEditText } = this.state;
    const overlayChild = data && Object.keys(data).map((key) => {
      const item = data[key];
      const itemRect = item.rect;
      return (
        <div
          key={key}
          id={key}
          data-key={key.split('_')[0]}
          style={{ width: itemRect.width, height: itemRect.height }}
          onMouseMove={this.wrapperMove}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
        >
          <p className="drag-hints"><Icon type="bars" /> 拖拽加中键滚动可更换位置</p>
        </div>);
    });
    const overlayHeight = iframe && iframe.document.getElementById('react-content').offsetHeight;
    return (
      <div
        className={className}
        onScroll={this.onOverlayScroll}
        onMouseLeave={this.wrapperLeave}
        ref={(c) => { this.dom = c; }}
      >
        <div className="overlay" style={{ height: overlayHeight }}>
          {overlayChild}
        </div>
        <div className="mouse-catcher" >
          {!deepEql(rect, currentRect) && !openEditText && this.getCatcherDom(rect, 'hover')}
          {this.getCatcherDom(currentRect, 'select')}
        </div>
      </div>
    );
  }
}
export default connect(getData)(EditStateController);

