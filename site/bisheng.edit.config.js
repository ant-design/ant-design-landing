
const commonConfig = require('./bisheng.common.config');

module.exports = Object.assign({
  source: {},
  output: './_site/edit',
  root: '/edit/',
  entryName: 'edit',
  theme: './site/edit',
  htmlTemplate: './site/edit/static/index.html',
  port: 7112,
}, commonConfig);
