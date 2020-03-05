import React from 'react';
import { Select } from 'antd';
import { LaptopOutlined, MobileOutlined } from '@ant-design/icons';
import * as actions from '../../../shared/redux/actions';

const Option = Select.Option;

class EditInfluence extends React.Component {
  onChange = (v) => {
    const { dispatch } = this.props;
    dispatch(actions.setCurrentMediaData(v));
  }

  render() {
    const { mediaStateSelect } = this.props;
    return (
      <div className="edit-influence">
        <div className={mediaStateSelect}>
          <Select defaultValue={mediaStateSelect} size="small" onChange={this.onChange}>
            <Option value="Desktop">
              <LaptopOutlined style={{ fontSize: '12px' }} />
              <span style={{ marginLeft: 4 }}>
                Desktop
              </span>
            </Option>
            <Option value="Mobile">
              <MobileOutlined style={{ fontSize: '12px' }} />
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
