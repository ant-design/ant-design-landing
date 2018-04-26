import React from 'react';
import { Icon, Button, Popover, Input, Dropdown, Menu, Modal } from 'antd';
import classnames from 'classnames';
import { isImg } from '../../../../utils';
import MenuEditView from './MenuEditView';

const ButtonGroup = Button.Group;

export default class EditButtonView extends React.PureComponent {
  state = {
    editMenuShow: false,
  }
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

  getStr = (id) => {
    const str = id.split('&').filter(c => c).map(c => c.split('=')[1] || c.split('=')[0]);
    return str[str.length - 1].split('-')[1] || str[str.length - 1].split('-')[0];
  }

  getMenu = (parent) => {
    const children = parent.map(item => (
      <Menu.Item key={item.dataId} >
        {this.getStr(item.dataId)}
      </Menu.Item>
    )
    );
    return (
      <Menu onClick={this.onParentDropdonw}>
        {children}
      </Menu>);
  }

  switchEditMenuFunc = () => {
    this.setState({
      editMenuShow: !this.state.editMenuShow,
    });
  }

  render() {
    const { editButtonArray, editText, currentData } = this.props;
    const parent = currentData.parent;
    let parentChild;
    if (parent && parent.length) {
      parentChild = (
        <Dropdown
          key="d"
          overlay={this.getMenu(parent)}
          placement="bottomRight"
        >
          <Button type="primary" size="small" style={{ maxWidth: 150 }}>
            {this.getStr(currentData.dataId)}
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
        case 'Menu':
          return (
            <Button key={key} type="primary" size="small" onClick={this.switchEditMenuFunc}>
              <Icon type="bars" />
            </Button>
          );
        default:
          return null;
      }
    }).filter(c => c);
    const rect = currentData.item.getBoundingClientRect();
    const top = rect.top;
    const width = rect.width;
    const className = classnames({
      inside: top < 24 && width > 120,
      bottom: top < 24 && width < 120,
    });
    return (
      <ButtonGroup key="group" className={className}>
        {parentChild}
        {buttons}
        <Modal
          title="编辑导航"
          visible={this.state.editMenuShow}
          onCancel={this.switchEditMenuFunc}
          footer={null}
          width={400}
        >
          <MenuEditView {...this.props} />
        </Modal>
      </ButtonGroup>
    );
  }
}
