import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
/* replace-start */
import './index.less';
/* replace-end */

class Content11 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack
        {...props}
        {...dataSource.OverPack}
      >
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
          /* replace-start */
          data-edit="titleWrapper"
        /* replace-end */
        >
          {
            dataSource.titleWrapper.children.map((item, i) => (
              React.createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div', { key: i.toString(), ...item }, (
                typeof item.children === 'string' && item.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                  ? React.createElement('img', { src: item.children, alt: 'img' })
                  : /* replace-start-value = item.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                /* replace-end-value */
              ))
            ))
          }
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <a
            {...dataSource.button.children.a}
            /* replace-start */
            data-edit="link,text"
          /* replace-end */
          >
            {dataSource.button.children.a.children}
          </a>
        </TweenOne>
      </OverPack>
    );
  }
}

export default Content11;
