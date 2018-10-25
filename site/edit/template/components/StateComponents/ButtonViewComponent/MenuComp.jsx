import React from 'react';
import { Icon, Button, Modal } from 'antd';
import MenuEditView from './MenuEditView';

export default class ImageComp extends React.Component {
  state = {
    editMenuShow: false,
  }

  switchEditMenuFunc = () => {
    this.setState({
      editMenuShow: !this.state.editMenuShow,
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Button type="primary" size="small" onClick={this.switchEditMenuFunc}>
          <Icon type="bars" />
        </Button>
        <Modal
          title="编辑导航"
          visible={this.state.editMenuShow}
          onCancel={this.switchEditMenuFunc}
          footer={null}
          width={400}
        >
          <MenuEditView {...this.props} />
        </Modal>
      </div>
    );
  }
}
