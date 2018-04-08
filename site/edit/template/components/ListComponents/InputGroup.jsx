import React from 'react';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';

const AntInputGroup = Input.Group;

export default class InputGroup extends React.PureComponent {
  onInputChange = (v, key) => {
    const { value } = this.props;
    const i = key === 'start' ? 0 : 1;
    value[i] = v;
    this.props.onChange(value);
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <AntInputGroup compact>
          <InputNumber
            {...this.props}
            size="small"
            value={value[0]}
            style={{ width: '50%' }}
            onChange={(v) => { this.onInputChange(v, 'start'); }}
          />
          <InputNumber
            {...this.props}
            size="small"
            value={value[1]}
            style={{ width: '50%' }}
            onChange={(v) => { this.onInputChange(v, 'end'); }}
          />
        </AntInputGroup>
      </div>
    );
  }
}
