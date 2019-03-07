import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
/* replace-start */
import './index.less';
/* replace-end */

class Content14 extends React.PureComponent {
  getChildrenToRender = (item) => {
    const { wrapper, topWrapper, name, buttonWrapper, line, content, money } = item.children;
    return (
      <Col
        key={item.name}
        {...item}
        /* replace-start */
        data-edit="Col"
      /* replace-end */
      >
        <QueueAnim type="bottom" {...wrapper}>
          <div {...topWrapper}>
            <div {...name} key="name" />
            <h1 {...money} key="money">{money.children}</h1>
          </div>
          <div {...content} key="content">
            {
              /* replace-start-value = content.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
              /* replace-end-value */
            }
          </div>
          <i {...line} key="line" />
          <div {...buttonWrapper} key="button">
            <a
              {...buttonWrapper.children.a}
              /* replace-start */
              data-edit="link,text"
            /* replace-end */
            />
          </div>
        </QueueAnim>
      </Col>
    );
  }

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { block } = dataSource;
    const childrenToRender = block.children.map(this.getChildrenToRender);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
        <div {...dataSource.page}>
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
          <OverPack {...dataSource.OverPack}>
            <QueueAnim
              type="bottom"
              component={Row}
              leaveReverse
              ease={['easeOutQuad', 'easeInOutQuad']}
              key="content"
              /* replace-start */
              data-edit="Row"
            /* replace-end */
            >
              {childrenToRender}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content14;
