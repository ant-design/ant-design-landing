import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content7-wrapper',
    },
    page: {
      className: 'home-page content7',
    },
    OverPack: {
    },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: '蚂蚁金融云提供专业的服务',
          className: 'title-h1',
        },
        {
          name: 'content',
          children: '基于阿里云计算强大的基础资源',
        },
      ],
    },
    tabsWrapper: {
      className: 'content7-tabs-wrapper',
    },
    block: {
      children: [
        {
          name: 'block0',
          tag: {
            className: 'content7-tag',
            text: {
              children: 'PHONE',
              className: 'content7-tag-name',
            },
            icon: { children: 'mobile' },
          },
          content: {
            className: 'content7-content',
            text: {
              className: 'content7-text',
              md: 14,
              xs: 24,
              children: `<span>
<h3>技术</h3>
<p>丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。</p>
<br/>
<h3>融合</h3>
<p>解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。</p>
<br/>
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。
</span>`,
            },
            img: {
              className: 'content7-img',
              children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
              md: 10,
              xs: 24,
            },
          },
        },
        {
          name: 'block1',
          tag: {
            className: 'content7-tag',
            icon: { children: 'tablet' },
            text: { className: 'content7-tag-name', children: 'TABLET' },
          },
          content: {
            className: 'content7-content',
            text: {
              className: 'content7-text',
              md: 14,
              xs: 24,
              children: `<span>
<h3>技术</h3>
<p>丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。</p>
<br/>
<h3>融合</h3>
<p>解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。</p>
<br/>
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。
</span>`,
            },
            img: {
              className: 'content7-img',
              md: 10,
              xs: 24,
              children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
            },
          },

        },
        {
          name: 'block2',
          tag: {
            className: 'content7-tag',
            text: {
              children: 'DESKTOP',
              className: 'content7-tag-name',
            },
            icon: {
              children: 'laptop',
            },
          },
          content: {
            className: 'content7-content',
            text: {
              className: 'content7-text',
              md: 14,
              xs: 24,
              children: `<span>
<h3>技术</h3>
<p>丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。</p>
<br/>
<h3>融合</h3>
<p>解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。</p>
<br/>
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。
</span>
`,
            },
            img: {
              className: 'content7-img',
              md: 10,
              xs: 24,
              children: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
            },
          },
        },
      ],
    },
  },
};
