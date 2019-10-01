import React from 'react';
import { Input, Row, Col } from 'antd';
import { connect } from 'react-redux';

import { getIdsAndCurrentData } from '../../../utils';
import { mapStateToProps } from '../../../../../shared/utils';
import * as actions from '../../../../../shared/redux/actions';

function ContentEditViewItem({ id, currentEditData, templateData, dispatch }) {
  const { ids, currentEditTemplateData } = getIdsAndCurrentData(currentEditData, templateData, 'Content');

  const item = currentEditTemplateData.children[id];

  const onBlur = React.useCallback((e) => {
    currentEditTemplateData.children[id].children = e.target.value;
    dispatch(actions.changeChild({ templateData, currentData: currentEditTemplateData, ids }));
  }, [dispatch, templateData, ids, currentEditTemplateData, id]);

  return (
    <Row style={{ marginBottom: 16, textAlign: 'right' }}>
      <Col span={6} style={{ paddingRight: 8, lineHeight: '32px' }}>{item.name}</Col>
      <Col span={18}>
        <Input
          defaultValue={item.children}
          onBlur={onBlur}
        />
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps)(ContentEditViewItem);
