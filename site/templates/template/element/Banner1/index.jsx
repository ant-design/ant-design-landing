import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
/* replace-start */
import './index.less';
/* replace-end */
const { BgElement } = Element;
class Banner extends React.PureComponent {
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
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = dataSource.BannerAnim.children.map((item, i) => {
      const elem = item.BannerElement;
      const elemClassName = elem.className;
      delete elem.className;
      const { bg, textWrapper, title, content, button } = item;
      return (
        <Element
          key={i.toString()}
          {...elem}
          prefixCls={elemClassName}
        >
          <BgElement
            key="bg"
            {...bg}
          />
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            key="text"
            {...textWrapper}
          >
            <div
              key="logo"
              {...title}
              /* replace-start */
              data-edit="text,image"
            /* replace-end */
            >
              {
                typeof title.children === 'string' && title.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
                  <img src={title.children} width="100%" alt="img" />
                ) : /* replace-start-value = title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
                /* replace-end-value */
              }
            </div>
            <div
              key="content"
              {...content}
            >
              {
                /* replace-start-value = content.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: content.children } })
                /* replace-end-value */
              }
            </div>
            <Button
              ghost
              key="button"
              {...button}
            >
              {
                /* replace-start-value = button.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: button.children } })
                /* replace-end-value */
              }
            </Button>
          </QueueAnim>
        </Element>
      );
    });
    return (
      <div
        {...props}
        {...dataSource.wrapper}
        /* replace-start */
        data-comp={[`banner-switch={ "current": ${
          this.state.current}, "total": ${dataSource.BannerAnim.children.length
        } ,"childRoute": ["BannerAnim"] }`]}
      /* replace-end */
      >
        <TweenOneGroup
          key="bannerGroup"
          enter={{ opacity: 0, type: 'from' }}
          leave={{ opacity: 0 }}
          component=""
        >
          <div className="banner1-wrapper" key="wrapper">
            <BannerAnim
              key="BannerAnim"
              {...dataSource.BannerAnim}
              /* replace-start */
              ref={(c) => {
                this.banner = c;
              }}
              initShow={this.state.current - 1}
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
          className="banner1-icon"
          style={{ bottom: 40 }}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}

export default Banner;
