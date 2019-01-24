import React from 'react';
import { Collapse, Row, Col, Tooltip, Icon, Switch, Select, InputNumber } from 'antd';
import InputGroup from './InputGroup';
import tempData from '../../../../templates/template/element/template.config';
import compConfig from '../../component.config';
import { mergeEditDataToDefault, getDataSourceValue } from '../../../../utils';
import CheckboxGroup from './CheckboxGroup';

const Panel = Collapse.Panel;

const noProps = ['text', 'image', 'video', 'icon', 'texty', 'titleWrapper', 'textAndImage', 'link', 'Content'];

export default class PropsComp extends React.PureComponent {
  getCompChild = (defaultValue, v, key) => {
    const { type, value, props, func } = defaultValue;
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
                <Select.Option key={k}>
                  {k}
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
      default:
        break;
    }
  }

  getChildrenToRender = (config, template) => {
    const t = Object.keys(config).filter(key => key !== 'apiLink').map((key) => {
      const defaultData = config[key];
      const templateData = template[key];
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
      const compChild = this.getCompChild(defaultData, templateData, key);
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
            {' '}
            -
            {' '}
            {key}
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
                编辑
                {' '}
                {
                  compConfig[item].apiLink && (
                    <a target="_blank" href={compConfig[item].apiLink}>
                      查看 API
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
