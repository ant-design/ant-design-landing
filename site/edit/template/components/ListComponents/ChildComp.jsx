import React from 'react';
import { Collapse, Button, Row, Col, Icon } from 'antd';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import ListSort from '../StateComponents/ListSort';
import tempData from '../../../../templates/template/element/template.config';
import { mergeEditDataToDefault, deepCopy } from '../../../../utils';
import { getDataSourceValue } from '../../utils';

const Panel = Collapse.Panel;

export default class ChildComp extends React.PureComponent {
  getCurrentDataSource = (props) => {
    const { templateData, dataId } = props;
    const id = dataId.split('_')[0];
    return mergeEditDataToDefault(templateData.data.config[dataId], tempData[id]);
  }

  onListChange = (e, ids, currentData) => {
    currentData.children = e.map((item) => {
      return currentData.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    this.props.onChange(ids, currentData);
  }
  onSlideDelete = (e, ids, currentData) => {
    /*  const children = currentData.children;
    const i = children.indexOf(e);
    children.splice(i, 1); */
    currentData.children = currentData.children
      .map(node => (node === e ? { ...node, delete: true } : node));
    this.props.onChange(ids, currentData);
  }
  onAdd = (ids, currentData) => {
    const newData = deepCopy(currentData.children[currentData.children.length - 1]);
    delete newData.delete;
    newData.name = `${newData.name.split('~')[0].replace(/[0-9]/ig, '')}~${getRandomKey()}`;
    currentData.children.push(newData);
    this.props.onChange(ids, currentData);
  }
  render() {
    const { edit, currentEditData, templateData } = this.props;
    const isBannerAnim = edit && edit.split(',').some(c => c === 'BannerAnim');
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const tempDataSource = tempData[cid];
    const newTempDataSource = mergeEditDataToDefault(templateData.data.config[ids[0]],
      tempDataSource);

    let currentEditTemplateData = getDataSourceValue(ids[1], newTempDataSource);
    console.log(currentEditTemplateData);
    const idChildArray = ids[1].split('&');
    const childIsArray = Array.isArray(currentEditTemplateData.children);
    const parentIsArray = idChildArray[idChildArray.length - 1].indexOf('array_name') >= 0;
    if ((!childIsArray && !parentIsArray) || isBannerAnim) {
      return null;
    }
    if (parentIsArray) {
      idChildArray.splice(idChildArray.length - 1, 1);
      idChildArray.splice(idChildArray.length - 1, 1); // children
      ids[1] = idChildArray.join('&');
      currentEditTemplateData = getDataSourceValue(ids[1], newTempDataSource);
    }
    console.log(currentEditTemplateData);
    const childrenToRender = currentEditTemplateData.children.filter(c => c && !c.delete).map((item) => {
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">{item.name}</div>
          <div className="sort-manage-delete">
            <Button
              onClick={() => {
                this.onSlideDelete(item, ids, currentEditTemplateData);
              }}
              size="small"
              shape="circle"
              icon="delete"
              disabled={currentEditTemplateData.children.length === 1}
            />
          </div>
        </div>
      );
    });
    return (
      <Collapse bordered={false} defaultActiveKey={['1']} className="child-wrapper">
        <Panel
          header={
            <p>
              子级增删
            </p>
          }
          key="1"
        >
          <Row gutter={8}>
            <Col>
              <ListSort
                dragClassName="list-drag-selected"
                className="sort-manage-list"
                key="list"
                dragElement={<div className="sort-manage-icon"><Icon type="bars" /></div>}
                onChange={(e) => {
                  this.onListChange(e, ids, currentEditTemplateData);
                }}
              >
                {childrenToRender}
              </ListSort>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col>
              <a
                onClick={() => {
                  this.onAdd(ids, currentEditTemplateData);
                }}
                className="add-button"
              >
                <Icon type="plus" />
              </a>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    );
  }
}
