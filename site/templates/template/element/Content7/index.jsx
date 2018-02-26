import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'content5',
  };

  getBlockChildren = data =>
    Object.keys(data).filter(key => key.match('block'))
      .sort((a, b) => {
        const aa = Number(a.replace(/[^0-9]/ig, ''));
        const bb = Number(b.replace(/[^0-9]/ig, ''));
        return aa - bb;
      })
      .map((key) => {
        const item = data[key];
        return (<li
          key={key}
          id={`${this.props.id}-${key.split('_')[1]}`}
        >
          <span>
            <img src={item.children.img} width="100%" />
          </span>
          <h2>{item.children.title}</h2>
          <p>{item.children.content}</p>
        </li>);
      });


  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const isMode = props.isMode;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const ulChildren = this.getBlockChildren(dataSource);
    delete props.dataSource;
    delete props.isMode;
    const queue = isMode ? 'bottom' : 'left';
    const imgAnim = isMode ? {
      y: 30, opacity: 0, delay: 400, type: 'from', ease: 'easeOutQuad',
    }
      : {
        x: 30, opacity: 0, type: 'from', ease: 'easeOutQuad',
      };
    return (
      <div {...props} className="content-template-wrapper content5-wrapper">
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <QueueAnim
            className={`${props.className}-text`}
            key="text"
            type={queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            id={`${props.id}-textWrapper`}
          >
            <h1
              key="h1"
              id={`${props.id}-title`}
            >
              {dataSource[`${name}_title`].children}
            </h1>
            <p
              key="p"
              id={`${props.id}-content`}
            >
              {dataSource[`${name}_content`].children}
            </p>
            <QueueAnim
              component="ul"
              key="ul"
              type={queue}
              id={`${props.id}-ul`}
              ease="easeOutQuad"
            >
              {ulChildren}
            </QueueAnim>
          </QueueAnim>
          <TweenOne
            className={`${props.className}-img`}
            key="img"
            animation={imgAnim}
            id={`${props.id}-img`}
            resetStyleBool
          >
            <img src={dataSource[`${name}_img`].children} width="100%" />
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}


export default Content;
