import React from 'react';
import { Tabs, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { getState } from '../utils';
import EditorComp from './ListComponents/EditorComp';
import EditorOther from './ListComponents/EditorOther';

const TabPane = Tabs.TabPane;

class EditListController extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: '1',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentEditData !== this.props.currentEditData
      && this.state.show !== '1') {
      this.setState({
        show: '1',
      });
    }
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
          tab={
            <Tooltip title="编辑样式">
              <Icon type="edit" />
            </Tooltip>
          }
          className="edit-list-tab"
        >
          <div className="tab-scroll">
            <EditorComp {...this.props} />
          </div>
        </TabPane>
        {/* <TabPane
          key="2"
          tab={
            <Tooltip title="全局样式">
              <Icon type="bars" />
            </Tooltip>
          }
          className="edit-list-tab"
        >
          1
        </TabPane> */}
        <TabPane
          key="3"
          tab={
            <Tooltip title="其它功能">
              <Icon type="appstore-o" />
            </Tooltip>
          }
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

export default connect(getState)(EditListController);
