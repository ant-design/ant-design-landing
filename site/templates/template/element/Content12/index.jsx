import React from 'react';
import { Row, Col } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Content12 extends React.PureComponent {
  getChildrenToRender = (data) => data.map((item) => {
    return (
      <Col
        key={item.name}
        {...item}
        /* replace-start */
        data-edit="Col"
        /* replace-end */
      >
        <div {...item.children.wrapper}>
          <span {...item.children.img}>
            <img src={item.children.img.children} alt="img" />
          </span>
        </div>
      </Col>
    );
  });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(dataSource.block.children);
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
              dataSource.titleWrapper.children.map(getChildrenToRender)
            }
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{ y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad' }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeOutQuad' }}
              {...dataSource.block}
              /* replace-start */
              data-edit="Row"
            /* replace-end */
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content12;
