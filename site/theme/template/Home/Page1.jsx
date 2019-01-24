import React from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { FormattedMessage } from 'react-intl';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { isZhCN } from '../utils';

const isCN = isZhCN(location.href);
const page1 = [
  {
    title: <FormattedMessage id="app.home.fatures.language" />,
    link: `/docs/introduce${isCN ? '-cn' : ''}`,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/QCcDSfdbCIbVSsUZJaQK.svg',
  },
  {
    title: <FormattedMessage id="app.home.fatures.sketch" />,
    link: `/docs/download${isCN ? '-cn' : ''}`,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/hMSnSxMzmiGSSIXxFtNf.svg',
  },
  {
    title: <FormattedMessage id="app.home.fatures.responsive" />,
    link: `/docs/guide/layout${isCN ? '-cn' : ''}`,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/OMEOieDFPYDcWXMpqqzd.svg',
  },
];

const pointPos = [
  { x: -90, y: -20 },
  { x: 35, y: -25 },
  { x: -120, y: 125 },
  { x: -100, y: 165 },
  { x: 95, y: -5 },
  { x: 90, y: 160, opacity: 0.2 },
  { x: 110, y: 50 },
];

export default class Page1 extends React.PureComponent {
  state = {
    hoverNum: null,
  }

  onMouseOver = (i) => {
    this.setState({
      hoverNum: i,
    });
  }

  onMouseOut = () => {
    this.setState({
      hoverNum: null,
    });
  }

  getEnter = (e) => {
    const i = e.index;
    const r = (Math.random() * 2) - 1;
    const y = (Math.random() * 10) + 5;
    const delay = Math.round(Math.random() * (i * 30));
    return [
      {
        delay, opacity: 0.4, ...pointPos[e.index], ease: 'easeOutBack', duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: (Math.random() * 1000) + 2000,
        yoyo: true,
        repeat: -1,
      }];
  }

  getChildrenToRender = () => {
    const { hoverNum } = this.state;
    const { isMobile } = this.props;
    return page1.map((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        'point-ring left', 'point-ring point-ring-0 right',
        'point-0', 'point-2', 'point-1', 'point-3', 'point-2',
      ].map((className, ii) => (
        <i
          className={className}
          key={ii.toString()}
        />
      ));
      return (
        <Col md={8} xs={24} key={i.toString()} className="page1-item">
          <Link
            className="page1-item-link"
            to={item.link}
            onMouseEnter={() => { this.onMouseOver(i); }}
            onMouseLeave={this.onMouseOut}
          >
            <TweenOneGroup
              enter={this.getEnter}
              leave={{
                x: 0, y: 30, opacity: 0, duration: 300, ease: 'easeInBack',
              }}
              resetStyle={false}
              exclusive
              className="point-wrapper"
            >
              {(isHover || isMobile) && pointChild}
            </TweenOneGroup>
            <div className="page1-item-img">
              <img src={item.src} alt="img" />
            </div>
            <div className="page1-item-title">
              {item.title}
            </div>
          </Link>
        </Col>
      );
    });
  }

  render() {
    const children = this.getChildrenToRender();
    return (
      <div className="home-page-wrapper page1">
        <div className="home-page">
          <h1>
            <FormattedMessage id="app.home.features" />
          </h1>
          <ScrollOverPack playScale="0.3" className="page1-content">
            <QueueAnim key="queue" type="bottom" leaveReverse component={Row}>
              {children}
            </QueueAnim>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}
