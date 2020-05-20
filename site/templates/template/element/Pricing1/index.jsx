import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col, Button } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Pricing1 extends React.PureComponent {
  getChildrenToRender = (item) => {
    const {
      wrapper,
      topWrapper,
      name,
      buttonWrapper,
      line,
      content,
      money,
    } = item.children;
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
            <div {...name} key="name">
              {
                /* replace-start-value = name.children */
                React.createElement('span', {
                  dangerouslySetInnerHTML: { __html: name.children },
                })
                /* replace-end-value */
              }
            </div>
            <h1 {...money} key="money">
              {
                /* replace-start-value = money.children */
                React.createElement('span', {
                  dangerouslySetInnerHTML: { __html: money.children },
                })
                /* replace-end-value */
              }
            </h1>
          </div>
          <div {...content} key="content">
            {
              /* replace-start-value = content.children */
              React.createElement('span', {
                dangerouslySetInnerHTML: { __html: content.children },
              })
              /* replace-end-value */
            }
          </div>
          <i {...line} key="line" />
          <div {...buttonWrapper} key="button">
            <Button
              {...buttonWrapper.children.a}
              /* replace-start */
              data-edit="link,text"
              /* replace-end */
            >
              {
                /* replace-start-value = buttonWrapper.children.a.children */
                React.createElement('span', {
                  dangerouslySetInnerHTML: { __html: buttonWrapper.children.a.children },
                })
                /* replace-end-value */
              }
            </Button>
          </div>
        </QueueAnim>
      </Col>
    );
  };

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { block } = dataSource;
    const childrenToRender = block.children.map(this.getChildrenToRender);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div
            key="title"
            {...dataSource.titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
            /* replace-end */
          >
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
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

export default Pricing1;
