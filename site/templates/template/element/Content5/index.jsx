import React from 'react';
import { Row, Col } from 'antd';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */

class Content5 extends React.PureComponent {
  getChildrenToRender = data =>
    data.map((item) => {
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
              <img src={item.children.img.children} height="100%" alt="img" />
            </span>
            <p {...item.children.content}>
              {
                /* replace-start-value = item.children.content.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children.content.children } })
                /* replace-end-value */
              }
            </p>
          </div>
        </Col>);
    });

  getEnterAnim = (e, isMode) => {
    const index = e.index;
    const delay = isMode ? (index * 50) + 200 : ((index % 4) * 100) + (Math.floor(index / 4) * 100) + 300;
    return {
      y: '+=30', opacity: 0, type: 'from', delay,
    };
  };

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(dataSource.block.children);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
        <div {...dataSource.page}>
          <TweenOne
            animation={{
              y: '+=30', opacity: 0, type: 'from', ease: 'easeOutQuad',
            }}
            component="h1"
            key="h1"
            reverseDelay={300}
            {...dataSource.title}
          >
            {
              /* replace-start-value = dataSource.title.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.title.children } })
              /* replace-end-value */
            }
          </TweenOne>
          <TweenOne
            animation={{
              y: '+=30', opacity: 0, type: 'from', delay: 200, ease: 'easeOutQuad',
            }}
            component="p"
            key="p"
            reverseDelay={200}
            {...dataSource.titleContent}
          >
            {
              /* replace-start-value = dataSource.titleContent.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.titleContent.children } })
              /* replace-end-value */
            }
          </TweenOne>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={e => this.getEnterAnim(e, isMobile)}
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


export default Content5;
