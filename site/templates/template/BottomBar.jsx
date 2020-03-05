import React from 'react';
import { Popconfirm } from 'antd';
import Icon, {
  HomeOutlined,
} from '@ant-design/icons';
import { getNewHref, RemoveLocalStorage } from '../../utils';
import { getURLData } from '../../theme/template/utils';

export default class BottomBar extends React.Component {
  state = {
    close: false,
  }

  onRemoveLocalStorage = () => {
    const uid = getURLData('uid');
    localStorage.removeItem(uid);
    location.reload();
  };

  onClose = () => {
    const { close } = this.state;
    this.setState({
      close: !close,
    });
  }

  render() {
    const { close } = this.state;
    return (
      <div className={`bottom-func-bar${close ? ' close' : ''}`}>
        <div className="bar-icon" onClick={this.onClose}>
          <i className="arrow" />
        </div>
        <ul>
          <li
            onClick={() => {
              location.href = getNewHref('7111', null, true);
            }}
          >
            <HomeOutlined />
            返回首页
          </li>
          {/* <li
            onClick={() => {
              location.href = `${getNewHref('7112', null, true)}${location.hash}`;
            }}
          >
            <EditOutlined />
              返回编辑
          </li> */}
          <li>
            <Popconfirm
              title="清除当前缓存，重新从服务器读取最后保存的数据；如有编辑，请先保存。"
              onConfirm={this.onRemoveLocalStorage}
              okText="确定"
              cancelText="取消"
              overlayStyle={{ width: 320 }}
            >
              <Icon component={() => RemoveLocalStorage('14')} />
              清除缓存
            </Popconfirm>
          </li>
        </ul>
      </div>
    );
  }
}
