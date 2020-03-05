import React from 'react';
import { Button, Modal } from 'antd';
import {
  FormOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
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
          <FormOutlined />
        </Button>
        <Modal
          title={<FormattedMessage id="app.common.edit.content" />}
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
