import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Carousel as AntCarousel, Row, Col } from 'antd';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Feature8 extends React.PureComponent {
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
    const { children } = props.dataSource.Carousel.children;
    const childLen = children.length;
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
    const { Carousel, childWrapper: buttonWrapper } = dataSource;
    const { children: carouselChild, wrapper, ...carouselProps } = Carousel;
    const { titleWrapper, children: childWrapper, ...childrenProps } = carouselChild;

    const { barWrapper, title: titleChild, ...titleWrapperProps } = titleWrapper;
    const titleToRender = [];

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children: childRow, ...rowProps } = item;
      if (childWrapper.length > 1) {
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
      }
      const childrenItem = childRow.map(($item, i) => {
        const { children: colChild, arrow, ...colProps } = $item;
        const { ...childProps } = colChild;
        return (
          <Col
            {...colProps}
            key={i.toString()}
            /* replace-start */
            data-edit="Col"
          /* replace-end */
          >
            <div
              {...childProps}
            >
              {colChild.children.map(getChildrenToRender)}
            </div>
            {arrow && <div {...arrow}><img src={arrow.children} alt="img" /></div>}
          </Col>
        );
      });

      return (
        <div key={ii.toString()}>
          <QueueAnim
            component={Row}
            type="bottom"
            /* replace-start */
            data-edit="Row"
            /* replace-end */
            componentProps={{ type: 'flex' }}
            {...rowProps}
          >
            {childrenItem}
          </QueueAnim>
        </div>
      );
    });

    return (
      <QueueAnim
        key="queue"
        type="bottom"
        ref={this.carouselRef}
        {...childrenProps}
      >
        {childWrapper.length > 1 && (
          <div {...titleWrapperProps} key="title">
            <div {...titleChild}>
              {titleToRender}
            </div>
          </div>
        )}
        <AntCarousel
          key="carousel"
          {...carouselProps}
          infinite={false}
          beforeChange={this.onBeforeChange}
        >
          {childrenToRender}
        </AntCarousel>
        <div
          key="button"
          {...buttonWrapper}
          /* replace-start */
          data-edit="childWrapper"
          /* replace-end */
        >
          {buttonWrapper.children.map(getChildrenToRender)}
        </div>
      </QueueAnim>
    );
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { titleWrapper } = dataSource;
    return (
      <div
        {...props}
        {...dataSource.wrapper}
        /* replace-start */
        data-comp={[`carousel-switch={ "current": ${
          this.state.current + 1}, "total": ${dataSource.Carousel.children.children.length
        } ,"childRoute": ["Carousel","children"] }`]}
      /* replace-end */
      >
        <div {...dataSource.page}>
          <div
            {...dataSource.titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
          /* replace-end */
          >
            {titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            {this.getChildrenToRender(dataSource)}
          </OverPack>
        </div>
      </div>
    );
  }
}
/* replace-start-value = export default Feature8 */
export default polyfill(Feature8);
/* replace-end-value */
