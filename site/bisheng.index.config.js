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
      类型: 1,
      布局: 2,
      如何使用: 3,
      实践案例: 4,
      设计资源: 5,
      Introduce: 0,
      Type: 1,
      Layout: 2,
      'getting-started': 3,
    },
  },
}, commonConfig);
