import React from 'react';
import { Spin } from 'antd';

export default class ImageLoadComp extends React.PureComponent {
  state = {
    isLoad: false,
  }
  onImageLoad = () => {
    this.setState({
      isLoad: true,
    });
  }
  render() {
    const { src } = this.props;
    const { isLoad } = this.state;
    return (
      <Spin spinning={!isLoad}>
        <img alt="img" src={src} onLoad={this.onImageLoad} />
      </Spin>
    );
  }
}
