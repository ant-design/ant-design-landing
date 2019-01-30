import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content1-wrapper',
    },
    OverPack: {
      className: 'home-page content1',
      playScale: 0.3,
    },
    imgWrapper: {
      className: 'content1-img',
      md: 10,
      xs: 24,
    },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png',
    },
    textWrapper: {
      className: 'content1-text',
      md: 14,
      xs: 24,
    },
    title: {
      className: 'content1-title',
      children: '企业资源管理',
    },
    content: {
      className: 'content1-content',
      children: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。'
        + '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。'
        + '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
    },
  },
};
