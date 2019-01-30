import React from 'react';
import { Icon, Button, Popover, Input } from 'antd';
import { FormattedMessage } from 'react-intl';
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
        title={<FormattedMessage id="app.state.image.header" />}
        content={(
          <Input
            style={{ width: 250 }}
            onChange={this.onImageBtnChange}
            defaultValue={editText && editText.match(isImg) ? editText : ''}
            placeholder={<FormattedMessage id="app.state.image.placeholder" />}
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
