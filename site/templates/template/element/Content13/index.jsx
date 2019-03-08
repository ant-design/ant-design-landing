import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Content13 extends React.PureComponent {
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
      </OverPack>
    );
  }
}

export default Content13;
