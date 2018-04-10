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

  inAnimate = {}
  currrentChildKeys = {};
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

  updateContainerWidth = () => {
    const containerWidth = this.dom.clientWidth + this.props.itemMargin;
    if (this.containerWidth !== containerWidth) {
      this.containerWidth = containerWidth;
      this.sortManager.changeProps({
        containerWidth,
      });
      this.setState({});
    }
  }

  componentWillReceiveProps(nextProps) {
    const currrentChildKeys = [];
    React.Children.forEach(nextProps.children, (item) => {
      currrentChildKeys.push(item.key);
    });
    Object.keys(this.currrentChildKeys).forEach((key) => {
      if (currrentChildKeys.indexOf(key) === -1) {
        delete this.currrentChildKeys[key];
      }
    });
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
    return React.Children.map(children, (child, childIndex) => {
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
      if (!this.currrentChildKeys[child.key]) {
        style.transform = `translate(${calculatedPosition[0]}px,${calculatedPosition[1]}px)`;
      } else {
        animation.x = calculatedPosition[0];
        animation.y = calculatedPosition[1];
        if (!this.inAnimate[child.key]) {
          animation.onStart = () => {
            this.inAnimate[child.key] = true;
          };
          animation.onComplete = () => {
            delete this.inAnimate[child.key];
          };
          style.transform = `translate(${this.currrentChildKeys[child.key][0]}px,${
            this.currrentChildKeys[child.key][1]}px)`;
        }
      }
      const childRender = React.createElement(TweenOne, {
        key: child.key,
        ...child.props,
        style,
        animation,
      });
      this.currrentChildKeys[child.key] = calculatedPosition;
      return childRender;
    });
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
    ].forEach(key => delete props[key]);
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
        style={this.containerStyle}
      >
        {this.state.oneEnter && children}
      </QueueAnim>
    );
  }
}
