import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
/* replace-start */
import './index.less';
/* replace-end */

class Content9 extends React.PureComponent {
  getDelay = (e, b) => ((e % b) * 100) + (Math.floor(e / b) * 100) + (b * 100);

  getBlockChildren = (item, i) => {
    const children = item.children;
    const delay = this.props.isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
    const liAnim = {
      y: 30, opacity: 0, type: 'from', ease: 'easeOutQuad', delay,
    };
    return (
      <TweenOne
        component={Col}
        animation={liAnim}
        key={i.toString()}
        {...item}
        /* replace-start */
        data-edit="Col"
      /* replace-end */
      >
        <div {...children}>
          <div className="image-wrapper" {...children.img}>
            <img src={children.img.children} alt="img" />
          </div>
          <h2 {...children.title}>
            {
              /* replace-start-value = children.title.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: children.title.children } })
              /* replace-end-value */
            }
          </h2>
          <p {...children.content}>
            {
              /* replace-start-value = children.title.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: children.content.children } })
              /* replace-end-value */
            }
          </p>
        </div>
      </TweenOne>
    );
  }

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    // const children = [];
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
        <div {...dataSource.page}>
          <div
            {...dataSource.titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
          /* replace-end */
          >
            {
              dataSource.titleWrapper.children.map((item, i) => (
                React.createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div', { key: i.toString(), ...item }, (
                  item.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                    ? React.createElement('img', { src: item.children, alt: 'img' })
                    : /* replace-start-value = title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                  /* replace-end-value */
                ))
              ))
            }
          </div>
          <OverPack
            {...dataSource.OverPack}
          >
            <QueueAnim
              type="bottom"
              key="img"
            >
              <Row
                {...dataSource.block}
                key="img"
                /* replace-start */
                data-edit="Row"
              /* replace-end */
              >
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}


export default Content9;
