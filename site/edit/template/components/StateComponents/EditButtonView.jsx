import React from 'react';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Input from 'antd/lib/input';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { isImg } from '../../utils';

const ButtonGroup = Button.Group;

export default class EditButtonView extends React.PureComponent {
  onImageBtnChange = (e) => {
    const value = e.target.value;
    if (value.match(isImg)) {
      this.props.setTemplateConfigData(value);
    }
  }

  onParentDropdonw = (e) => {
    const { currentData, onParentChange } = this.props;
    const select = currentData.parent.filter(item => item.dataId === e.key)[0];
    onParentChange(select);
  }

  getMenu = (parent) => {
    const children = parent.map((item) => {
      const str = item.dataId.split('&');
      return (
        <Menu.Item key={item.dataId} >
          {str[str.length - 1].split('-')[1] || str[str.length - 1].split('-')[0]}
        </Menu.Item>
      );
    });
    return (
      <Menu onClick={this.onParentDropdonw}>
        {children}
      </Menu>);
  }

  render() {
    const { editButtonArray, editText, currentData } = this.props;
    const parent = currentData.parent;
    let parentChild;
    if (parent && parent.length) {
      const str = currentData.dataId.split('&');
      parentChild = (
        <Dropdown
          key="d"
          overlay={this.getMenu(parent)}
          placement="bottomRight"
        >
          <Button type="primary" size="small" style={{ maxWidth: 150 }}>
            {str[str.length - 1].split('-')[1] || str[str.length - 1].split('-')[0]}
            <Icon type="down" />
          </Button>
        </Dropdown>);
    }
    const buttons = editButtonArray && editButtonArray.map((key) => {
      switch (key) {
        case 'image':
          return (
            <Popover
              key={key}
              placement="bottomRight"
              title="粘贴图片地址"
              content={<Input
                style={{ width: 250 }}
                onChange={this.onImageBtnChange}
                defaultValue={editText && editText.match(isImg) ? editText : ''}
                placeholder="请粘贴图片"
              />}
              trigger="click"
            >
              <Button type="primary" size="small" onClick={this.props.closeEditText}>
                <Icon type="picture" />
              </Button>
            </Popover>
          );
        case 'text':
          return (
            <Button key={key} type="primary" size="small" onClick={this.props.openEditTextFunc}>
              T
            </Button>);
        default:
          return null;
      }
    }).filter(c => c);
    const top = currentData.item.getBoundingClientRect().top;
    return (
      <ButtonGroup key="group" className={top < 24 ? 'inside' : ''}>
        {parentChild}
        {buttons}
      </ButtonGroup>
    );
  }
}
