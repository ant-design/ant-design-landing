import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

const AntCheckboxGroup = Checkbox.Group;

export default class CheckboxGroup extends React.PureComponent {
  onCheckAllChange = (e) => {
    const { children } = this.props;
    const checked = e.target.checked;
    this.props.onChange(checked ? children.map((item) => item.key) : []);
  }

  render() {
    const { children, value } = this.props;
    const checkAll = value.length === children.length;
    const indeterminate = !!value.length && (value.length < children.length);
    return (
      <div>
        <div>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={this.onCheckAllChange}
          >
            <FormattedMessage id="app.common.all" />
          </Checkbox>
        </div>
        <div>
          <AntCheckboxGroup value={value} onChange={this.props.onChange}>
            <Row>
              {children.map((item) => (
                <Col key={item.key} span={12}><Checkbox value={item.key}>{item.name}</Checkbox></Col>
              ))}
            </Row>
          </AntCheckboxGroup>
        </div>
      </div>
    );
  }
}
