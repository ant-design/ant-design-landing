import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper teams0-wrapper',
    },
    OverPack: {
      playScale: 0.3,
      className: 'home-page teams0',
    },
    BannerAnim: {
      className: 'banner-anim',
      children: [
        {
          name: 'elem0',
          className: 'teams0-banner-user-elem',
          titleWrapper: {
            className: 'teams0-content-wrapper',
            children: [
              {
                name: 'image',
                children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ',
                className: 'teams0-image',
              },
              {
                name: 'content',
                children: 'SEE = Seeking Experience & Engineering，意为探索用户体验与工程实践，由蚂蚁金服集团每年举办 1-2 次，包括专业分享、产品展台、Workshop 等内容。',
                className: 'teams0-content',
              },
              {
                name: 'title',
                children: '韩勇',
                className: 'teams0-h1',
              },
              {
                name: 'content2',
                children: '公司+职位 信息暂缺',
                className: 'teams0-content',
              },
            ],
          },
        },
        {
          name: 'elem1',
          className: 'teams0-banner-user-elem',
          titleWrapper: {
            className: 'teams0-content-wrapper',
            children: [
              {
                name: 'image',
                children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ',
                className: 'teams0-image',
              },
              {
                name: 'content',
                children: 'SEE = Seeking Experience & Engineering，意为探索用户体验与工程实践，由蚂蚁金服集团每年举办 1-2 次，包括专业分享、产品展台、Workshop 等内容。',
                className: 'teams0-content',
              },
              {
                name: 'title',
                children: '叶秀英',
                className: 'teams0-h1',
              },
              {
                name: 'content2',
                children: '公司+职位 信息暂缺',
                className: 'teams0-content',
              },
            ],
          },
        },
      ],
    },
  },
};
