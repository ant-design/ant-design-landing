import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import VideoPlay from 'react-sublime-video';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static defaultProps = {
    className: 'content3',
  };

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    const dataSource = props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    const animation = {
      y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
    };
    const videoChildren = dataSource[`${name}_video`].children;
    return (
      <div {...props} className={`content-template-wrapper ${props.className}-wrapper`}>
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            animation={animation}
            component="h1"
            key="h1"
            reverseDelay={300}
            id={`${props.id}-title`}
          >
            {dataSource[`${name}_title`].children}
          </TweenOne>
          <TweenOne
            animation={{ ...animation, delay: 200 }}
            component="p"
            key="p"
            reverseDelay={200}
            id={`${props.id}-content`}
          >
            {dataSource[`${name}_content`].children}
          </TweenOne>
          <TweenOne
            key="video"
            animation={{ ...animation, delay: 300 }}
            className={`${props.className}-video`}
            id={`${props.id}-video`}
          >
            {isMode ?
              (<video src={videoChildren} width="100%" loop />) :
              (<VideoPlay loop src={videoChildren} width="100%" />)}
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}


export default Content;
