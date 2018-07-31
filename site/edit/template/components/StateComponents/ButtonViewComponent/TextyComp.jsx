import React from 'react';
import { Button, Popover, Input } from 'antd';

export default class TextyComp extends React.Component {
  onImageBtnChange = (e) => {
    const value = e.target.value;
    this.props.setTemplateConfigData(value);
  }

  render() {
    const { editText } = this.props;
    return (
      <Popover
        placement="bottomRight"
        title="请输入 texty 的文本"
        content={(
          <Input
            style={{ width: 250 }}
            onChange={this.onImageBtnChange}
            defaultValue={editText || ''}
            placeholder="请输入 texty 的文本"
          />
        )}
        trigger="click"
      >
        <Button type="primary" size="small" onClick={this.props.closeEditText}>
          Ty
        </Button>
      </Popover>
    );
  }
}
