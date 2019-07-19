import React from 'react';
import { Input, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { getState } from '../../../../../utils';

import { getIdsAndCurrentData, onChildChange } from './EditViewUtils';


class ContentEditView extends React.PureComponent {
  render() {
    const { currentEditData, templateData } = this.props;
    const { ids, currentEditTemplateData } = getIdsAndCurrentData(currentEditData, templateData, 'Content');
    if (!currentEditTemplateData.children) {
      return null;
    }
    const children = Object.keys(currentEditTemplateData.children).map((key) => {
      const item = currentEditTemplateData.children[key];
      return (
        <Row style={{ marginBottom: 16, textAlign: 'right' }} key={key}>
          <Col span={6} style={{ paddingRight: 8, lineHeight: '32px' }}>{item.name}</Col>
          <Col span={18}>
            <Input
              defaultValue={item.children}
              onBlur={(e) => {
                currentEditTemplateData.children[key].children = e.target.value;
                onChildChange(this.props.dispatch, this.props.templateData, ids, currentEditTemplateData);
              }}
            />
          </Col>
        </Row>
      );
    });
    return (
      <div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(getState)(ContentEditView);
