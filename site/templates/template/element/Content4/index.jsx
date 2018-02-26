import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import '../../../static/content.less';
import './index.less';

class Content extends React.Component {
  static defaultProps = {
    className: 'content2',
  };

  getDelay = e => e % 3 * 100 + Math.floor(e / 3) * 100 + 300;

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    const oneAnim = {
      y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
    };
    const children = Object.keys(dataSource).filter(key => key.match('block'))
      .sort((a, b) => {
        const aa = Number(a.replace(/[^0-9]/ig, ''));
        const bb = Number(b.replace(/[^0-9]/ig, ''));
        return aa - bb;
      })
      .map((key, i) => {
        const item = dataSource[key];
        const childrenObj = item.children;
        const id = key.split('_')[1];
        const delay = this.getDelay(i);
        const liAnim = {
          opacity: 0, type: 'from', ease: 'easeOutQuad', delay,
        };
        const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 };
        return (<TweenOne
          component="li"
          animation={liAnim}
          key={i}
          id={`${props.id}-${id}`}
        >
          <TweenOne
            animation={{
              x: '-=10', opacity: 0, type: 'from', ease: 'easeOutQuad',
            }}
            className="img"
            key="img"
          >
            <img src={childrenObj.icon} width="100%" />
          </TweenOne>
          <div className="text">
            <TweenOne key="h1" animation={childrenAnim} component="h1">
              {childrenObj.title}
            </TweenOne>
            <TweenOne key="p" animation={{ ...childrenAnim, delay: delay + 200 }} component="p">
              {childrenObj.content}
            </TweenOne>
          </div>
        </TweenOne>);
      });
    return (
      <div {...props} className={`content-template-wrapper ${props.className}-wrapper`}>
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            key="h1"
            animation={oneAnim}
            component="h1"
            id={`${props.id}-title`}
            reverseDelay={100}
          >
            {dataSource[`${name}_title`].children}
          </TweenOne>
          <TweenOne
            key="p"
            animation={{ ...oneAnim, delay: 100 }}
            component="p"
            id={`${props.id}-titleContent`}
          >
            {dataSource[`${name}_titleContent`].children}
          </TweenOne>
          <QueueAnim
            key="ul"
            type="bottom"
            className={`${props.className}-contentWrapper`}
            id={`${props.id}-contentWrapper`}
          >
            <ul key="ul">
              {children}
            </ul>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
