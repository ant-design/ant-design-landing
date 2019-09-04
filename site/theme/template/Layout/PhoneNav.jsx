import React from 'react';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { Popover } from 'antd';

class PhoneNav extends React.PureComponent {
  static getDerivedStateFromProps(props, { prevProps, show }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps && show) {
      nextState.show = false;
    }
    return nextState;
  }

  state = {
    show: false,
  }

  onMenuVisibleChange = (show) => {
    this.setState({
      show,
    });
  }

  render() {
    const { children } = this.props;
    const { show } = this.state;
    const barClassName = classnames('phone-nav-bar', {
      open: show,
    });
    return (
      <Popover
        overlayClassName="popover-menu"
        placement="bottomRight"
        content={children}
        trigger="click"
        visible={show}
        arrowPointAtCenter
        onVisibleChange={this.onMenuVisibleChange}
      >
        <div className="phone-nav-bar-wrapper">
          <i className={barClassName} />
        </div>
      </Popover>
    );
  }
}

export default polyfill(PhoneNav);
