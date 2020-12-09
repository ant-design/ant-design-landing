import React from 'react';
import { Input, InputNumber } from 'antd';

const AntInputGroup = Input.Group;

export default class InputGroup extends React.PureComponent {
  onInputChange = (v, key) => {
    const { value } = this.props;
    const i = key === 'start' ? 0 : 1;
    const newValue = Array.isArray(value) ? value : [value, value];
    newValue[i] = v;
    this.props.onChange(newValue);
  }

  render() {
    const { value } = this.props;
    const newValue = Array.isArray(value) ? value : [value, value];
    return (
      <div>
        <AntInputGroup compact>
          <InputNumber
            {...this.props}
            size="small"
            value={newValue[0]}
            style={{ width: '50%' }}
            onChange={(v) => { this.onInputChange(v, 'start'); }}
          />
          <InputNumber
            {...this.props}
            size="small"
            value={newValue[1] || newValue[0]}
            style={{ width: '50%' }}
            onChange={(v) => { this.onInputChange(v, 'end'); }}
          />
        </AntInputGroup>
      </div>
    );
  }
}
