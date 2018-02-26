const commonConfig = require('./bisheng.common.config');

module.exports = Object.assign({
  port: 7111,
  root: '/',
  source: {
    docs: './docs',
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    root: '/',
    categoryOrder: {
      介绍: 0,
      样式规范: 1,
      响应式规范: 2,
      Introduce: 0,
      'Style Spec': 1,
      Response: 2,
    },
  },
}, commonConfig);
