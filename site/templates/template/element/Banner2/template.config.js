import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'banner2',
    },
    BannerAnim: {
      children: [
        {
          name: 'elem0',
          BannerElement: {
            className: 'banner-user-elem',
          },
          page: {
            className: 'home-page banner2-page',
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
