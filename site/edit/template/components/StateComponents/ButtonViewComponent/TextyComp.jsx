import React from 'react';
import { Button, Popover, Input } from 'antd';
import { FormattedMessage } from 'react-intl';

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
        title={<FormattedMessage id="app.state.texty.header" />}
        content={(
          <Input
            style={{ width: 250 }}
            onBlur={this.onImageBtnChange}
            defaultValue={editText || ''}
            placeholder={<FormattedMessage id="app.state.texty.header" />}
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
