import React from 'react';
import { Button, Popover, Input } from 'antd';
import { FormattedMessage } from 'react-intl';

export default class IconComp extends React.Component {
  onIconChange = (e) => {
    this.props.setTemplateConfigData(e.target.value);
  }

  render() {
    const { editText } = this.props;
    const popContent = (
      <div>
        <p style={{ marginBottom: 8 }}>
          <FormattedMessage id="app.state.icon.only-use" />
          <a href="https://ant.design/components/icon-cn/" target="_blank">
            {' '}
            ant design Icon
            {' '}
          </a>
        </p>
        <Input
          style={{ width: 250 }}
          onBlur={this.onIconChange}
          defaultValue={editText}
          placeholder={<FormattedMessage id="app.state.icon.paste" />}
        />
      </div>
    );
    return (
      <Popover
        placement="bottomRight"
        title={<FormattedMessage id="app.state.icon.header" />}
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
