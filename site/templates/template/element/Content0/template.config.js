const component = require('./index');
const templateStr = require('!raw!./index');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    title: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
    content: '一个高效的页面动画解决方案',
    button: 'Learn More',
  },
  dataProps: {
    wrapper: {
      replay: true,
      playScale: [0.3, 0.1],
      className: 'banner0',
    },
    text: {
      className: 'banner0-wrapper',
    },
    title: {
      className: 'banner0-title',
    },
    content: {
      className: 'banner0-content',
    },
    button: {
      className: 'banner0-button',
    },
  },
};
