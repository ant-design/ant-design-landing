import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'content7',
  };

  getBlockChildren = data =>
    Object.keys(data).filter(key => key.match('block'))
      .sort((a, b) => {
        const aa = Number(a.replace(/[^0-9]/ig, ''));
        const bb = Number(b.replace(/[^0-9]/ig, ''));
        return aa - bb;
      })
      .map((key, i) => {
        const item = data[key];
        return (
          <li key={i} id={`${this.props.id}-${key.split('_')[1]}`}>
            <div className="icon">
              <img src={item.children.icon} width="100%" />
            </div>
            <h3>{item.children.title}</h3>
            <p>{item.children.content}</p>
          </li>
        );
      });

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    const listChildren = this.getBlockChildren(dataSource);
    return (
      <div
        {...props}
        className={`content-template-wrapper ${props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={300}
            id={`${props.id}-title`}
          >
            {dataSource[`${name}_title`].children}
          </TweenOne>
          <QueueAnim
            component="ul"
            type="bottom"
            key="block"
            leaveReverse
            id={`${props.id}-contentWrapper`}
          >
            {listChildren}
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
