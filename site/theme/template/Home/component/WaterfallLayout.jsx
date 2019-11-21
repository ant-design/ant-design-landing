import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import AutoResponsive from 'autoresponsive-react';
import { GridSort } from 'autoresponsive-core';

const noop = function () { };

export default class WaterfallLayout extends AutoResponsive {
  static defaultProps = {
    className: 'rc-autoresponsive',
    gridWidth: 10,
    itemMargin: 0,
    horizontalDirection: 'left',
    verticalDirection: 'top',
    onItemDidLayout: noop,
    onContainerDidLayout: noop,
    queueAnimProps: {
    },
  };

  defaultAnim = { scale: [1, 0.8], opacity: [1, 0] }

  inQueueEnd = {};

  inAnimate = {}

  currentChildKeys = {};

  state = {
    oneEnter: false,
  }

  componentWillMount() {
    this.sortManager = new GridSort({
      containerWidth: 600,
      gridWidth: this.props.gridWidth,
    });
  }

  componentDidMount() {
    this.updateContainerWidth();
    window.addEventListener('resize', this.updateContainerWidth);
    this.oneEnterEnd();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContainerWidth);
  }

  updateContainerWidth = () => {
    const dw = this.dom.clientWidth > 1200 ? 1200 : this.dom.clientWidth;
    const containerWidth = dw + this.props.itemMargin;
    if (this.containerWidth !== containerWidth) {
      this.containerWidth = containerWidth;
      this.sortManager.changeProps({
        containerWidth,
      });
      this.setState({});
    }
  }

  oneEnterEnd = () => {
    this.setState({
      oneEnter: true,
    });
  }

  renderChildren = () => {
    const {
      children,
      itemMargin,
      onItemDidLayout,
      onContainerDidLayout,
    } = this.props;
    const childrenToRender = [];
    React.Children.forEach(children, (child, childIndex) => {
      if (!child) {
        return;
      }
      const childWidth = parseInt(child.props.style.width, 10) + itemMargin;
      const childHeight = parseInt(child.props.style.height, 10) + itemMargin;

      const calculatedPosition = this.sortManager.getPosition(childWidth, childHeight);

      if (!this.fixedContainerHeight) {
        if (calculatedPosition[1] + childHeight > this.containerStyle.height) {
          this.containerStyle.height = calculatedPosition[1] + childHeight;
        }
      }
      onItemDidLayout(child);
      if (childIndex + 1 === children.length) {
        onContainerDidLayout();
      }
      const style = {
        position: 'absolute',
        ...child.props.style,
      };
      const animation = {};
      if (!this.inQueueEnd[child.key]) {
        style.transform = `translate(${calculatedPosition[0]}px,${calculatedPosition[1]}px)`;
        this.currentChildKeys[child.key] = calculatedPosition;
      } else {
        animation.x = calculatedPosition[0];
        animation.y = calculatedPosition[1];
        animation.onComplete = () => {
          this.currentChildKeys[child.key] = calculatedPosition;
        };
        style.transform = `translate(${this.currentChildKeys[child.key][0]}px,${
          this.currentChildKeys[child.key][1]}px)`;
      }
      childrenToRender.push(React.createElement(TweenOne, {
        key: child.key,
        ...child.props,
        style,
        animation,
      }));
    });
    return childrenToRender;
  }

  render() {
    const { ...props } = this.props;
    const { queueAnimProps } = props;
    this.setPrivateProps();
    [
      'gridWidth',
      'itemMargin',
      'horizontalDirection',
      'verticalDirection',
      'onItemDidLayout',
      'onContainerDidLayout',
      'queueAnimProps',
    ].forEach((key) => delete props[key]);
    const children = this.renderChildren();
    delete queueAnimProps.type;
    return (
      <QueueAnim
        {...props}
        {...queueAnimProps}
        animConfig={queueAnimProps.animConfig || this.defaultAnim}
        ref={(c) => {
          this.dom = ReactDOM.findDOMNode(c);
        }}
        onEnd={(e) => {
          if (queueAnimProps.onEnd) {
            queueAnimProps.onEnd(e);
          }
          if (e.type === 'enter') {
            this.inQueueEnd[e.key] = true;
          } else {
            delete this.inQueueEnd[e.key];
          }
        }}
        style={this.containerStyle}
      >
        {this.state.oneEnter && children}
      </QueueAnim>
    );
  }
}
