import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

function Feature7(props) {
  const { dataSource, isMobile, ...tagProps } = props;
  const { blockWrapper, titleWrapper } = dataSource;
  const childrenToRender = blockWrapper.children.map((item, i) => (
    <Col
      {...item}
      key={i.toString()}
      /* replace-start */
      data-edit="Col"
    /* replace-end */
    >
      <a
        {...item.children}
        /* replace-start */
        data-edit="linkA"
      /* replace-end */
      >
        {item.children.children.map(getChildrenToRender)}
      </a>
    </Col>
  ));
  return (
    <div
      {...tagProps}
      {...dataSource.wrapper}
    >
      <div {...dataSource.page}>
        <div
          {...dataSource.titleWrapper}
          /* replace-start */
          data-edit="titleWrapper"
        /* replace-end */
        >
          {titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim
            key="queue"
            type="bottom"
            leaveReverse
            interval={50}
            component={Row}
            {...blockWrapper}
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

export default Feature7;
