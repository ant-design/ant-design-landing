import React from 'react';
import { Tooltip, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { objectEqual } from '../../../../utils';
import { getHistory, getCurrentData } from '../../../../shared/localStorage';
import * as actions from '../../../../shared/redux/actions';
import emitter from '../../../../shared/emitter';

class HistoryButton extends React.Component {
  getCurrentDataIndex = (data) => {
    return data.findIndex((item) => {
      return objectEqual(item, getCurrentData());
    });
  }

  onHistoryClick = (num, e) => {
    if (e) {
      e.target.focus();
    }

    const history = getHistory();
    const current = this.getCurrentDataIndex(history);
    if ((!current && num === -1) || (current >= history.length - 1 && num === 1)) {
      return;
    }
    const currentData = history[current + num];

    const { dispatch } = this.props;

    dispatch(actions.setTemplateData({
      data: currentData.attributes,
      uid: currentData.id,
      date: currentData.date,
      noHistory: 'handle',
    }));

    emitter.emit('edit-stage-reset-rect');
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
    const history = getHistory();
    const undoBool = history.length > 1 && this.getCurrentDataIndex(history) > 0;
    const undoClassName = classnames('undo', {
      disabled: !undoBool,
    });
    const redoBool = history.length > 1 && history.length - 1 - this.getCurrentDataIndex(history) > 0;
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

export default connect()(HistoryButton);
