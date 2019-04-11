import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
import 'rc-banner-anim/assets/index.css';
/* replace-start */
import './index.less';
/* replace-end */

class Teams extends React.PureComponent {
  /* replace-start */
  constructor(props) {
    super(props);
    this.state = {
      current: props.func ? props.func.currentPage : 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { func } = nextProps;
    const childLen = nextProps.dataSource.BannerAnim.children.length;
    if (func) {
      const current = func.currentPage > childLen ? childLen : func.currentPage;

      if (this.banner) {
        this.banner.slickGoTo(current - 1);
      }
      this.setState({
        current,
      });
    } else if (this.state.current > childLen && this.banner) {
      this.banner.slickGoTo(childLen - 1);
      this.setState({
        current: childLen,
      });
    }
  }

  /* replace-end */
  getChildrenToRender = (children) => {
    return children.map((item, i) => {
      const { titleWrapper, ...elementPros } = item;
      console.log(elementPros);
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

export default Teams;
