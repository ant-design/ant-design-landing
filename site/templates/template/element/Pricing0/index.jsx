import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

function Pricing0(props) {
  const { ...tagProps } = props;
  const { dataSource, isMobile } = tagProps;
  delete tagProps.dataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile ? {
      scaleY: '+=0.3', opacity: 0, type: 'from', ease: 'easeOutQuad',
    }
      : {
        x: '-=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
      },
  };
  return (
    <div
      {...tagProps}
      {...dataSource.wrapper}
    >
      <OverPack
        component={Row}
        {...dataSource.OverPack}
        /* replace-start */
        data-edit="Row,OverPack"
      /* replace-end */
      >
        <TweenOne
          key="img"
          animation={animType.one}
          resetStyle
          {...dataSource.imgWrapper}
          component={Col}
          componentProps={{ md: dataSource.imgWrapper.md, xs: dataSource.imgWrapper.xs }}
          /* replace-start */
          data-edit="Col"
        /* replace-end */
        >
          <span
            {...dataSource.img}
          >
            <img src={dataSource.img.children} width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.childWrapper}
          component={Col}
          componentProps={{ md: dataSource.childWrapper.md, xs: dataSource.childWrapper.xs }}
          /* replace-start */
          data-edit="Col,childWrapper"
        /* replace-end */
        >
          {
            dataSource.childWrapper.children.map(getChildrenToRender)
          }
        </QueueAnim>
      </OverPack>
    </div>
  );
}

export default Pricing0;
