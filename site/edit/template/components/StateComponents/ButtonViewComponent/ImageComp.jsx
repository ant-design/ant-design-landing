import React from 'react';
import { Button, Popover, Input } from 'antd';
import {
  PictureOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

export default class ImageComp extends React.Component {
  onImageBtnChange = (e) => {
    const value = e.target.value;
    if (value !== this.props.editText) {
      this.props.setTemplateConfigData(value);
    }
  }

  render() {
    const { editText } = this.props;
    return (
      <Popover
        placement="bottomRight"
        title={<FormattedMessage id="app.state.image.header" />}
        content={(
          <Input
            style={{ width: 250 }}
            onBlur={this.onImageBtnChange}
            defaultValue={editText}
            placeholder={<FormattedMessage id="app.state.image.placeholder" />}
          />
        )}
        trigger="click"
      >
        <Button type="primary" size="small" onClick={this.props.closeEditText}>
          <PictureOutlined />
        </Button>
      </Popover>
    );
  }
}
