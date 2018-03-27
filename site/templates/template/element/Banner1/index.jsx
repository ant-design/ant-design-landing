import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */
const BgElement = Element.BgElement;
class Banner extends React.Component {
  static defaultProps = {
    className: 'banner1',
  };
  /* replace-start */
  state = {
    current: 1,
  }
  componentWillReceiveProps(nextProps) {
    const { func } = nextProps;
    if (func) {
      if (this.banner) {
        this.banner.slickGoTo(func.currentPage - 1);
      }
      this.setState({
        current: func.currentPage,
      });
    }
  }
  /* replace-end */
  render() {
    const { ...props } = this.props;/* replace-start */
    const dataId = props['data-id'];
    /* replace-end */
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.bannerAnim.children.map((item, i) => {
      const elem = item.elem;
      const bg = item.bg;
      const textWrapper = item.textWrapper;
      const title = item.title;
      const content = item.content;
      const button = item.button;
      return (
        <Element
          key={i.toString()}
          {...elem}
          /* replace-start */
          data-id={`${dataId}-bannerAnim&children&${i}&elem`}
          prefixCls={elem.className}
          data-edit="BannerElement"
          /* replace-end */
        >
          <BgElement
            key="bg"
            {...bg}
            /* replace-start */
            data-id={`${dataId}-bannerAnim&children&${i}&bg`}
            /* replace-end */
          />
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            key="text"
            {...textWrapper}
            /* replace-start */
            data-id={`${dataId}-bannerAnim&children&${i}&textWrapper`}
          /* replace-end */
          >
            <div
              key="logo"
              {...title}
              /* replace-start */
              data-id={`${dataId}-bannerAnim&children&${i}&title`}
              data-edit="text,image"
            /* replace-end */
            >
              {
                /* replace-start */
                title.children.match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                  <img src={title.children} width="100%" alt="img" />
                ) :
                  /* replace-end */
                  /* replace-start-value = title.children */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
                  /* replace-end-value */
              }
            </div>
            <div
              key="content"
              {...content}
              /* replace-start */
              data-id={`${dataId}-bannerAnim&children&${i}&content`}
              data-edit="text"
            /* replace-end */
            >
              {
                /* replace-start-value = content.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
                /* replace-end-value */
              }
            </div>
            <Button
              type="ghost"
              key="button"
              {...button}
              /* replace-start */
              data-id={`${dataId}-bannerAnim&children&${i}&button`}
              data-edit="text"
            /* replace-end */
            >
              {
                /* replace-start-value = button.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: button.children } })
                /* replace-end-value */
              }
            </Button>
          </QueueAnim>
        </Element>);
    });
    return (
      <OverPack
        {...props}
        {...dataSource.wrapper}
        /* replace-start */
        data-id={`${dataId}-wrapper`}
        data-comp={[`banner-switch={ "current": ${
          this.state.current}, "total": ${dataSource.bannerAnim.children.length} }`]}
        data-edit={['OverPack']}
      /* replace-end */
      >
        <TweenOneGroup
          key="bannerGroup"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <div className={`${props.className}-wrapper`} key="wrapper">
            <BannerAnim
              key="banner"
              {...dataSource.bannerAnim.props}
              /* replace-start */
              ref={(c) => {
                this.banner = c;
              }}
              data-id={`${dataId}-bannerAnim`}
              data-edit={['BannerAnim']}
              /* replace-end */
            >
              {childrenToRender}
            </BannerAnim>
          </div>
        </TweenOneGroup>
        <TweenOne
          animation={{
            y: '-=20', yoyo: true, repeat: -1, duration: 1000,
          }}
          className={`${props.className}-icon`}
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

export default Banner;
