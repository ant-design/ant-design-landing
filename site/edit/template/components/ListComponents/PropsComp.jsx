import React from 'react';
import { Collapse, Row, Col, Button, Tooltip, Icon, Switch, Select, InputNumber } from 'antd';
import { FormattedMessage } from 'react-intl';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import InputGroup from './InputGroup';
import tempData from '../../../../templates/template/element/template.config';
import compConfig from '../../component.config';
import { mergeEditDataToDefault, getDataSourceValue, deepCopy } from '../../../../utils';
import CheckboxGroup from './CheckboxGroup';
import ListSort from '../StateComponents/ListSort';

const Panel = Collapse.Panel;

const noProps = ['text', 'image', 'video', 'icon', 'texty', 'titleWrapper', 'textAndImage', 'childAll', 'link', 'Content'];

export default class PropsComp extends React.PureComponent {
  getCompChild = (defaultValue, template, key) => {
    const { type, value, props, func, join, parentKey } = defaultValue;
    const v = template && template[key];
    const currentValue = typeof v !== 'undefined' ? v : value;
    switch (type) {
      case 'switch':
        return (
          <Switch
            {...props}
            size="small"
            {...(func ? {} : { checkbox: currentValue.toString() })}
            onChange={(data) => { this.props.onChange(key, data, func); }}
          />
        );
      case 'inputGroup':
        return (
          <InputGroup
            {...props}
            {...(func ? {} : { value: currentValue })}
            onChange={(data) => { this.props.onChange(key, data, func); }}
          />
        );
      case 'select':
        return (
          <Select
            {...props}
            {...(func ? {} : { value: currentValue })}
            onChange={(data) => { this.props.onChange(key, data, func); }}
            size="small"
            getPopupContainer={node => node.parentNode.parentNode.parentNode.parentNode.parentNode}
          >
            {props.children.map((k) => {
              return (
                <Select.Option key={k.key} value={k.key}>
                  {k.name}
                </Select.Option>
              );
            })}
          </Select>
        );
      case 'checkbox':
        return (
          <CheckboxGroup
            {...props}
            {...(func ? {} : { value: currentValue })}
            size="small"
            onChange={(data) => { this.props.onChange(key, data, func); }}
          />
        );
      case 'inputNumber':
        return (
          <InputNumber
            {...props}
            size="small"
            {...(func ? {} : { value: currentValue })}
            onChange={(data) => { this.props.onChange(key, data, func); }}
          />
        );
      case 'array':
        return this.getArrayChild(currentValue, template, join, parentKey, key, func);
      default:
        break;
    }
  }

  onDelete = (e, value) => {
    const children = value.children;
    const i = children.indexOf(e);
    children.splice(i, 1);
    value.children = children;
  }

  onSlideDelete = (e, value, key, func, { template, join, i, parentKey }) => {
    this.onDelete(e, value);
    if (join) {
      let $item;
      join.forEach((k) => {
        $item = $item ? $item[k] : template[k];
      });
      let mapBoolNum;
      let j;
      for (j = 0; j < join.length; j += 1) {
        const k = join[j];
        if (k === '$all') {
          mapBoolNum = j;
          break;
        } else {
          $item = $item ? $item[k] : template[k];
        }
      }
      if (mapBoolNum) {
        $item.forEach((aItem) => {
          let cItem;
          for (j = mapBoolNum + 1; j < join.length; j += 1) {
            const k = join[j];
            cItem = cItem ? cItem[k] : aItem[k];
            cItem.splice(i, 1);
          }
        });
      } else {
        $item.splice(i, 1);
      }
      this.props.onChange(parentKey, template, func, true);
    } else {
      this.props.onChange(key, value, func);
    }
  }

  copyData = (currentData) => {
    const newData = deepCopy(currentData[currentData.length - 1]);
    delete newData.delete;
    const randomName = getRandomKey();
    if (newData.name) {
      newData.name = `${newData.name.split('~')[0].replace(/[0-9]/ig, '')}~${randomName}`;
    }
    if (newData.key) {
      newData.key = `${newData.key.split('~')[0].replace(/[0-9]/ig, '')}~${randomName}`;
    }
    // Table
    if (newData.dataIndex) {
      newData.dataIndex = `${newData.dataIndex.split('~')[0].replace(/[0-9]/ig, '')}~${randomName}`;
    }
    return newData;
  }

  onAdd = (currentData, key, func, { template, join, parentKey }) => {
    let newData = this.copyData(currentData.children);
    currentData.children.push(newData);
    if (join) {
      let $item;
      join.forEach((k) => {
        $item = $item ? $item[k] : template[k];
      });
      let mapBoolNum;
      let j;
      for (j = 0; j < join.length; j += 1) {
        const k = join[j];
        if (k === '$all') {
          mapBoolNum = j;
          break;
        } else {
          $item = $item ? $item[k] : template[k];
        }
      }
      if (mapBoolNum) {
        $item.forEach((aItem) => {
          let cItem;
          for (j = mapBoolNum + 1; j < join.length; j += 1) {
            const k = join[j];
            cItem = cItem ? cItem[k] : aItem[k];
            console.log(cItem);
            newData = this.copyData(cItem);
            console.log(newData);
            cItem.push(newData);
            // cItem.splice(i, 1);
          }
        });
      } else {
        newData = this.copyData($item);
        console.log(newData);
        $item.push(newData);
      }
      this.props.onChange(parentKey, template, func, true);
    } else {
      this.props.onChange(key, currentData, func);
    }
  }

  onListChange = (e, currentData, key, func) => {
    currentData.children = e.map((item) => {
      return currentData.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    this.props.onChange(key, currentData, func);
  }

  getArrayChild = (value, template, join, parentKey, key, func) => {
    const childrenToRender = value.children.map((item, i) => {
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">
            {item.name}
          </div>
          <div className="sort-manage-delete">
            <Button
              onClick={() => {
                this.onSlideDelete(item, value, key, func, { template, join, i, parentKey });
              }}
              size="small"
              shape="circle"
              icon="delete"
              disabled={value.children.length === 1}
            />
          </div>
        </div>
      );
    });
    return (
      <Row className="child-wrapper">
        <Col>
          <ListSort
            dragClassName="list-drag-selected"
            className="sort-manage-list"
            key="list"
            dragElement={(
              <div className="sort-manage-icon">
                <Icon type="bars" />
              </div>
            )}
            onChange={(e) => {
              this.onListChange(e, value, key, func);
            }}
          >
            {childrenToRender}
          </ListSort>
        </Col>
        <Row gutter={8} style={{ marginTop: 8 }}>
          <Col>
            <a
              onClick={() => {
                this.onAdd(value, key, func, { template, join, parentKey });
              }}
              className="add-button"
            >
              <Icon type="plus" />
            </a>
          </Col>
        </Row>
      </Row>
    );
  }

  getChildrenToRender = (config, template) => {
    const t = Object.keys(config).filter(key => key !== 'apiLink').map((key) => {
      const defaultData = config[key];

      if (key === 'remark') {
        return (
          <Row key="remark">
            <Col>
              <Icon type="warning" style={{ marginRight: 4 }} />
              {' '}
              {defaultData}
            </Col>
          </Row>
        );
      }
      const compChild = this.getCompChild(defaultData, template, key);
      const tip = defaultData.remark && (
        <Tooltip
          placement="topRight"
          arrowPointAtCenter
          title={(
            <span>
              {defaultData.remark}
            </span>
          )}
        >
          <Icon type="question-circle" style={{ marginLeft: 8 }} />
        </Tooltip>
      );
      return [
        <Row gutter={8} key={`${defaultData.name}-1`}>
          <Col>
            {defaultData.name}
            {tip}
          </Col>
        </Row>,
        <Row gutter={8} key={`${defaultData.name}-2`}>
          <Col>
            {compChild}
          </Col>
        </Row>,
      ];
    });
    return t;
  }

  render() {
    const { edit, currentEditData, templateData } = this.props;
    const editArray = edit ? edit.split(',').filter(c => noProps.indexOf(c) === -1) : [];
    if (!edit || !editArray.length) {
      return null;
    }

    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const tempDataSource = tempData[cid];
    const newTempDataSource = mergeEditDataToDefault(templateData.data.config[ids[0]],
      tempDataSource);
    const currentEditTemplateData = getDataSourceValue(ids[1], newTempDataSource);
    return editArray.map((item, i) => {
      const childToRender = this.getChildrenToRender(compConfig[item], currentEditTemplateData);
      return (
        <Collapse bordered={false} defaultActiveKey={['1']} key={i.toString()}>
          <Panel
            header={(
              <p>
                {item}
                {' '}
                <FormattedMessage id="app.common.edit" />
                {' '}
                {
                  compConfig[item].apiLink && (
                    <a target="_blank" href={compConfig[item].apiLink}>
                      <FormattedMessage id="app.edit.look-api" />
                    </a>
                  )}
              </p>
            )}
            key="1"
          >
            {childToRender}
          </Panel>
        </Collapse>
      );
    });
  }
}
