/* eslint-disable */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col, Button } from 'antd';
// import * as utils from '../utils';

class Footer extends React.Component {
  render() {
    console.log(this.props);
    return (
      <footer id="footer" className="dark">
        footer
      </footer>
    );
  }
}

export default injectIntl(Footer);
