import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

const getBlock = (data) => ({
  name: data.name,
  className: 'block',
  md: 8,
  xs: 24,
  children: {
    wrapper: {
      className: 'block-content',
    },
    img: {
      children: data.img,
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content12-wrapper',
    },
    page: {
      className: 'home-page content12',
    },
    OverPack: {
      playScale: 0.3,
      className: '',
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
          children: '特别鸣谢',
          className: 'title-h1',
        },
      ],
    },
    block: {
      className: 'img-wrapper',
      children: [
        getBlock(
          {
            name: 'block0',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/TFicUVisNHTOEeMYXuQF.svg',
          }
        ),
        getBlock(
          {
            name: 'block1',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/hkLGkrlCEkGZeMQlnEkD.svg',
          }
        ),
        getBlock(
          {
            name: 'block2',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/bqyPRSZmhvrsfJrBvASi.svg',
          }
        ),
        getBlock(
          {
            name: 'block3',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/UcsyszzOabdCYDkoPPnM.svg',
          }
        ),
        getBlock(
          {
            name: 'block4',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/kRBeaICGexAmVjqBEqgw.svg',
          }
        ),
        getBlock(
          {
            name: 'block5',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/ftBIiyJcCHpHEioRvPsV.svg',
          }
        ),
      ],
    },
  },
};
