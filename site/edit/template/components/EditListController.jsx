import React from 'react';
import { Tabs, Icon, Tooltip } from 'antd';

const TabPane = Tabs.TabPane;

class EditListController extends React.PureComponent {
  render() {
    return (
      <Tabs className="edit-list-wrapper">
        <TabPane
          key="1"
          tab={
            <Tooltip title="编辑样式">
              <Icon type="edit" />
            </Tooltip>
          }
        >
          1
        </TabPane>
        <TabPane
          key="2"
          tab={
            <Tooltip title="全局样式">
              <Icon type="bars" />
            </Tooltip>
          }
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
        >
          3
        </TabPane>
      </Tabs>
    );
  }
}

export default EditListController;
