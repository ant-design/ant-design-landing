const component = require('./index');
const templateStr = require('!raw!./index');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      replay: true,
      playScale: [0.3, 0.1],
      className: 'banner0',
    },
    textWrapper: {
      className: 'banner0-text-wrapper',
    },
    title: {
      className: 'banner0-title',
      children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
    },
    content: {
      className: 'banner0-content',
      children: '一个高效的页面动画解决方案',
    },
    button: {
      className: 'banner0-button',
      children: 'Learn More',
    },
  },
};
