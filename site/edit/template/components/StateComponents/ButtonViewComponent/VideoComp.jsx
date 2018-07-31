import React from 'react';
import { Icon, Button, Popover, Input, Row, Col } from 'antd';
import { isImg } from '../../../../../utils';

export default class VideoComp extends React.Component {
  onVideoChange = (e, data, key) => {
    data[key] = e.target.value;
    this.props.setTemplateConfigData(data);
  }

  render() {
    const { editText } = this.props;
    const popContent = (
      <div style={{ width: 350, lineHeight: '32px' }}>
        <Row>
          <Col span={4}>
            视频地址
          </Col>
          <Col span={20}>
            <Input
              onChange={(e) => { this.onVideoChange(e, editText, 'video'); }}
              defaultValue={editText.video}
              placeholder="请粘贴 video 地址"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Col span={4}>
            预览图片
          </Col>
          <Col span={20}>
            <Input
              onChange={(e) => { this.onVideoChange(e, editText, 'image'); }}
              defaultValue={editText.image && editText.image.match(isImg) ? editText.image : ''}
              placeholder="请粘贴图片地址"
            />
          </Col>
        </Row>
      </div>
    );
    return (
      <Popover
        placement="bottomRight"
        title="video 地址"
        content={popContent}
        trigger="click"
      >
        <Button type="primary" size="small">
          <Icon type="video-camera" />
        </Button>
      </Popover>
    );
  }
}
