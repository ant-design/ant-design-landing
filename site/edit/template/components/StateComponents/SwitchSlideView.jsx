import React from 'react';
import { Pagination, Popover, Button } from 'antd';
import {
  BarsOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { getRandomKey } from 'rc-editor-list/lib/utils';

import tempData from '../../../../templates/template/element/template.config';
import { mergeEditDataToDefault } from '../../../../utils';
import * as actions from '../../../../shared/redux/actions';

import ListSort from './ListSort';

export default class SwitchSlideView extends React.Component {
  componentDidUpdate() {
    if (this.pop.tooltip && this.pop.tooltip.tooltip.trigger && this.pop.tooltip.tooltip.trigger.forcePopupAlign) {
      this.pop.tooltip.tooltip.trigger.forcePopupAlign();
    }
  }

  getCurrentDataSource = (props) => {
    const { templateData, dataId } = props;
    const id = dataId.split('_')[0];
    return mergeEditDataToDefault(templateData.data.config[dataId], tempData[id]);
  }

  onPaginationChange = (currentPage) => {
    const { iframe, templateData, dataId, reRect } = this.props;
    reRect();
    const template = {
      ...templateData,
      funcData: {
        [dataId]: {
          currentPage,
        },
      },
    };
    iframe.postMessage(template, '*');
  }

  setDataToTemplateData = (dataSource) => {
    const { templateData, dataId, reRect } = this.props;
    reRect();
    const newData = {
      ...templateData,
    };
    newData.data.config[dataId] = newData.data.config[dataId] || {};
    newData.data.config[dataId].dataSource = dataSource;
    this.props.dispatch(actions.setTemplateData(newData));
  }

  onSlideDelete = (item, dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    const children = data.children;
    const i = children.indexOf(item);
    children.splice(i, 1);
    /* data.children = data.children
      .map(node => (node === item ? { ...node, delete: true } : node)); */
    this.setDataToTemplateData(dataSource);
  }

  onSlideAdd = (dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    const defaultData = { ...data.children[data.children.length - 1] };
    delete defaultData.delete;
    defaultData.name = `elem~${getRandomKey()}`;
    data.children.push(defaultData);
    this.setDataToTemplateData(dataSource);
  }

  onListChange = (e, dataSource) => {
    const data = this.getDataSourceChild(dataSource);
    const newChildrenArray = e.map((item) => {
      return data.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    data.children = newChildrenArray;
    this.setDataToTemplateData(dataSource);
  }

  getDataSourceChild = (dataSource) => {
    const { data } = this.props;
    let c = dataSource;
    data.childRoute.forEach((key) => {
      c = c[key];
    });
    return c;
  }

  getPopChild = (dataSource) => {
    const { children } = this.getDataSourceChild(dataSource);
    const child = children.filter((item) => !item.delete);
    const listChild = child.map((item) => {
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">
            {item.name}
          </div>
          <div className="sort-manage-delete">
            <Button
              onClick={() => {
                this.onSlideDelete(item, dataSource);
              }}
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={child.length === 1}
            />
          </div>
        </div>
      );
    });
    return [
      <ListSort
        dragClassName="list-drag-selected"
        className="sort-manage-list"
        key="list"
        dragElement={(
          <div className="sort-manage-icon">
            <BarsOutlined type="bars" />
          </div>
        )}
        onChange={(e) => {
          this.onListChange(e, dataSource);
        }}
      >
        {listChild}
      </ListSort>,
      <div key="button" className="manage-button">
        <Button onClick={() => { this.onSlideAdd(dataSource); }} type="primary">
          <FormattedMessage id="app.state.banner.add" />
        </Button>
      </div>,
    ];
  }

  render() {
    const { data, name } = this.props;
    const popChild = this.getPopChild(this.getCurrentDataSource(this.props));
    return (
      <div className="banner-slide-wrapper">
        <div className="banner-slide">
          <Pagination
            size="small"
            simple
            pageSize={1}
            current={data.current}
            total={data.total}
            onChange={this.onPaginationChange}
          />
          <Popover
            content={popChild}
            title={(
              <span>
                <FormattedMessage id="app.state.banner.header" />
                {' '}
                {name}
              </span>
            )}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            overlayClassName="manage-wrapper"
            ref={(c) => {
              this.pop = c;
            }}
          >
            <Button type="primary" icon={<BarsOutlined />} size="small" shape="circle" />
          </Popover>
        </div>
      </div>
    );
  }
}
