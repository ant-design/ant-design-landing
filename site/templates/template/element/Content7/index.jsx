import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Tabs, Row, Col } from 'antd';
import { Icon } from '@ant-design/compatible';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */
const TabPane = Tabs.TabPane;

class Content7 extends React.Component {
  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps, current: prevCurrent }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      const childLen = props.dataSource.block.children.length;
      if (func) {
        const current = func.currentPage > childLen ? childLen : func.currentPage;
        nextState.current = current;
      } else if (prevCurrent > childLen) {
        nextState.current = childLen;
      }
    }
    return nextState;
  }
  /* replace-end */

  constructor(props) {
    super(props);
    this.state = {
      /* replace-start-value = current: 1 */
      current: props.func ? props.func.currentPage : 1,
      /* replace-end-value */
    };
  }

  onChange = (key) => {
    this.setState({ current: parseFloat(key) });
  }

  getBlockChildren = (item, i) => {
    const { tag, content } = item;
    const { text, img } = content;
    const textChildren = text.children;
    const { icon } = tag;
    const iconChildren = icon.children;
    const tagText = tag.text;
    return (
      <TabPane
        key={i + 1}
        tab={(
          <div
            className={tag.className}
            /* replace-start */
            {...tag}
          /* replace-end */
          >
            <Icon
              type={iconChildren}
              className={icon.className}
              /* replace-start */
              {...icon}
              data-edit="icon"
              children=""// eslint-disable-line
            /* replace-end */
            />
            <div
              {...tagText}
            >
              {
                /* replace-start-value = tagText.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: tagText.children } })
                /* replace-end-value */
              }
            </div>
          </div>
        )}
        className={item.className}
        /* replace-start */
        {...item}
      /* replace-end */
      >
        <TweenOne.TweenOneGroup
          enter={{
            y: 30, delay: 300, opacity: 0, type: 'from', ease: 'easeOutQuad',
          }}
          leave={null}
          component=""
        >
          {this.state.current === i + 1 && (
            <Row
              key="content"
              className={content.className}
              gutter={content.gutter}
              /* replace-start */
              {...content}
              data-edit="Row"
            /* replace-end */
            >
              <Col
                className={text.className}
                xs={text.xs}
                md={text.md}
                /* replace-start */
                {...text}
                data-edit={['Col', 'text']}
              /* replace-end */
              >
                {
                  /* replace-start-value = textChildren */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: textChildren } })
                  /* replace-end-value */
                }
              </Col>
              <Col
                className={img.className}
                xs={img.xs}
                md={img.md}
                /* replace-start */
                {...img}
                data-edit={['Col', 'image']}
              /* replace-end */
              >
                <img src={img.children} width="100%" alt="img" />
              </Col>
            </Row>
          )}
        </TweenOne.TweenOneGroup>
      </TabPane>
    );
  };

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const tabsChildren = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
        /* replace-start */
        data-comp={[`tabs-switch={ "current": ${
          this.state.current}, "total": ${dataSource.block.children.length
        } ,"childRoute": ["block"] }`]}
      /* replace-end */
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

          <OverPack
            {...dataSource.OverPack}
          >
            <TweenOne.TweenOneGroup
              key="tabs"
              enter={{
                y: 30, opacity: 0, delay: 200, type: 'from',
              }}
              leave={{ y: 30, opacity: 0 }}
              {...dataSource.tabsWrapper}
            >
              <Tabs
                key="tabs"
                onChange={this.onChange}
                activeKey={`${this.state.current}`}
                {...dataSource.block}
              >
                {tabsChildren}
              </Tabs>
            </TweenOne.TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

/* replace-start-value = export default Content7 */
export default polyfill(Content7);
/* replace-end-value */
