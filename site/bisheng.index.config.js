const commonConfig = require('./bisheng.common.config');

module.exports = { port: 7111,
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
      编辑器教程: 2,
      使用教程: 3,
      实践案例: 4,
      设计资源: 5,
      Introduce: 0,
      Guide: 1,
      'Edit-help': 2,
      Tutorial: 3,
    },
  },
  ...commonConfig };
