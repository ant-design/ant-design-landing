const component = require('./index');
const templateStr = require('!raw-loader!./index');
const less = require('raw-loader!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    OverPack: {
      replay: true,
      playScale: [0.3, 1],
      className: 'banner2',
    },
    BannerAnim: {
      children: [
        {
          name: 'elem0',
          BannerElement: {
            className: 'banner-user-elem',
          },
          textWrapper: {
            className: 'banner2-text-wrapper',
          },
          bg: {
            className: 'bg bg0',
          },
          title: {
            className: 'banner2-title',
            children: 'Ant Motion',
          },
          content: {
            className: 'banner2-content',
            children: '一个高效的页面动画解决方案',
          },
          button: {
            className: 'banner2-button',
            children: 'Learn More',
          },
        },
      ],
    },
  },
};
