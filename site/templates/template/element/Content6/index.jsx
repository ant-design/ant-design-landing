import React from 'react';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'content4',
  };

  getChildrenToRender = data =>
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
          <div className="content-wrapper">
            <span>
              <img src={item.children.img} height="100%" />
            </span>
            <p>
              {item.children.content}
            </p>
          </div>
        </li>);
      });

  getEnterAnim = (e, isMode) => {
    const index = e.index;
    const delay = isMode ? index * 50 + 200 : index % 4 * 100 + Math.floor(index / 4) * 100 + 300;
    return {
      y: '+=30', opacity: 0, type: 'from', delay,
    };
  };

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const isMode = props.isMode;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const childrenToRender = this.getChildrenToRender(dataSource);
    delete props.dataSource;
    delete props.isMode;
    return (
      <div
        {...props}
        className="content-template-wrapper content4-wrapper"
      >
        <OverPack
          className={`content-template ${props.className}`}
        >
          <TweenOne
            animation={{
              y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
            }}
            component="h1"
            key="h1"
            reverseDelay={300}
            id={`${props.id}-title`}
          >
            {dataSource[`${name}_title`].children}
          </TweenOne>
          <TweenOne
            animation={{
              y: '+=30', opacity: 0, type: 'from', delay: 200, ease: 'easeOutQuad',
            }}
            component="p"
            key="p"
            reverseDelay={200}
            id={`${props.id}-content`}
          >
            {dataSource[`${name}_content`].children}
          </TweenOne>
          <TweenOneGroup
            className={`${props.className}-img-wrapper`}
            component="ul"
            key="ul"
            enter={e => this.getEnterAnim(e, isMode)}
            leave={{ y: '+=30', opacity: 0, ease: 'easeOutQuad' }}
            id={`${props.id}-ul`}
          >
            {childrenToRender}
          </TweenOneGroup>
        </OverPack>
      </div>
    );
  }
}


export default Content;
