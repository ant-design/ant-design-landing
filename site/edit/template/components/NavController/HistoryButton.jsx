import React from 'react';
import { Tooltip, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import { setTemplateData } from '../../../../edit-module/actions';
import { getRecord, getCurrentDataLocal } from '../../../../edit-module/record';
import { objectEqual } from '../../../../utils';

class HistoryButton extends React.Component {
  getCurrentDataIndex = (data) => {
    return data.findIndex((item) => {
      return objectEqual(item, getCurrentDataLocal());
    });
  }

  onHistoryClick = (num, e) => {
    if (e) {
      e.target.focus();
    }
    const record = getRecord();
    const current = this.getCurrentDataIndex(record);
    if ((!current && num === -1) || (current >= record.length - 1 && num === 1)) {
      return;
    }
    const currentData = record[current + num];
    const { reRect, dispatch } = this.props;
    dispatch(setTemplateData({
      data: currentData.attributes,
      uid: currentData.id,
      date: currentData.date,
      noHistory: 'handle',
    }));
    if (reRect) {
      reRect();
    }
  }

  onKeyDown = (e) => {
    const ctrKey = this.isMacOs ? e.metaKey : e.ctrKey;
    if (ctrKey) {
      if (e.keyCode === 90) {
        e.preventDefault();
        if (e.shiftKey) {
          this.onHistoryClick(1);
        } else {
          this.onHistoryClick(-1);
        }
        e.returnValue = false;
      }
    }
  }

  componentDidMount() {
    this.isMacOs = !!navigator.userAgent.match('Mac OS');
    document.body.addEventListener('keydown', this.onKeyDown);
  }

  render() {
    const record = getRecord();
    const undoBool = record.length > 1 && this.getCurrentDataIndex(record) > 0;
    const undoClassName = classnames('undo', {
      disabled: !undoBool,
    });
    const redoBool = record.length > 1 && record.length - 1 - this.getCurrentDataIndex(record) > 0;
    const redoClassName = classnames('redo', {
      disabled: !redoBool,
    });
    return (
      <ul className="history-button-wrapper">
        <li className={undoClassName}>
          <Tooltip title={<FormattedMessage id="app.header.undo" />}>
            <a onClick={(e) => { this.onHistoryClick(-1, e); }}><Icon type="rollback" /></a>
          </Tooltip>
        </li>
        <li className={redoClassName}>
          <Tooltip title={<FormattedMessage id="app.header.redo" />}>
            <a onClick={(e) => { this.onHistoryClick(1, e); }}><Icon type="rollback" /></a>
          </Tooltip>
        </li>
      </ul>
    );
  }
}

export default HistoryButton;
