/* eslint-disable no-console */
import React from 'react';
import { Menu, Button, Dropdown, message } from 'antd';
import Icon, {
  FileAddOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import { polyfill } from 'react-lifecycles-compat';

import { RemoveLocalStorage } from '../../../../utils';
import { newTemplate } from '../../../../shared/utils';
import { DEFAULT_USER_NAME } from '../../../../shared/constants';
import * as ls from '../../../../shared/localStorage';
import * as url from '../../../../shared/url';

const { Item, ItemGroup } = Menu;

class NewFileButton extends React.Component {
  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      nextState.templateIds = ls.getUserTemplateIds(DEFAULT_USER_NAME);
    }
    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      templateIds: ls.getUserTemplateIds(DEFAULT_USER_NAME),
    };
  }

  onClickNew = () => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'newTemplate');
    }

    newTemplate(DEFAULT_USER_NAME).then(() => {
      location.reload();
    }).catch((error) => {
      console.error(error);
    });
  }

  onSyncData = (uid) => {
    // TODO: is it needed to remove template from user data?
    ls.removeTemplate(uid);

    const currentTemplateId = url.get('uid');
    if (currentTemplateId === uid) {
      message.success(
        this.props.intl.formatMessage({ id: 'app.header.new-file.message' }),
        0.1,
        () => {
          location.reload();
        });
    } else {
      message.success(
        this.props.intl.formatMessage({ id: 'app.header.new-file.message2' })
      );
    }
  }

  onClickItem = (e) => {
    url.update('uid', e.key);
    location.reload();
  }

  onRemoveUserTemplate = (uid) => {
    ls.removeUserTemplate(DEFAULT_USER_NAME, uid);

    const templateIds = ls.getUserTemplateIds(DEFAULT_USER_NAME);

    this.setState({
      templateIds,
    });

    ls.removeTemplate(uid);

    // 删除线上数据
    // removeTemplate(uid);
    const currentTemplateId = url.get('uid');
    if (currentTemplateId === uid) {
      this.onClickItem({ key: templateIds[0] });
    }
  }

  getNewMenu = () => {
    const { templateIds } = this.state;
    const localChild = templateIds.map((key) => (
      <Item
        key={key}
        title={key}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className="bar-list-text"
        >
          {key}
        </span>
        <span className="bar-list-remove">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              this.onSyncData(key);
            }}
            size="small"
            shape="circle"
            style={{ margin: '0 8px' }}
          >
            <Icon component={() => RemoveLocalStorage('14')} />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              this.onRemoveUserTemplate(key);
            }}
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </span>
      </Item>
    ));
    return localChild.length && (
      <Menu
        style={{ width: 300, textAlign: 'center' }}
        onClick={this.onClickItem}
        selectedKeys={[url.get('uid')]}
      >
        <ItemGroup title={<FormattedMessage id="app.header.new-file.header" />} key="0">
          {localChild}
        </ItemGroup>
      </Menu>
    );
  }

  render() {
    const menuNewDropdown = this.getNewMenu();
    const newIcon = (
      <a className="new-file-button" onClick={this.onClickNew}>
        {this.props.children || <FileAddOutlined />}
      </a>
    );
    return menuNewDropdown ? (
      <Dropdown
        overlay={menuNewDropdown}
        placement="bottomCenter"
      >
        {newIcon}
      </Dropdown>
    ) : newIcon;
  }
}

export default injectIntl(polyfill(NewFileButton));
