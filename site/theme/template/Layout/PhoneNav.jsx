import React from 'react';
import classnames from 'classnames';
import { Popover } from 'antd';

export default class PhoneNav extends React.PureComponent {
  state = {
    show: false,
  }

  componentWillReceiveProps() {
    if (this.state.show) {
      this.setState({
        show: false,
      });
    }
  }

  onMenuVisibleChange = (show) => {
    this.setState({
      show,
    });
  }

  render() {
    const { children } = this.props;
    const { show } = this.state;
    const barClassNamr = classnames('phone-nav-bar', {
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
          <i className={barClassNamr} />
        </div>
      </Popover>
    );
  }
}
