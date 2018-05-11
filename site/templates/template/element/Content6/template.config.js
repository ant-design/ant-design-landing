const component = require('./index');
const less = require('raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

export default {
  component,
  less,
  templateStr,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content6-wrapper',
    },
    OverPack: {
      className: 'home-page content6',
    },
    textWrapper: {
      className: 'content6-text',
      xs: 24,
      md: 10,
    },
    title: {
      children: '蚂蚁金融云提供专业的服务',
      className: 'content-bottom',
    },
    titleContent: {
      children: '基于阿里云计算强大的基础资源',
    },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png',
      className: 'content6-img',
      xs: 24,
      md: 14,
    },
    block: {
      children: [
        {
          name: 'block0',
          img: {
            children: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
            className: 'icon',
          },
          title: {
            className: 'title',
            children: '技术',
          },
          content: {
            className: 'content',
            children: '丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。',
          },
        },
        {
          name: 'block1',
          img: { className: 'icon', children: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png' },
          title: { className: 'title', children: '融合' },
          content: { className: 'content', children: '解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。' },
        },
        {
          name: 'block2',
          img: { className: 'icon', children: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png' },
          title: { className: 'title', children: '开发' },
          content: { className: 'content', children: '符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。' },
        },
      ],
    },
  },
};
