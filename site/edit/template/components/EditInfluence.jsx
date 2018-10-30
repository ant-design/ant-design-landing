import React from 'react';
import { Select, Icon } from 'antd';
import { setCurrentMediaData } from '../../../edit-module/actions';

const Option = Select.Option;

class EditInfluence extends React.Component {
  onChange = (v) => {
    const { dispatch } = this.props;
    dispatch(setCurrentMediaData(v));
  }

  render() {
    const { mediaStateSelect } = this.props;
    return (
      <div className="edit-influence">
        <div className={mediaStateSelect}>
          <Select defaultValue={mediaStateSelect} size="small" onChange={this.onChange}>
            <Option value="Desktop">
              <Icon type="laptop" style={{ fontSize: '12px' }} />
              <span style={{ marginLeft: 4 }}>
                Desktop
              </span>
            </Option>
            <Option value="Mobile">
              <Icon type="mobile" style={{ fontSize: '12px' }} />
              <span style={{ marginLeft: 4 }}>
                Mobile
              </span>
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default EditInfluence;
