import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */

class Content extends React.PureComponent {
  getBlockChildren = data => data.map((item, i) => {
    const children = item.children;
    return (
      <Col
        key={i.toString()}
        {...item}
        /* replace-start */
        data-edit="Col"
      /* replace-end */
      >
        <div {...children.icon}>
          <img src={children.icon.children} width="100%" alt="img" />
        </div>
        <h3 {...children.title}>
          {
            /* replace-start-value = children.title.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: children.title.children } })
            /* replace-end-value */
          }
        </h3>
        <p {...children.content}>
          {
            /* replace-start-value = children.content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: children.content.children } })
            /* replace-end-value */
          }
        </p>
      </Col>
    );
  });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const listChildren = this.getBlockChildren(dataSource.block.children);
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
                    ? React.createElement('img', { src: item.children, height: '100%', alt: 'img' })
                    : /* replace-start-value = title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } })
                  /* replace-end-value */
                ))
              ))
            }
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim
              type="bottom"
              key="block"
              leaveReverse
              {...dataSource.block}
              component={Row}
              /* replace-start */
              data-edit="Row"
            /* replace-end */
            >
              {listChildren}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}


export default Content;
