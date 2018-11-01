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
      编辑器教程: 2,
      下载使用: 3,
      实践案例: 4,
      设计资源: 5,
      Introduce: 0,
      Guide: 1,
      'edit-help': 2,
      'download-use': 3,
    },
  },
}, commonConfig);
