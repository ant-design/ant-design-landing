import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Content11 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack
        {...props}
        {...dataSource.OverPack}
      >
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
          /* replace-start */
          data-edit="titleWrapper"
        /* replace-end */
        >
          {
            dataSource.titleWrapper.children.map(getChildrenToRender)
          }
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <Button
            {...dataSource.button.children.a}
            /* replace-start */
            data-edit="link,text"
          /* replace-end */
          >

            {
              /* replace-start-value = dataSource.button.children.a.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.button.children.a.children } })
              /* replace-end-value */
            }
          </Button>
        </TweenOne>
      </OverPack>
    );
  }
}

export default Content11;
