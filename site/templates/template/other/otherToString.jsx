const index = require('raw-loader!../../../../index.text');

let point = require('raw-loader!./Point.jsx');

point = point.replace('../static/point.less', './less/point.less');

const documentation = require('raw-loader!../../../../documentation.md');

export default {
  index,
  documentation,
  point,
};
