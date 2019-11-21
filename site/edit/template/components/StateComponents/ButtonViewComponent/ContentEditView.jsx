import React from 'react';
import { connect } from 'react-redux';

import { getIdsAndCurrentData } from '../../../utils';
import { mapStateToProps } from '../../../../../shared/utils';

import ContentEditViewItem from './ContentEditViewItem';

function ContentEditView({ currentEditData, templateData }) {
  const { currentEditTemplateData } = getIdsAndCurrentData(currentEditData, templateData, 'Content');
  if (!currentEditTemplateData.children) {
    return null;
  }

  return (
    <div>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        {Object.keys(currentEditTemplateData.children).map((key) => (<ContentEditViewItem key={key} id={key} />))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ContentEditView);
