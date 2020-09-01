import React from 'react';
import { Tooltip } from 'antd';
import {
  RollbackOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../../shared/utils';
import * as actions from '../../../../shared/redux/actions';

class HistoryButton extends React.Component {
  currentHistory = 0;

  onHistoryClick = (num, e) => {
    if (e) {
      e.target.focus();
    }
    const { currentEditData, dispatch, historyEdit: { num: historyNum, history } } = this.props;
    const { reRect } = currentEditData || {};
    let currentHistory = historyNum;
    currentHistory -= num;
    if ((!currentHistory && num === -1) || (currentHistory >= history.length - 1 && num === 1)) {
      return;
    }
    const currentData = history[currentHistory];
    if (!currentData) {
      return;
    }
    dispatch(actions.setCurrentHistoryNum(currentHistory));
    dispatch(actions.setTemplateData({
      data: currentData.attributes,
      uid: currentData.id,
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
    const { historyEdit: { num: currentHistory, history } } = this.props;

    const undoClassName = classnames('undo', {
      disabled: currentHistory >= history.length - 1,
    });
    const redoClassName = classnames('redo', {
      disabled: !currentHistory,
    });
    return (
      <ul className="history-button-wrapper">
        <li className={undoClassName}>
          <Tooltip title={<FormattedMessage id="app.header.undo" />}>
            <a onClick={(e) => { this.onHistoryClick(-1, e); }}><RollbackOutlined /></a>
          </Tooltip>
        </li>
        <li className={redoClassName}>
          <Tooltip title={<FormattedMessage id="app.header.redo" />}>
            <a onClick={(e) => { this.onHistoryClick(1, e); }}><RollbackOutlined /></a>
          </Tooltip>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps)(HistoryButton);
