import React from 'react';
import { Button, Modal } from 'antd';

export default class ContentWrapper extends React.Component {
  state = {
    editContentShow: false,
  };

  render() {
    return (
      <Button type="primary" size="small" onClick={this.onOpenModal}>
        CW
        <Modal
          title="编辑内容区块"
          visible={this.state.editContentShow}
          onCancel={this.onOpenModal}
          footer={null}
          width={400}
        />
      </Button>
    );
  }
}
