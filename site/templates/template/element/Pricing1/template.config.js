import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

const getBlock = (name, children = {}) => ({
  name,
  className: 'pricing1-block',
  md: 8,
  xs: 24,
  children: {
    wrapper: {
      className: `pricing1-block-box ${children.wrapperClass || ''}`,
    },
    topWrapper: {
      className: 'pricing1-top-wrapper',
    },
    name: {
      className: 'pricing1-name',
      children: children.name,
    },
    money: {
      className: 'pricing1-money',
      children: children.money,
    },
    content: {
      className: 'pricing1-content',
      children: children.content,
    },
    line: {
      className: 'pricing1-line',
    },
    buttonWrapper: {
      className: 'pricing1-button-wrapper',
      children: {
        a: {
          className: 'pricing1-button',
          href: '#',
          children: children.button,
        },
      },
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper pricing1-wrapper',

    },
    page: {
      className: 'home-page pricing1',
    },
    OverPack: {
      playScale: 0.3,
      className: 'pricing1-content-wrapper',
    },
    titleWrapper: {
      className: 'pricing1-title-wrapper',
      children: [
        {
          name: 'title',
          children: '价目表',
          className: 'pricing1-title-h1',
        },
      ],
    },
    block: {
      className: 'pricing1-block-wrapper',
      children: [
        getBlock('block0', {
          button: '免费试用',
          money: '¥0',
          name: 'Free',
          content: `<span>
140-500Mbps<br/>  
140 GB-50TB（含）<br/>  
14500GB流量包<br/>  
14国内按峰值宽带账单<br/>  
14弹性计算<br/>  
14云服务器 ECS       
</span>`,
        }),
        getBlock('block1', {
          wrapperClass: 'active',
          button: '立即购买',
          money: '¥199',
          name: 'Starter',
          content: `<span>
14500-5Gbps<br/>
1410 GB-50TB（含）<br/>
141TB流量包<br/>
14国内按峰值宽带账单<br/>
14弹性计算<br/>
云服务器 ECS
</span>`,
        }),
        getBlock('block2', {
          button: '立即购买',
          money: '¥999',
          name: 'Pro',
          content: `<span>
14大于5Gbps<br/>
1450 GB-100TB（含）<br/>
145TB流量包<br/>
14国内按峰值宽带账单<br/>
14弹性计算<br/>
14云服务器 ECS
</span>`,
        }),
      ],
    },
  },
};
