import React from 'react';
import { Button, Input, Icon, Popover, Row, Col, Switch } from 'antd';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import { connect } from 'react-redux';
import ListSort from '../StateComponents/ListSort';
import { getState, mergeEditDataToDefault, deepCopy } from '../../../../utils';
import tempData from '../../../../templates/template/element/template.config';
import { getDataSourceValue, setDataSourceValue } from '../../utils';
import { setTemplateData } from '../../../../edit-module/actions';

class MenuEditView extends React.PureComponent {
  onAdd = (ids, currentData) => {
    const newData = deepCopy(currentData.children[currentData.children.length - 1]);
    delete newData.delete;
    newData.name = `${newData.name.split('~')[0].replace(/[0-9]/ig, '')}~${getRandomKey()}`;
    currentData.children.push(newData);
    this.onChildChange(ids, currentData);
  }

  onSlideDelete = (e, ids, currentData) => {
    /*  const children = currentData.children;
    const i = children.indexOf(e);
    children.splice(i, 1); */
    currentData.children = currentData.children
      .map(node => (node === e ? { ...node, delete: true } : node));
    this.onChildChange(ids, currentData);
  }

  onValueChange = (e, i, key, ids, currentData) => {
    currentData.children[i].children[key] = e;
    this.onChildChange(ids, currentData);
  }
  onListChange = (e, ids, currentData) => {
    currentData.children = e.map((item) => {
      return currentData.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    this.onChildChange(ids, currentData);
  }
  onChildChange = (ids, currentData) => {
    const { dispatch, templateData } = this.props;
    const newTemplateData = deepCopy(templateData);
    setDataSourceValue(ids, 'children', currentData.children, newTemplateData.data.config, tempData);
    dispatch(setTemplateData(newTemplateData));
  }
  render() {
    const { currentEditData, templateData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const tempDataSource = tempData[cid];
    const newTempDataSource = mergeEditDataToDefault(templateData.data.config[ids[0]],
      tempDataSource);
    const currentEditTemplateData = getDataSourceValue('menu', newTempDataSource);
    if (!currentEditTemplateData.children) {
      return null;
    }
    const childrenToRender = currentEditTemplateData.children.filter(c => c && !c.delete).map((item, i) => {
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">
            <Input
              defaultValue={item.children.name}
              onChange={(e) => {
                this.onValueChange(e.target.value, i, 'name', ids, currentEditTemplateData);
              }}
            />
          </div>
          <div className="sort-manage-delete">
            <Popover
              placement="bottomRight"
              title="修改链接地址"
              content={
                <div>
                  <Row>
                    <Col span={8}>
                      链接地址:
                    </Col>
                    <Col span={16}>
                      <Input
                        onChange={(e) => {
                          this.onValueChange(e.target.value, i, 'link', ids, currentEditTemplateData);
                        }}
                        defaultValue={item.children.link}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 16 }}>
                    <Col span={8}>
                      弹出页面:
                    </Col>
                    <Col span={16}>
                      <Switch size="small"
                        onChange={(e) => {
                          this.onValueChange(e, i, 'blank', ids, currentEditTemplateData);
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              }
              trigger="click"
            >
              <Button
                size="small"
                shape="circle"
                icon="link"
              />
            </Popover>
          </div>
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
      <div >
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
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button
            onClick={() => {
              this.onAdd(ids, currentEditTemplateData);
            }}
            icon="plus"
            type="primary"
          >
            添加
          </Button>
        </div>
      </div>);
  }
}

export default connect(getState)(MenuEditView);
