

const component = require('./index');
const templateStr = require('!raw!./index');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  defaultData: {
    name: 'elem0',
    elem: {
      className: 'banner-user-elem',
    },
    textWrapper: {
      className: 'banner1-text-wrapper',
    },
    bg: {
      className: 'bg bg0',
    },
    title: {
      className: 'banner1-title',
      children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
    },
    content: {
      className: 'banner1-content',
      children: '一个高效的页面动画解决方案',
    },
    button: {
      className: 'banner1-button',
      children: 'Learn More',
    },
  },
  dataSource: {
    wrapper: {
      replay: true,
      playScale: [0.3, 0.5],
      className: 'banner1',
    },
    bannerAnim: {
      props: {},
      children: [
        {
          name: 'elem0',
          elem: {
            className: 'banner-user-elem',
          },
          textWrapper: {
            className: 'banner1-text-wrapper',
          },
          bg: {
            className: 'bg bg0',
          },
          title: {
            className: 'banner1-title',
            children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
          },
          content: {
            className: 'banner1-content',
            children: '一个高效的页面动画解决方案',
          },
          button: {
            className: 'banner1-button',
            children: 'Learn More',
          },
        },
        {
          name: 'elem1',
          elem: {
            className: 'banner-user-elem',
          },
          textWrapper: {
            className: 'banner1-text-wrapper',
          },
          bg: {
            className: 'bg bg1',
          },
          title: {
            className: 'banner1-title',
            children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
          },
          content: {
            className: 'banner1-content',
            children: '一个高效的页面动画解决方案',
          },
          button: {
            className: 'banner1-button',
            children: 'Learn More',
          },
        },
      ],
    },
  },
};
