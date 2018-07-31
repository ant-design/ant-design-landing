import React from 'react';
import { Button, Popover, Input } from 'antd';

export default class IconComp extends React.Component {
  onIconChange = (e) => {
    this.props.setTemplateConfigData(e.target.value);
  }

  render() {
    const { editText } = this.props;
    const popContent = (
      <div>
        <p style={{ marginBottom: 8 }}>
          只能使用
          <a href="https://ant.design/components/icon-cn/" target="_blank">
            {' '}
            ant design 的 Icon
            {' '}
          </a>
          名称
        </p>
        <Input
          style={{ width: 250 }}
          onChange={this.onIconChange}
          defaultValue={editText}
          placeholder="请粘贴 Icon 名称"
        />
      </div>
    );
    return (
      <Popover
        placement="bottomRight"
        title="粘贴 Icon 的 type 名称"
        content={popContent}
        trigger="click"
      >
        <Button type="primary" size="small" onClick={this.props.closeEditText}>
          Icon
        </Button>
      </Popover>
    );
  }
}
