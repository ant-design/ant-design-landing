import React from 'react';
import { Button, Input, Popover, Row, Col } from 'antd';
import {
  ExclamationCircleOutlined,
  BarsOutlined,
  LinkOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { getRandomKey } from 'rc-editor-list/lib/utils';
import { connect } from 'react-redux';

import { deepCopy } from '../../../../../utils';
import { getIdsAndCurrentData } from '../../../utils';
import { mapStateToProps } from '../../../../../shared/utils';
import * as actions from '../../../../../shared/redux/actions';

import ListSort from '../ListSort';

class MenuEditView extends React.PureComponent {
  onAdd = (ids, currentData) => {
    const newData = deepCopy(currentData.children[currentData.children.length - 1]);
    delete newData.delete;
    newData.name = `${newData.name.split('~')[0].replace(/[0-9]/ig, '')}~${getRandomKey()}`;
    currentData.children.push(newData);

    const { dispatch, templateData } = this.props;
    dispatch(actions.changeChild({
      templateData,
      ids,
      currentData,
    }));
  }

  onSlideDelete = (e, ids, currentData) => {
    const children = currentData.children;
    const i = children.indexOf(e);
    children.splice(i, 1);
    currentData.children = children;
    /* currentData.children = currentData.children
      .map(node => (node === e ? { ...node, delete: true } : node)); */
    const { dispatch, templateData } = this.props;
    dispatch(actions.changeChild({
      templateData,
      ids,
      currentData,
    }));
  }

  onValueChange = (e, i, key, ids, currentData) => {
    currentData.children[i][key] = e;
    const { dispatch, templateData } = this.props;
    dispatch(actions.changeChild({
      templateData,
      ids,
      currentData,
    }));
  }

  onListChange = (e, ids, currentData) => {
    currentData.children = e.map((item) => {
      return currentData.children.filter((node) => {
        return node.name === item.key;
      })[0];
    });
    const { dispatch, templateData } = this.props;
    dispatch(actions.changeChild({
      templateData,
      ids,
      currentData,
    }));
  }

  render() {
    const { currentEditData, templateData } = this.props;
    const { ids, currentEditTemplateData } = getIdsAndCurrentData(currentEditData, templateData, 'LinkMenu');
    if (!currentEditTemplateData.children) {
      return null;
    }
    const templateIds = templateData.data.template;// .filter(key => !key.match(/Nav|Footer/ig));
    const childrenToRender = currentEditTemplateData.children.filter((c) => c && !c.delete).map((item, i) => {
      // 只给 link 使用
      return (
        <div key={item.name} className="sort-manage">
          <div className="sort-manage-name">
            <Input
              defaultValue={item.children}
              onChange={(e) => {
                this.onValueChange(e.target.value, i, 'children', ids, currentEditTemplateData);
              }}
            />
          </div>
          <div className="sort-manage-delete">
            <Popover
              placement="bottomRight"
              title={<FormattedMessage id="app.state.menu.edit.link.header" />}
              content={(
                <div>
                  <Row>
                    <Col span={8}>
                      <FormattedMessage id="app.state.link.url" />
                    </Col>
                    <Col span={16}>
                      <Input
                        onChange={(e) => {
                          this.onValueChange(e.target.value, i, 'to', ids, currentEditTemplateData);
                        }}
                        defaultValue={item.to}
                      />
                    </Col>
                  </Row>
                </div>
              )}
              trigger="click"
            >
              <Button
                size="small"
                shape="circle"
                icon={<LinkOutlined />}
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
              icon={<DeleteOutlined />}
              disabled={currentEditTemplateData.children.length === 1}
            />
          </div>
        </div>
      );
    });
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <ExclamationCircleOutlined />
          {' '}
          <FormattedMessage id="app.state.menu.type-link.remark" />
          <br />
          <FormattedMessage id="app.state.menu.type-link.current" />
          <br />
          {templateIds.join(', ')}
        </div>
        <ListSort
          dragClassName="list-drag-selected"
          className="sort-manage-list"
          key="list"
          dragElement={(
            <div className="sort-manage-icon">
              <BarsOutlined />
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
            icon={<PlusOutlined />}
            type="primary"
          >
            <FormattedMessage id="app.common.add" />
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuEditView);
