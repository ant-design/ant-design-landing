

const component = require('./index');
const templateStr = require('!raw-loader!./index');
const less = require('!raw-loader!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    OverPack: {
      replay: true,
      playScale: [0.3, 0.5],
      className: 'banner1',
    },
    BannerAnim: {
      children: [
        {
          name: 'elem0',
          BannerElement: {
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
          BannerElement: {
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
        {
          name: 'elem2',
          BannerElement: {
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
