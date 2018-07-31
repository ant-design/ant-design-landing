import React from 'react';
import { Icon, Button, Popover, Input } from 'antd';
import { isImg } from '../../../../../utils';

export default class ImageComp extends React.Component {
  onImageBtnChange = (e) => {
    const value = e.target.value;
    if (value.match(isImg)) {
      this.props.setTemplateConfigData(value);
    }
  }

  render() {
    const { editText } = this.props;
    return (
      <Popover
        placement="bottomRight"
        title="粘贴图片地址"
        content={(
          <Input
            style={{ width: 250 }}
            onChange={this.onImageBtnChange}
            defaultValue={editText && editText.match(isImg) ? editText : ''}
            placeholder="请粘贴图片"
          />
        )}
        trigger="click"
      >
        <Button type="primary" size="small" onClick={this.props.closeEditText}>
          <Icon type="picture" />
        </Button>
      </Popover>
    );
  }
}
