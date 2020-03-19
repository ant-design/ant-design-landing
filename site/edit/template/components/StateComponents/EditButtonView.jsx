import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import {
  DownOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';

import ImageComp from './ButtonViewComponent/ImageComp';
import IconComp from './ButtonViewComponent/IconComp';
import VideoComp from './ButtonViewComponent/VideoComp';
import MenuComp from './ButtonViewComponent/MenuComp';
import TextyComp from './ButtonViewComponent/TextyComp';
import ContentWrapper from './ButtonViewComponent/ContentWrapper';
import LinkComp from './ButtonViewComponent/LinkComp';

const ButtonGroup = Button.Group;

export default class EditButtonView extends React.PureComponent {
  onParentDropdonw = (e) => {
    const { currentData, onParentChange } = this.props;
    const select = currentData.parent.filter((item) => item.dataId === e.key)[0];
    onParentChange(select);
  }

  getStr = (id) => {
    const str = id.split('&').filter((c) => c).map((c) => c.split('=')[1] || c.split('=')[0]);
    return str[str.length - 1].split('-')[1] || str[str.length - 1].split('-')[0];
  }

  getMenu = (parent) => {
    const children = parent.map((item) => (
      <Menu.Item key={item.dataId}>
        {this.getStr(item.dataId)}
      </Menu.Item>
    )
    );
    return (
      <Menu onClick={this.onParentDropdonw}>
        {children}
      </Menu>
    );
  }

  render() {
    const { editButtonArray, currentData } = this.props;
    if (!currentData) {
      return null;
    }
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
            <DownOutlined type="down" />
          </Button>
        </Dropdown>
      );
    }
    const buttons = editButtonArray && editButtonArray.map((key) => {
      switch (key) {
        case 'text':
          return (
            <Button key={key} type="primary" size="small" onClick={this.props.openEditTextFunc}>
              T
            </Button>
          );
        case 'image':
          return (<ImageComp {...this.props} key={key} />);
        case 'Menu':
        case 'LinkMenu':
          return (
            <MenuComp {...this.props} key={key} />
          );
        case 'icon':
          return (
            <IconComp {...this.props} key={key} />
          );
        case 'video':
          return (
            <VideoComp {...this.props} key={key} />
          );
        case 'texty':
          return (
            <TextyComp {...this.props} key={key} />
          );
        case 'Content': // Content 必须为 object;
          return (
            <ContentWrapper {...this.props} key={key} />
          );
        case 'link':
        case 'linkA':
          return (<LinkComp {...this.props} key={key} type={key} />);
        default:
          return null;
      }
    }).filter((c) => c);
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
      </ButtonGroup>
    );
  }
}
