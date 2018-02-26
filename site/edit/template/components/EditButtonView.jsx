import React from 'react';
import { Icon, Button, Popover, Input } from 'antd';
import { isImg } from '../utils';

const ButtonGroup = Button.Group;

export default class EditButtonView extends React.PureComponent {
  onImageBtnChange = (e) => {
    const value = e.target.value;
    if (value.match(isImg)) {
      this.props.setTemplateConfigData(value);
    }
  }

  render() {
    const { editButtonArray, editText } = this.props;
    const buttons = editButtonArray && editButtonArray.map((key) => {
      if (key === 'image' || key === 'text') {
        if (key === 'image') {
          return (
            <Popover
              key={key}
              placement="bottomRight"
              title="粘贴图片地址"
              content={<Input
                style={{ width: 250 }}
                onChange={this.onImageBtnChange}
                value={editText}
              />}
              trigger="click"
            >
              <Button type="primary" size="small" onClick={this.props.closeEditText}>
                <Icon type="picture" />
              </Button>
            </Popover>
          );
        }
        return (
          <Button key={key} type="primary" size="small" onClick={this.props.openEditTextFunc}>
            T
          </Button>
        );
      }
      return null;
    }).filter(c => c);
    return (buttons ? (
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    ) : null);
  }
}
