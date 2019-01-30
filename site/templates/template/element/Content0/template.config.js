
import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content0-wrapper',
    },
    page: {
      className: 'home-page content0',
    },
    OverPack: {
      playScale: 0.3,
      className: '',
    },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: '产品与服务',
        },
      ],
    },
    block: {
      className: 'block-wrapper',
      children: [
        {
          name: 'block0',
          className: 'block',
          md: 8,
          xs: 24,
          children: {
            icon: {
              className: 'icon',
              children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
            },
            title: {
              className: 'content0-title',
              children: '一站式业务接入',
            },
            content: {
              children: '支付、结算、核算接入产品效率翻四倍',
            },
          },
        },
        {
          name: 'block1',
          className: 'block',
          md: 8,
          xs: 24,
          children: {
            icon: {
              className: 'icon',
              children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
            },
            title: {
              className: 'content0-title',
              children: '一站式事中风险监控',
            },
            content: {
              children: '在所有需求配置环节事前风险控制和质量控制能力',
            },
          },
        },
        {
          name: 'block2',
          className: 'block',
          md: 8,
          xs: 24,
          children: {
            icon: {
              className: 'icon',
              children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
            },
            title: {
              className: 'content0-title',
              children: '一站式数据运营',
            },
            content: {
              children: '沉淀产品接入效率和运营小二工作效率数据',
            },
          },
        },
      ],
    },
  },
};
