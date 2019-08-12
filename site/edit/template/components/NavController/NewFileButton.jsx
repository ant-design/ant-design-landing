import React from 'react';
import { Menu, Button, Icon, Dropdown, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { RemoveLocalStorage } from '../../../../utils';
import {
  userName, newTemplate,
} from '../../../../edit-module/actions';
import { getURLData, setURLData } from '../../../../theme/template/utils';

const { Item, ItemGroup } = Menu;

export default class NewFileButton extends React.Component {
  constructor(props) {
    super(props);
    const user = window.localStorage.getItem(userName) || '';
    this.state = {
      localStorage: user.split(',').filter(c => c),
    };
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  componentWillReceiveProps() {
    const user = window.localStorage.getItem(userName) || '';
    this.setState({
      localStorage: user.split(',').filter(c => c),
    });
  }

  onClickNew = () => {
    if (!location.port && window.gtag) {
      window.gtag('event', 'newTemplate');
    }
    newTemplate(() => {
      location.reload();
    });
  }

  onSyncData = (key) => {
    window.localStorage.removeItem(key);
    const current = getURLData('uid');
    if (current === key) {
      message.success(
        this.context.intl.formatMessage({ id: 'app.header.new-file.message' }),
        0.1,
        () => {
          location.reload();
        });
    } else {
      message.success(
        this.context.intl.formatMessage({ id: 'app.header.new-file.message2' })
      );
    }
  }

  onClickItem = (e) => {
    setURLData('uid', e.key);
    location.reload();
  }

  onRemoveLocalStorage = (key) => {
    const localStorage = this.state.localStorage.filter(c => c !== key);
    window.localStorage.setItem(userName, localStorage.join(','));
    window.localStorage.removeItem(key);
    this.setState({
      localStorage,
    });
    // 删除线上数据
    // removeTemplate(key);
    const current = getURLData('uid');
    if (current === key) {
      this.onClickItem({ key: localStorage[0] });
    }
  }

  getNewMenu = () => {
    const { localStorage } = this.state;
    const localChild = localStorage.map(key => (
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
              this.onRemoveLocalStorage(key);
            }}
            size="small"
            shape="circle"
            icon="delete"
          />
        </span>
      </Item>
    ));
    return localChild.length && (
      <Menu
        style={{ width: 300, textAlign: 'center' }}
        onClick={this.onClickItem}
        selectedKeys={[getURLData('uid')]}
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
        {this.props.children || <Icon type="file-add" />}
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
