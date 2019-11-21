import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start-value = import { isImg } from './utils'; */
import { isImg } from '../../../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1',
  };

  getLiChildren = (data) => data.map((item, i) => {
    const { title, childWrapper, ...itemProps } = item;
    return (
      <Col
        key={i.toString()}
        {...itemProps}
        title={null}
        content={null}
        /* replace-start */
        data-edit="Col"
      /* replace-end */
      >
        <h2
          {...title}
          /* replace-start */
          data-edit="image,text"
          /* replace-end */
        >
          {
            typeof title.children === 'string' && title.children.match(isImg) ? (
              <img src={title.children} width="100%" alt="img" />
            ) : /* replace-start-value = title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
            /* replace-end-value */
          }
        </h2>
        <div {...childWrapper}>
          {
            childWrapper.children.map(getChildrenToRender)
          }
        </div>
      </Col>
    );
  });

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getLiChildren(dataSource.block.children);
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack
          {...dataSource.OverPack}
        >
          <QueueAnim
            type="bottom"
            key="ul"
            leaveReverse
            component={Row}
            {...dataSource.block}
            /* replace-start */
            data-edit="Row"
          /* replace-end */
          >
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyrightWrapper}
          >
            <div {...dataSource.copyrightPage}>
              <div {...dataSource.copyright}>
                {
                  /* replace-start-value = dataSource.copyright.children */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.copyright.children } })
                  /* replace-end-value */
                }
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
