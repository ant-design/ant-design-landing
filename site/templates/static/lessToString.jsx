/* eslin import/no-webpack-loader-syntax:[0] */
const point = require('!raw-loader!./point.less');
const common = require('!raw-loader!./common.less');

const custom = require('!raw-loader!./custom.less');
const content = require('!raw-loader!./content.less');

export default {
  common,
  custom,
  point,
  content,
};
