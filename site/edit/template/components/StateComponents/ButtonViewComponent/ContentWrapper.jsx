import React from 'react';
import { Button, Modal, Icon } from 'antd';
import ContentEditView from './ContentEditView';

export default class ContentWrapper extends React.Component {
  state = {
    editContentShow: false,
  };

  onOpenModal = () => {
    this.setState({
      editContentShow: !this.state.editContentShow,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" size="small" onClick={this.onOpenModal}>
          <Icon type="form" theme="outlined" />
        </Button>
        <Modal
          title="编辑内容"
          visible={this.state.editContentShow}
          onCancel={this.onOpenModal}
          footer={null}
          width={400}
        >
          <ContentEditView {...this.props} />
        </Modal>
      </div>
    );
  }
}
