import point from '!raw-loader!./Point.jsx';
import index from '!raw-loader!../../../../index.text';
import documentation from '!raw-loader!../../../../documentation.md';

export default {
  index,
  documentation,
  point: point.replace('../static/point.less', './less/point.less'),
};
