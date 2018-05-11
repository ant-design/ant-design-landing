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
      设计指引: 1,
      如何使用: 2,
      实践案例: 3,
      设计资源: 4,
      Introduce: 0,
      Guide: 1,
      'getting-started': 2,
    },
  },
}, commonConfig);
