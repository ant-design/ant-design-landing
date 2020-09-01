import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    OverPack: {
      className: 'home-page-wrapper content13-wrapper',
      playScale: 0.3,
    },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'image',
          children: 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
          className: 'title-image',
        },
        {
          name: 'title',
          children: '丰富的特色展台',
          className: 'title-h1',
        },
        {
          name: 'content',
          children: '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
          className: 'title-content',
        },
        {
          name: 'content2',
          children: '现场问诊，为你答疑解难',
          className: 'title-content',
        },
      ],
    },
  },
};
