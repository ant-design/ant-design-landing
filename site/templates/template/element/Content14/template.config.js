import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

const getBlock = (name, children = {}) => ({
  name,
  className: 'content14-block',
  md: 8,
  xs: 24,
  children: {
    wrapper: {
      className: `content14-block-box ${children.wrapperClass || ''}`,
    },
    topWrapper: {
      className: 'content14-top-wrapper',
    },
    name: {
      className: 'content14-name',
      children: children.name,
    },
    money: {
      className: 'content14-money',
      children: children.money,
    },
    content: {
      className: 'content14-content',
      children: children.content,
    },
    line: {
      className: 'content14-line',
    },
    buttonWrapper: {
      className: 'content14-button-wrapper',
      children: {
        a: {
          className: 'content14-button',
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
      className: 'home-page-wrapper content14-wrapper',

    },
    page: {
      className: 'home-page content14',
    },
    OverPack: {
      playScale: 0.3,
      className: 'content14-content-wrapper',
    },
    titleWrapper: {
      className: 'content14-title-wrapper',
      children: [
        {
          name: 'title',
          children: '价目表',
          className: 'content14-title-h1',
        },
      ],
    },
    block: {
      className: 'content14-block-wrapper',
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
