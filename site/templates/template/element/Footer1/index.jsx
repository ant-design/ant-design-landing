import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
/* replace-start */
import './index.less';
/* replace-end */

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer1',
  };

  getLiChildren = data => data.map((item, i) => {
    return (
      <Col
        key={i.toString()}
        {...item}
        title={null}
        content={null}
      >
        <h2 {...item.title}>
          {
            typeof item.title.children === 'string' && item.title.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
              <img src={item.title.children} width="100%" alt="img" />
            ) : /* replace-start-value = item.title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: item.title.children } })
            /* replace-end-value */
          }
        </h2>
        <div {...item.content}>
          {
            /* replace-start-value = item.content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: item.content.children } })
            /* replace-end-value */
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
