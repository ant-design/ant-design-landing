import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'banner2',
  };

  render() {
    const props = { ...this.props };
    const dataSource = this.props.dataSource;
    const names = this.props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const isMode = props.isMode;
    delete props.dataSource;
    delete props.isMode;
    const childrenData = [];
    Object.keys(dataSource).filter(key => key.match('Block')).forEach((key) => {
      const keys = key.split('Block');
      const i = keys[1];
      childrenData[i] = childrenData[i] || {};
      const t = childrenData[i];
      t[key] = dataSource[key];
    });
    const childrenToRender = childrenData.map((item, i) => {
      const title = item[`${name}_titleBlock${i}`];
      const content = item[`${name}_contentBlock${i}`];
      const button = item[`${name}_buttonBlock${i}`];
      const isImg = title.children
        .match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/);
      const follow = !isMode ? {
        delay: 1000,
        minMove: 0.1,
        data: [
          {
            id: `bg$${i}`, value: 15, bgPosition: '50%', type: ['backgroundPositionX'],
          },
          { id: `${props.id}-wrapperBlock${i}`, value: -15, type: 'x' },
        ],
      } : null;
      return (<Element
        key={i}
        prefixCls="banner-user-elem"
        followParallax={follow}
      >
        <BgElement
          className={`bg bg${i}`}
          key="bg"
          id={`bg$${i}`}
          scrollParallax={{ y: 100 }}
        />
        <QueueAnim
          type={['bottom', 'top']}
          delay={200}
          className={`${props.className}-title`}
          key="text"
          id={`${props.id}-wrapperBlock${i}`}
        >
          <span
            className="logo"
            key="logo"
            id={`${props.id}-titleBlock${i}`}
          >
            {isImg ?
              (<img width="100%" src={title.children} />) :
              title.children}
          </span>
          <p
            key="content"
            id={`${props.id}-contentBlock${i}`}
          >
            {content.children}
          </p>
          <Button
            type="ghost"
            key="button"
            id={`${props.id}-buttonBlock${i}`}
          >
            {button.children}
          </Button>
        </QueueAnim>
      </Element>);
    });
    return (
      <OverPack
        {...props}
      >
        <TweenOneGroup
          key="banner"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <BannerAnim
            key="banner"
          >
            {childrenToRender}
          </BannerAnim>
        </TweenOneGroup>
        <TweenOne
          animation={{
            y: '-=20', yoyo: true, repeat: -1, duration: 1000,
          }}
          className={`${this.props.className}-icon`}
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

export default Banner;
