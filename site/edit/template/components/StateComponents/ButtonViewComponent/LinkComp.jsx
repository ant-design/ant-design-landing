import React from 'react';
import { Icon, Button, Popover, Input, Row, Col, Switch } from 'antd';

export default class LinkComp extends React.Component {
  onValueChange = (v, key) => {
    const { editData } = this.props;
    const c = v ? '_black' : '';
    editData[key] = key === 'target' ? c : v;
    this.props.setTemplateConfigObject(editData);
  }

  render() {
    const { editData } = this.props;
    return (
      <Popover
        placement="bottomRight"
        title="粘贴图片地址"
        content={(
          <div>
            <Row>
              <Col span={8}>
                链接地址:
              </Col>
              <Col span={16}>
                <Input
                  onChange={(e) => {
                    this.onValueChange(e.target.value, 'href');
                  }}
                  defaultValue={editData.href}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={8}>
                弹出页面:
              </Col>
              <Col span={16}>
                <Switch size="small"
                  checked={!!editData.target}
                  onChange={(e) => {
                    this.onValueChange(e, 'target');
                  }}
                />
              </Col>
            </Row>
          </div>
        )}
        trigger="click"
      >
        <Button type="primary" size="small" onClick={this.props.closeEditText}>
          <Icon type="link" theme="outlined" />
        </Button>
      </Popover>
    );
  }
}
