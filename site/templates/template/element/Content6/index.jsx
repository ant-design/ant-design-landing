import React from 'react';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */

class Content7 extends React.Component {
  getBlockChildren = data => data.map((item) => {
    const { title, img, content } = item;
    ['title', 'img', 'contnet'].forEach(key => delete item[key]);
    return (
      <li
        key={item.name}
        {...item}
      >
        <span {...img}>
          <img src={img.children} width="100%" alt="img" />
        </span>
        <h2 {...title}>
          {
            /* replace-start-value = title.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
            /* replace-end-value */
          }
        </h2>
        <div {...content}>
          {
            /* replace-start-value = content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
            /* replace-end-value */
          }
        </div>
      </li>
    );
  });


  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    const ulChildren = this.getBlockChildren(dataSource.block.children);
    const queue = isMobile ? 'bottom' : 'left';
    const imgAnim = isMobile ? {
      y: 30, opacity: 0, delay: 600, type: 'from', ease: 'easeOutQuad',
    }
      : {
        x: 30, opacity: 0, type: 'from', ease: 'easeOutQuad',
      };
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack
          {...dataSource.OverPack}
          component={Row}
          /* replace-start */
          data-edit={['OverPack', 'Row']}
        /* replace-end */
        >
          <QueueAnim
            key="text"
            type={queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.textWrapper}
            component={Col}
            /* replace-start */
            data-edit="Col"
          /* replace-end */
          >
            <div
              key="title"
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
            </div>
            <QueueAnim
              component="ul"
              key="ul"
              type={queue}
              ease="easeOutQuad"
              {...dataSource.block}
            >
              {ulChildren}
            </QueueAnim>
          </QueueAnim>
          <TweenOne
            key="img"
            animation={imgAnim}
            resetStyle
            {...dataSource.img}
            component={Col}
            /* replace-start */
            data-edit={['Col', 'image']}
          /* replace-end */
          >
            <img src={dataSource.img.children} width="100%" alt="img" />
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}


export default Content7;
