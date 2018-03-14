import React from 'react';
import { Tabs, Icon, Tooltip } from 'antd';
import EditorComp from './ListComponents/EditorComp';

const TabPane = Tabs.TabPane;

class EditListController extends React.PureComponent {
  render() {
    return (
      <Tabs className="edit-list-tabs">
        <TabPane
          key="1"
          tab={
            <Tooltip title="编辑样式">
              <Icon type="edit" />
            </Tooltip>
          }
          className="edit-list-tab"
        >
          <EditorComp />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <Tooltip title="全局样式">
              <Icon type="bars" />
            </Tooltip>
          }
          className="edit-list-tab"
        >
          1
        </TabPane>
        <TabPane
          key="3"
          tab={
            <Tooltip title="其它功能">
              <Icon type="appstore-o" />
            </Tooltip>
          }
          className="edit-list-tab"
        >
          3
        </TabPane>
      </Tabs>
    );
  }
}

export default EditListController;
