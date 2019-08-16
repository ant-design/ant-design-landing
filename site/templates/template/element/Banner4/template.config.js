import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper banner4',
    },
    page: {
      className: 'home-page banner4-page',
    },
    childWrapper: {
      className: 'banner4-title-wrapper',
      children: [
        {
          name: 'title',
          children: 'Ant Design Pro',
          className: 'banner4-title',
        },
        {
          name: 'content',
          className: 'banner4-content',
          children: '开箱即用的中台前端/设计解决方案',
        },
        {
          name: 'button',
          children: {
            href: '#',
            type: 'primary',
            children: '开始使用',
          },
        },
      ],
    },
    image: {
      className: 'banner4-image',
      children: 'https://gw.alipayobjects.com/mdn/rms/afts/img/A*k3InRLiZDk4AAAAAAAAAAABjARQnAQ',
    },
  },
};
