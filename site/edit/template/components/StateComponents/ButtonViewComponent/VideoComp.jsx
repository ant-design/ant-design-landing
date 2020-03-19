import React from 'react';
import { Button, Popover, Input, Row, Col } from 'antd';
import {
  VideoCameraOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
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
          <Col span={8} style={{ textAlign: 'right', paddingRight: 8 }}>
            <FormattedMessage id="app.state.video.placeholder" />
          </Col>
          <Col span={16}>
            <Input
              onBlur={(e) => { this.onVideoChange(e, editText, 'video'); }}
              defaultValue={editText.video}
              placeholder={<FormattedMessage id="app.state.video.placeholder" />}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Col span={8} style={{ textAlign: 'right', paddingRight: 8 }}>
            <FormattedMessage id="app.state.video.preview" />
          </Col>
          <Col span={16}>
            <Input
              onBlur={(e) => { this.onVideoChange(e, editText, 'image'); }}
              defaultValue={editText.image && editText.image.match(isImg) ? editText.image : ''}
              placeholder={<FormattedMessage id="app.state.video.preview" />}
            />
          </Col>
        </Row>
      </div>
    );
    return (
      <Popover
        placement="bottomRight"
        title={<FormattedMessage id="app.state.video.header" />}
        content={popContent}
        trigger="click"
      >
        <Button type="primary" size="small">
          <VideoCameraOutlined />
        </Button>
      </Popover>
    );
  }
}
