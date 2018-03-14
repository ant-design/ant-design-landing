import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  static defaultProps = {
    className: 'banner1',
  };
  /* edit-replace start */
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
  /* edit-replace end */

  render() {
    const { ...props } = this.props;
    /* edit-dataSource start */
    const dataId = props['data-id'];
    const dataSource = props.dataSource;
    delete props.dataSource;
    /* edit-dataSource end */
    delete props.isMode;
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
          /* edit-elem start */
          {...elem}
          data-id={`${dataId}-bannerAnim&children&${i}&elem`}
          prefixCls={elem.className}
          data-edit="BannerElement"
          /* edit-elem end */
        >
          <BgElement
            key="bg"
            /* edit-bg start */
            {...bg}
            data-id={`${dataId}-bannerAnim&children&${i}&bg`}
            /* edit-bg end */
          />
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            key="text"
            /* edit-wrapper start */
            {...textWrapper}
            data-id={`${dataId}-bannerAnim&children&${i}&textWrapper`}
          /* edit-wrapper end */
          >
            <div
              key="logo"
              /* edit-title start */
              {...title}
              data-id={`${dataId}-bannerAnim&children&${i}&title`}
              data-edit="text,image"
            /* edit-title end */
            >
              {
                /* edit-replace start */
                title.children.match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                  <img src={title.children} width="100%" alt="img" />
                ) :
                  /* eidt-replace end */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
              }
            </div>
            <p
              key="content"
              /* edit-content start */
              data-id={`${dataId}-bannerAnim&children&${i}&content`}
              {...content}
              data-edit="text"
            /* edit-content end */
            >
              {
                React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
              }
            </p>
            <Button
              type="ghost"
              key="button"
              /* edit-button start */
              data-id={`${dataId}-bannerAnim&children&${i}&button`}
              {...button}
              data-edit="text"
            /* edit-button end */
            >
              {
                React.createElement('span', { dangerouslySetInnerHTML: { __html: button.children } })
              }
            </Button>
          </QueueAnim>
        </Element>);
    });
    return (
      <OverPack
        {...props}
        /* edit-OverPack start */
        {...dataSource.wrapper}
        data-id={`${dataId}-wrapper`}
        data-comp={[`banner-switch={ "current": ${
          this.state.current}, "total": ${dataSource.bannerAnim.children.length} }`]}
        data-edit={['OverPack']}
      /* edit-OverPack end */
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
              /* edit-replace start */
              {...dataSource.bannerAnim.props}
              ref={(c) => {
                this.banner = c;
              }}
              data-id={`${dataId}-bannerAnim`}
              data-edit={['BannerAnim']}
              /* edit-replace end */
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
