import React from 'react';
import { Button } from 'antd';
import {
  DownOutlined,
} from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
/* replace-start-value = import { isImg } from './utils'; */
import { polyfill } from 'react-lifecycles-compat';
import { isImg } from '../../../../utils';
/* replace-end-value */
import 'rc-banner-anim/assets/index.css';
/* replace-start */
import './index.less';
/* replace-end */
const { BgElement } = Element;
class Banner extends React.PureComponent {
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
                typeof title.children === 'string' && title.children.match(isImg) ? (
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
              /* replace-start */
              data-edit="link,text"
              /* replace-end */
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
          <DownOutlined />
        </TweenOne>
      </div>
    );
  }
}

/* replace-start-value = export default Banner */
export default polyfill(Banner);
/* replace-end-value */
