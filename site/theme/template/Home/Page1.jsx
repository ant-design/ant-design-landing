/* eslint-disable */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Templates from './component/Templates';

export default class Page1 extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1><FormattedMessage id="app.home.templates" /></h1>
        <div className="bg" />
        <Templates />
      </div>);
  }
}
