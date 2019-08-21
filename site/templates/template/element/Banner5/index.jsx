import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */
class Banner5 extends React.PureComponent {
  render() {
    const { ...tagProps } = this.props;
    const { dataSource } = tagProps;
    delete tagProps.dataSource;
    delete tagProps.isMobile;
    const animType = {
      queue: 'bottom',
      one: {
        y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
      },
    };
    return (
      <div
        {...tagProps}
        {...dataSource.wrapper}
      >
        <div
          {...dataSource.page}
        >
          <QueueAnim
            key="text"
            type={animType.queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.childWrapper}
            componentProps={{ md: dataSource.childWrapper.md, xs: dataSource.childWrapper.xs }}
            /* replace-start */
            data-edit="childWrapper"
          /* replace-end */
          >
            {
              dataSource.childWrapper.children.map(getChildrenToRender)
            }
          </QueueAnim>
          <TweenOne
            animation={animType.one}
            key="title"
            {...dataSource.image}
          >
            <img src={dataSource.image.children} width="100%" alt="img" />
          </TweenOne>
        </div>
      </div>
    );
  }
}
export default Banner5;
