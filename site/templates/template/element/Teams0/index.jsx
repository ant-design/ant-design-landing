import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
import 'rc-banner-anim/assets/index.css';
/* replace-start */
import './index.less';
/* replace-end */

class Teams extends React.PureComponent {
  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps, $self, current: prevCurrent }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      const childLen = props.dataSource.BannerAnim.children.length;
      if (func) {
        const current = func.currentPage > childLen ? childLen : func.currentPage;
        if ($self.banner) {
          $self.banner.slickGoTo(current - 1);
        }
        nextState.current = current;
      } else if (prevCurrent > childLen && $self.banner) {
        $self.banner.slickGoTo(childLen - 1);
        nextState.current = childLen;
      }
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.state = {
      current: props.func ? props.func.currentPage : 1,
      $self: this,// eslint-disable-line
    };
  }

  /* replace-end */
  getChildrenToRender = (children) => {
    return children.map((item, i) => {
      const { titleWrapper, ...elementPros } = item;
      return (
        <Element
          {...elementPros}
          key={i.toString()}
          prefixCls={elementPros.className}
        >
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            key="text"
            {...titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
          /* replace-end */
          >
            {
              titleWrapper.children.map(getChildrenToRender)
            }
          </QueueAnim>
        </Element>
      );
    });
  }

  render() {
    const { ...tagProps } = this.props;
    const { dataSource, isMobile } = tagProps;
    delete tagProps.dataSource;
    delete tagProps.isMobile;
    return (
      <div
        {...tagProps}
        {...dataSource.wrapper}
        /* replace-start */
        data-comp={[`banner-switch={ "current": ${
          this.state.current}, "total": ${dataSource.BannerAnim.children.length
        } ,"childRoute": ["BannerAnim"] }`]}
      /* replace-end */
      >
        <OverPack
          {...dataSource.OverPack}
          /* replace-start */
          data-edit="Row,OverPack"
        /* replace-end */
        >
          <TweenOne
            key="wrapper"
            animation={
              isMobile ? {
                scaleY: '+=0.3',
                opacity: 0,
                type: 'from',
                ease: 'easeOutQuad',
              } : {
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeOutQuad',
              }
            }
            resetStyle
            component=""
          >
            <BannerAnim
              type="across"
              arrow={false}
              dragPlay={!!isMobile}
              {...dataSource.BannerAnim}
              /* replace-start */
              data-edit=""
              ref={(c) => {
                this.banner = c;
              }}
              initShow={this.state.current - 1}
            /* replace-end */
            >
              {this.getChildrenToRender(dataSource.BannerAnim.children)}
            </BannerAnim>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

/* replace-start-value = export default Teams */
export default polyfill(Teams);
/* replace-end-value */
