import React from 'react';
import { Select, Icon } from 'antd';
import { connect } from 'react-redux';
import { getState } from '../../../utils';
import { setCurrentMediaData } from '../../../edit-module/actions';

const Option = Select.Option;

class EditInfluence extends React.PureComponent {
  onChange = (v) => {
    console.log(v);
    const { dispatch } = this.props;
    dispatch(setCurrentMediaData(v));
  }
  render() {
    const { mediaStateSelect } = this.props;
    return (
      <div className="edit-influence" >
        <div className={mediaStateSelect}>
          <Select value={mediaStateSelect} size="small" onChange={this.onChange}>
            <Option value="Desktop"><Icon type="laptop" /> <span>Desktop</span></Option>
            <Option value="Mobile"><Icon type="mobile" /> <span>Mobile</span></Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default connect(getState)(EditInfluence);

