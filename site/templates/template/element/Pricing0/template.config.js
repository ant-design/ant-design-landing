import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper pricing0-wrapper',

    },
    OverPack: {
      playScale: 0.3,
      className: 'home-page pricing0',
    },
    imgWrapper: {
      className: 'pricing0-img-wrapper',
      md: 12,
      xs: 24,
    },
    img: {
      className: 'pricing0-img',
      name: 'image',
      children: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*OnyWT4Nsxy0AAAAAAAAAAABjARQnAQ',
    },
    childWrapper: {
      className: 'pricing0-text-wrapper',
      md: 12,
      xs: 24,
      children: [
        {
          name: 'title',
          children: 'OceanBase 服务器',
          className: 'pricing0-title',
        },
        {
          name: 'content',
          children: `云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。<br/>
500-5Gbps，10 GB-50TB（含），1TB流量包，国内按峰值。
`,
          className: 'pricing0-content',
        },
        {
          name: 'pricing',
          children: '¥2,200',
          className: 'pricing0-pricing',
        },
        {
          name: 'button',
          children: {
            icon: 'shopping-cart',
            href: '#',
            type: 'primary',
            children: '立即购买',
          },
        },
      ],
    },
  },
};
