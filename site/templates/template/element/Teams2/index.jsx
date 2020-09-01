import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start-value = import { getChildrenToRender, isImg } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Teams2 extends React.PureComponent {
  getBlockChildren = (data) => data.map((item, i) => {
    const { titleWrapper, image, ...$item } = item;
    return (
      <Col
        key={i.toString()}
        {...$item}
        /* replace-start */
        data-edit="Col, titleWrapper"
      /* replace-end */
      >
        <Row>
          <Col span={7}>
            <div {...image}>
              <img src={image.children} alt="img" />
            </div>
          </Col>
          <Col span={17}>
            <QueueAnim {...titleWrapper} type="bottom">
              {titleWrapper.children.map(getChildrenToRender)}
            </QueueAnim>
          </Col>
        </Row>
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
              dataSource.titleWrapper.children.map(getChildrenToRender)
            }
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="tween" leaveReverse>
              <QueueAnim
                type="bottom"
                key="block"
                {...dataSource.block}
                component={Row}
                /* replace-start */
                data-edit="Row"
              /* replace-end */
              >
                {listChildren}
              </QueueAnim>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Teams2;
