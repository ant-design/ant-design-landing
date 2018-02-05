import React from 'react';
import { Spin } from 'antd';

const imgLoadData = {};

export default class ImageLoadComp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.src;
    this.state = {
      isLoad: imgLoadData[this.id],
    };
  }
  onImageLoad = () => {
    if (!imgLoadData[this.id] || !this.state.isLoad) {
      this.setState({
        isLoad: true,
      }, () => {
        imgLoadData[this.id] = true;
      });
    }
  }
  render() {
    const { src } = this.props;
    const { isLoad } = this.state;
    return (
      <Spin spinning={!isLoad}>
        <div className="img" style={{ backgroundImage: `url(${src})` }} />
        <img alt="img" src={src} onLoad={this.onImageLoad} style={{ display: 'none' }} />
      </Spin>
    );
  }
}
