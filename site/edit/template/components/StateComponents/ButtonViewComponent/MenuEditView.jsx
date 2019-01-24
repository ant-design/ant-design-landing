import React from 'react';
import { Button, Input, Icon, Popover, Row, Col, Switch } from 'antd';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import { connect } from 'react-redux';
import ListSort from '../ListSort';
import { getState, deepCopy } from '../../../../../utils';
import { getIdsAndCurrentData, onChildChange } from './EditViewUtils';

class MenuEditView extends React.PureComponent {
  onAdd = (ids, currentData) => {
    const newData = deepCopy(currentData.children[currentData.children.length - 1]);
    delete newData.delete;
    newData.name = `${newData.name.split('~')[0].replace(/[0-9]/ig, '')}~${getRandomKey()}`;
    currentData.children.push(newData);
    onChildChange(this.props.dispatch, this.props.templateData, ids, currentData);
  }

  onSlideDelete = (e, ids, currentData) => {
    /*  const children = currentData.children;
    const i = children.indexOf(e);
    children.splice(i, 1); */
    currentData.children = currentData.children
      .map(node => (node === e ? { ...node, delete: true } : node));
    onChildChange(this.props.dispatch, this.props.templateData, ids, currentData);
  }

  onValueChange = (e, i, key, ids, currentData, isLink) => {
    if (isLink) {
      currentData.children[i][key] = e;
    } else {
      const c = e ? '_black' : '';
      currentData.children[i].a[key] = key === 'target' ? c : e;
    }
    onChildChange(this.props.dispatch, this.props.templateData, ids, currentData);
  }

  onListChange = (e, ids, currentData) => {
    currentData.children = e.map((item) => {
      return currentData.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    onChildChange(this.props.dispatch, this.props.templateData, ids, currentData);
  }

  render() {
    const { currentEditData, templateData } = this.props;
    const { ids, currentEditTemplateData } = getIdsAndCurrentData(currentEditData, templateData, 'Menu');
    if (!currentEditTemplateData.children) {
      return null;
    }
    const templateIds = templateData.data.template;// .filter(key => !key.match(/Nav|Footer/ig));
    let isLink;
    const childrenToRender = currentEditTemplateData.children.filter(c => c && !c.delete).map((item, i) => {
      isLink = !!item.to;
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">
            <Input
              defaultValue={isLink ? item.children : item.a.children}
              onChange={(e) => {
                this.onValueChange(e.target.value, i, 'children', ids, currentEditTemplateData, isLink);
              }}
            />
          </div>
          <div className="sort-manage-delete">
            <Popover
              placement="bottomRight"
              title="修改链接地址"
              content={(
                <div>
                  <Row>
                    <Col span={8}>
                      链接地址:
                    </Col>
                    <Col span={16}>
                      <Input
                        onChange={(e) => {
                          this.onValueChange(e.target.value, i, isLink ? 'to' : 'href', ids, currentEditTemplateData, isLink);
                        }}
                        defaultValue={isLink ? item.to : item.a.href}
                      />
                    </Col>
                  </Row>
                  {!isLink && (
                    <Row style={{ marginTop: 16 }}>
                      <Col span={8}>
                        弹出页面:
                      </Col>
                      <Col span={16}>
                        <Switch size="small"
                          checked={!!item.a.target}
                          onChange={(e) => {
                            this.onValueChange(e, i, 'target', ids, currentEditTemplateData);
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              )}
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
      <div>
        {isLink && (
          <div style={{ marginBottom: 16 }}>
            <Icon type="exclamation-circle" theme="outlined" />
            {' '}
            此导航为 Link 导航, 链接里请填写以下 id 名称；
            <br />
            当前页面所有 ID：
            <br />
            {templateIds.join(', ')}
          </div>
        )}
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
      </div>
    );
  }
}

export default connect(getState)(MenuEditView);
