import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col, Button } from 'antd';
/* replace-start */
import './index.less';
/* replace-end */
const getChildrenToRender = (item, i) => {
  const tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  let children = typeof item.children === 'string' && item.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : /* replace-start-value = item.children; */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } });
  /* replace-end-value */
  children = typeof item.children === 'object' && item.name.indexOf('button') === 0 ? (
    React.createElement(Button, {
      ...item.children,
      /* replace-start */
      'data-edit': 'link,text',
      /* replace-end */
    })
  ) : children;
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};
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
          {...dataSource.textWrapper}
          component={Col}
          componentProps={{ md: dataSource.textWrapper.md, xs: dataSource.textWrapper.xs }}
          /* replace-start */
          data-edit="Col"
        /* replace-end */
        >
          {
            dataSource.textWrapper.children.map(getChildrenToRender)
          }
        </QueueAnim>
      </OverPack>
    </div>
  );
}

export default Pricing0;
