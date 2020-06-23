import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Carousel as AntCarousel, Row, Col } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

/* replace-start */
import { polyfill } from 'react-lifecycles-compat';
import './index.less';
/* replace-end */

TweenOne.plugins.push(Children);

class Feature6 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      /* replace-start-value = current: 0, */
      current: props.func ? props.func.currentPage : 0,
      _self: this,
      /* replace-end-value */
    };
  }

  /* replace-start */
  static getDerivedStateFromProps(props, { prevProps, _self, current: prevCurrent }) {
    const { func } = props;
    const childLen = props.dataSource.Carousel.children.length;
    const nextState = {
      prevProps: props,
    };
    if (prevProps) {
      const { carousel } = _self.carouselRef.current ? _self.carouselRef.current.childRefs : {};
      if (func) {
        const current = func.currentPage > childLen ? childLen : func.currentPage;
        if (_self.carouselRef.current) {
          carousel.goTo(current - 1);
        }
        nextState.current = current - 1;
      } else if (prevCurrent - 1 > childLen && _self.carouselRef.current) {
        carousel.goTo(childLen);
        nextState.current = childLen;
      }
    }
    return nextState;
  }
  /* replace-end */

  onTitleClick = (_, i) => {
    const carouselRef = this.carouselRef.current.childRefs.carousel;
    carouselRef.goTo(i);
  }

  onBeforeChange = (_, newIndex) => {
    this.setState({
      current: newIndex,
    });
  }

  getChildrenToRender = (dataSource) => {
    const { current } = this.state;
    const { Carousel } = dataSource;
    const { titleWrapper, children: childWrapper, wrapper, ...carouselProps } = Carousel;

    const { barWrapper, title: titleChild, ...titleWrapperProps } = titleWrapper;
    const titleToRender = [];

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children, ...itemProps } = item;
      titleToRender.push((
        <div
          {...title}
          key={ii.toString()}
          onClick={(e) => {
            this.onTitleClick(e, ii);
          }}
          className={ii === current ? `${title.className || ''} active` : title.className}
        >
          {
            /* replace-start-value = title.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: title.children } })
            /* replace-end-value */
          }
        </div>
      ));
      const childrenItem = children.map(($item, i) => {
        const { number, children: child, ...childProps } = $item;
        const numberChild = number.children.replace(/[^0-9.-]/g, '');
        const { unit, toText, ...numberProps } = number;
        return (
          <Col
            {...childProps}
            /* replace-start */
            data-edit="Col"
            /* replace-end */
            key={i.toString()}
          >
            <TweenOne
              {...numberProps}
              animation={{
                Children: {
                  value: parseFloat(numberChild),
                  floatLength: parseFloat(numberChild) - Math.floor(parseFloat(numberChild)) > 0 ? 2 : 0,
                  formatMoney: true,
                },
                duration: 1000,
                delay: 300,
                ease: 'easeInOutCirc',
              }}
              component="span"
            >
              0
            </TweenOne>
            {unit && (
              <span {...unit}>
                {
                  /* replace-start-value = unit.children */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: unit.children } })
                  /* replace-end-value */
                }
              </span>
            )}
            <p {...child}>
              {
                /* replace-start-value = child.children */
                React.createElement('span', { dangerouslySetInnerHTML: { __html: child.children } })
                /* replace-end-value */
              }
            </p>
          </Col>
        );
      });
      return (
        <div key={ii.toString()}>
          <QueueAnim
            type="bottom"
            component={Row}
            {...itemProps}
            /* replace-start */
            data-edit="Row"
            /* replace-end */
          >
            {childrenItem}
          </QueueAnim>
        </div>
      );
    });

    const width = 100 / childrenToRender.length;
    return (
      <QueueAnim
        key="queue"
        leaveReverse
        type="bottom"
        delay={[0, 100]}
        {...wrapper}
        ref={this.carouselRef}
      >
        <div {...titleWrapperProps} key="title">
          <div {...titleChild}>
            {titleToRender}
            <div
              {...barWrapper}
              style={{
                width: `${width}%`,
                left: `${width * current}%`,
              }}
            >
              <em {...barWrapper.children} />
            </div>
          </div>
        </div>
        <AntCarousel
          {...carouselProps}
          key="carousel"
          infinite={false}
          beforeChange={this.onBeforeChange}
        >
          {childrenToRender}
        </AntCarousel>
      </QueueAnim>
    );
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    return (
      <div
        {...props}
        {...dataSource.wrapper}
        /* replace-start */
        data-comp={[`carousel-switch={ "current": ${
          this.state.current + 1}, "total": ${dataSource.Carousel.children.length
        } ,"childRoute": ["Carousel"] }`]}
      /* replace-end */
      >
        <div
          /* replace-start */
          data-edit="Carousel" // ant carousel 不带入 props, 模拟个 dom 编辑 carousel
          data-id={dataSource.Carousel['data-id']}
        /* replace-end */
        >
          <OverPack {...dataSource.OverPack}>
            {this.getChildrenToRender(dataSource)}
          </OverPack>
        </div>
      </div>
    );
  }
}
/* replace-start-value = export default Feature6 */
export default polyfill(Feature6);
/* replace-end-value */
