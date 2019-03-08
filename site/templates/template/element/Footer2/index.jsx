import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start-value = import { isImg } from './utils'; */
import { isImg } from '../../../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Footer2 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack
          {...dataSource.OverPack}
        >
          <TweenOne {...dataSource.links}>
            {dataSource.links.children.map((item, i) => {
              return (
                <a
                  key={i.toString()}
                  {...item}
                  /* replace-start */
                  data-edit="link,image"
                /* replace-end */
                >
                  <img src={item.children} height="100%" alt="img" />
                </a>
              );
            })}
          </TweenOne>
          <TweenOne
            animation={{ x: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyright}
            /* replace-start */
            data-edit="textAndImage"
          /* replace-end */
          >
            {
              dataSource.copyright.children.map((item, i) => (
                React.createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div', { key: i.toString(), ...item }, (
                  typeof item.children === 'string' && item.children.match(isImg)
                    ? React.createElement('img', { src: item.children, alt: 'img' })
                    : /* replace-start-value = item.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                  /* replace-end-value */
                ))
              ))
            }
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer2;
