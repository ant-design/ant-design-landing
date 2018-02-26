const index = require('!raw!./index.text');

let point = require('!raw!./Point.jsx');

point = point.replace('../static/point.less', './less/point.less');

const documentation = require('!raw!./documentation.md');

export default {
  index,
  documentation,
  point,
};
