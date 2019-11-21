/* eslint no-underscore-dangle: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Radio } from 'antd';
import { FormattedMessage } from 'react-intl';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import WaterfallLayout from './component/WaterfallLayout';
import data from '../../../edit/template/template.config';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let maxLength = 0;
Object.keys(data).forEach((key) => {
  const d = data[key].data;
  if (key !== 'Other') {
    d.forEach(() => {
      maxLength += 1;
    });
  }
});

export default class Page3 extends React.Component {
  state = {
    type: 'all',
    imgData: {},
    pageSize: 10,
  };

  imgInLoad = {};

  inQueue = {};

  queueElement = {};

  timeout = null;

  num = 0;

  scrollEventListener = (e) => {
    const showHeight = e.showHeight;
    if (parseFloat(this.waterfallDom.style.height)
      && this.num + this.state.pageSize < maxLength
      && showHeight > parseFloat(this.waterfallDom.style.height) + 200) {
      this.num += 10;
      ticker.clear(this.timeout);
      this.timeout = ticker.timeout(() => {
        // 添加延时处理增加页面，避逸图片加载完后的刷新冲突。。
        this.setState({
          pageSize: this.state.pageSize + this.num,
        }, () => {
          this.num = 0;
        }, 17);
      });
    }
  }

  getHeaderChildrenToRender = () => Object.keys(data).map((key) => (
    key !== 'Other' && (
      <RadioButton value={key} key={key}>
        {key}
        {key === 'Teams' ? '' : 's'}
      </RadioButton>
    )
  ));

  onLabelChange = (v) => {
    const type = v.target.value;
    this.setState({
      type,
      pageSize: 10,
      isSwitchTween: true,
    });
  }

  onSwitchEnd = (e) => {
    if (e.type === 'enter') {
      this.inQueue[e.key] = true;
    } else {
      delete this.inQueue[e.key];
    }
    if (Object.keys(this.inQueue).length >= this.childrenLength) {
      this.setState({
        isSwitchTween: false,
      });
    }
  }

  loadImage = (src, key) => {
    const { imgData } = this.state;
    if (this.imgInLoad[key]) {
      return;
    }
    const img = new Image();
    const load = (e) => {
      const target = e.target;

      const scale = 352 / target.naturalWidth;
      imgData[key] = {
        width: 352,
        height: e.type === 'error' ? 26 : target.naturalHeight * scale,
      };
      // delete this.imgInLoad[key];
      const length = Object.keys(imgData).length;
      if (length >= this.state.pageSize || length >= maxLength) {
        this.setState({
          imgData,
        });
      }
    };
    img.onload = load;
    // img.onerror = load;
    img.src = src;
    this.imgInLoad[key] = true;
  }

  getChildrenToRender = (v, imgData) => {
    const children = [];
    let num = 0;
    Object.keys(data).forEach((key) => {
      const d = data[key].data;
      if (key !== 'Other' && (v === 'all' || v === key)) {
        d.forEach((item, i) => {
          if (item.disabled) {
            return;
          }
          const tKey = `${key}_${i}`;
          const style = imgData[tKey];
          if (num < this.state.pageSize) {
            num += 1;
            if (!style) {
              this.loadImage(item.src, tKey);
            } else {
              children.push(
                <div
                  className="page3-content-item"
                  style={style}
                  key={tKey}
                >
                  <img src={item.src}
                    style={style}
                    alt="img"
                  />
                </div>
              );
            }
          }
        });
      }
    });
    this.childrenLength = children.length;
    return children;
  }

  render() {
    const { type, imgData } = this.state;
    if (this.props.isMobile) {
      return null;
    }
    return (
      <div className="home-page-wrapper page3">
        <div className="home-page">
          <h1 onClick={this.onClick}>
            <FormattedMessage id="app.home.module" />
          </h1>
          <ScrollOverPack
            playScale="0.3"
            className="page3-content"
            onChange={(e) => {
              const pageSize = e.mode === 'enter' ? 5 : 0;
              // 改变页面高度出现多次变更事件
              ticker.clear(this.timeout2);
              this.timeout2 = ticker.timeout(() => {
                this.setState({
                  pageSize,
                });
              }, 17);
            }}
            onScroll={!this.state.isSwitchTween ? this.scrollEventListener : undefined}
          >
            <TweenOne
              key="queue"
              component={RadioGroup}
              componentProps={{ onChange: this.onLabelChange, defaultValue: 'all' }}
              className="page3-content-header"
              animation={{ y: 30, opacity: 0, type: 'from' }}
            >
              <RadioButton value="all" key="all">
                ALL
              </RadioButton>
              {this.getHeaderChildrenToRender()}
            </TweenOne>
            <WaterfallLayout
              key="a"
              queueAnimProps={{
                leaveReverse: true,
                interval: [80, 0],
                duration: 300,
                onEnd: this.onSwitchEnd,
              }}
              itemMargin={48}
              gridWidth={16}
              ref={(c) => {
                this.waterfallDom = ReactDOM.findDOMNode(c);
              }}
            >
              {this.getChildrenToRender(type, imgData)}
            </WaterfallLayout>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}
