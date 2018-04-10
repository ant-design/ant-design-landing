import React from 'react';
import Radio from 'antd/lib/radio';
import { FormattedMessage } from 'react-intl';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import WaterfallLayout from './component/WaterfallLayout';

import data from '../../../edit/template/template.config';

const RadioButton = Radio.Button;

const RadioGroup = Radio.Group;

export default class Page3 extends React.Component {
  constructor(props) {
    super(props);
    const imgData = {};
    const type = 'all';
    this.state = {
      type,
      children: this.getChildrenToRender(type, imgData),
      imgData,
    };
  }
  getHeaderChildrenToRender = () =>
    Object.keys(data).map(key => (
      key !== 'Other' && <RadioButton value={key} key={key}>{key}</RadioButton>
    ));
  onLabelChange = (v) => {
    const type = v.target.value;
    this.setState({
      type,
      children: this.getChildrenToRender(type, this.state.imgData),
    });
  }
  loadImage = (src, key) => {
    const img = new Image();
    img.onload = (e) => {
      const target = e.target;
      const { imgData, type } = this.state;
      const scale = 352 / target.naturalWidth;
      imgData[key] = {
        width: 352,
        height: target.naturalHeight * scale,
      };
      if (Object.keys(imgData).length >= this.chidlrenLength) {
        this.setState({
          imgData,
          children: this.getChildrenToRender(type, imgData),
        });
      }
    };
    img.src = src;
  }
  getChildrenToRender = (v, imgData) => {
    let children = [];
    Object.keys(data).forEach((key) => {
      const d = data[key].data;
      if (key !== 'Other' && (v === 'all' || v === key)) {
        const child = d.map((item, i) => {
          const tKey = `${key}_${i}`;
          if (!imgData[tKey]) {
            this.loadImage(item.src, tKey);
          }
          const style = imgData[tKey] || { width: 352, height: 200 };
          return (
            <div
              className="page3-content-item"
              style={style}
              key={tKey}
            >
              <img src={item.src}
                width="100%"
                alt="img"
              />
            </div>
          );
        });
        children = children.concat(child);
      }
    });
    this.chidlrenLength = children.length;
    return children;
  }
  render() {
    return (
      <div className="page-wrapper page3">
        <div className="page" >
          <h1 onClick={this.onClick}><FormattedMessage id="app.home.module" /></h1>
          <ScrollOverPack playScale="0.3" className="page3-content">
            <QueueAnim
              key="queue"
              leaveReverse
              component={RadioGroup}
              componentProps={{ onChange: this.onLabelChange, defaultValue: 'all' }}
              className="page3-content-header"
              delay={[0, 400]}
            >
              <RadioButton value="all" key="all">ALL</RadioButton>
              {this.getHeaderChildrenToRender()}
            </QueueAnim>
            <WaterfallLayout
              key="a"
              queueAnimProps={{ leaveReverse: true, interval: [80, 0], duration: 300 }}
              itemMargin={48}
              gridWidth={8}
            >
              {this.state.children}
            </WaterfallLayout>
          </ScrollOverPack>
        </div>
      </div>);
  }
}
