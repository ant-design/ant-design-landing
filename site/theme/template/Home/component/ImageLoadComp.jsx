import React from 'react';
import TweenOne from 'rc-tween-one';
import { Spin } from 'antd';

const imgLoadData = {};

export default class ImageLoadComp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.src;
    this.state = {
      isLoad: imgLoadData[this.id],
      anim: null,
    };
  }

  onImageLoad = () => {
    if (!imgLoadData[this.id] || !this.state.isLoad) {
      this.setState({
        isLoad: true,
      }, () => {
        imgLoadData[this.id] = true;
      });
    }
  }

  onEnter = () => {
    this.setState({
      anim: [
        {
          backgroundPositionY: '100%',
          duration: 4000,
        },
        { backgroundPositionY: '0%', duration: 4000 },
      ],
    });
  }

  onLeave = () => {
    this.setState({
      anim: { backgroundPositionY: '0%' },
    });
  }

  render() {
    const { src, className } = this.props;
    const { isLoad, anim } = this.state;
    const enter = Array.isArray(anim);
    return (
      <Spin spinning={!isLoad}>
        <TweenOne
          repeat={enter ? -1 : null}
          animation={anim}
          className={className || 'img'}
          style={{ backgroundImage: `url(${src})` }}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
        />
        <img alt="img" src={src} onLoad={this.onImageLoad} style={{ display: 'none' }} />
      </Spin>
    );
  }
}
