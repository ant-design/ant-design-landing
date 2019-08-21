import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper banner5',
    },
    page: {
      className: 'home-page banner5-page',
    },
    childWrapper: {
      className: 'banner5-title-wrapper',
      children: [
        {
          name: 'title',
          children: '产品名',
          className: 'banner5-title',
        },
        {
          name: 'explain',
          className: 'banner5-explain',
          children: '产品标语介绍',
        },
        {
          name: 'content',
          className: 'banner5-content',
          children: '产品的详细说明，如是什么东西之类的文字',
        },
        {
          name: 'button',
          className: 'banner5-button-wrapper',
          children: {
            href: '#',
            className: 'banner5-button',
            type: 'primary',
            children: '开始使用',
          },
        },
      ],
    },
    image: {
      className: 'banner5-image',
      children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ',
    },
  },
};
