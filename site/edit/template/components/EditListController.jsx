import React from 'react';
import { Tabs, Tooltip } from 'antd';
import { EditOutlined, AppstoreOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { polyfill } from 'react-lifecycles-compat';
import EditorComp from './ListComponents/EditorComp';
import EditorOther from './ListComponents/EditorOther';

const TabPane = Tabs.TabPane;

class EditListController extends React.PureComponent {
  static getDerivedStateFromProps(props, { prevProps, show }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps
      && props.currentEditData !== prevProps.currentEditData && show !== '1') {
      nextState.show = '1';
    }
    return nextState; // eslint-disable-line
  }

  constructor(props) {
    super(props);
    this.state = {
      show: '1',
    };
  }

  onChange = (key) => {
    this.setState({
      show: key,
    });
  }

  render() {
    return (
      <Tabs
        className="edit-list-tabs"
        activeKey={this.state.show}
        onChange={this.onChange}
      >
        <TabPane
          key="1"
          tab={(
            <Tooltip title={<FormattedMessage id="app.header.edit" />}>
              <EditOutlined />
            </Tooltip>
          )}
          className="edit-list-tab"
        >
          <div className="tab-scroll">
            <EditorComp {...this.props} />
          </div>
        </TabPane>
        {/* <TabPane
          key="2"
          tab={(
            <Tooltip title="通用样式">
              <FormOutlined/ >
            </Tooltip>
          )}
          className="edit-list-tab"
        >
          1
        </TabPane> */}
        <TabPane
          key="3"
          tab={(
            <Tooltip title={<FormattedMessage id="app.header.other" />}>
              <AppstoreOutlined />
            </Tooltip>
          )}
          className="edit-list-tab"
        >
          <div className="tab-scroll">
            <EditorOther {...this.props} />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default polyfill(EditListController);
