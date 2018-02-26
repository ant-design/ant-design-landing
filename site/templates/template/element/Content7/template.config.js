import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  borderStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

const getBlock = data => ({
  style: {
    ...marginAndPaddingStyle({ margin: '8% 0 0' }),
    '.content5 $ span': {
      name: '当前图片样式',
      style: { ...offsetStyle({ width: '30px', height: '30px' }) },
    },
    '.content5 $ h2': {
      name: '当前标题样式',
      style: {
        ...textStyle({
          color: '#3e3e3e',
          size: '14px',
          lineHeight: '1.5em',
        }),
        ...marginAndPaddingStyle({ margin: '0 0 10px 45px' }),
      },
    },
    '.content5 $ p': {
      name: '当前内容样式',
      style: {
        ...textStyle({ color: '#666', size: '14px', lineHeight: '1.5em' }),
        ...marginAndPaddingStyle({ margin: '0 0 0 45px' }),
      },
    },
  },
  children: {
    img: {
      value: data.img,
      name: '图片地址',
    },
    title: {
      value: data.title,
      name: '标题文字',
    },
    content: {
      name: '详细说明',
      value: data.content,
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content7: {
      style: {
        ...offsetStyle({ height: '100vh' }),
        ...bgStyle(),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .content-template': {
          name: '内框样式',
          style: {
            ...offsetStyle({ width: '100%', maxWidth: '1200px', height: '100%' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ height: '800px' }),
        ...bgStyle({ isMode: true }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .content-template': {
          name: '内框样式',
          stylePhone: {
            ...offsetStyle({ width: '90%', height: '100%' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
      },
    },
    content7_textWrapper: {
      style: {
        ...offsetStyle({ width: '35%', top: '15%', left: '5%' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%', height: '430px' }),
      },
    },
    content7_title: {
      style: {
        ...textStyle({
          size: '32px',
          color: '#404040',
          lineHeight: '48px',
          align: 'left',
        }),
      },
      stylePhone: {
        ...textStyle({
          size: '24px',
          color: '#404040',
          lineHeight: '48px',
          align: 'center',
        }),
        ...marginAndPaddingStyle({ margin: '40px auto 20px' }),
      },
      children: {
        value: '蚂蚁金融云提供专业的服务',
        name: '标题文字',
      },
    },
    content7_content: {
      style: {
        ...textStyle({
          lineHeight: '1.5em',
          size: '12px',
          color: '#666',
          align: 'left',
        }),
      },
      stylePhone: {
        ...textStyle({
          lineHeight: '1.5em',
          size: '12px',
          color: '#666',
          align: 'center',
        }),
        ...marginAndPaddingStyle({ margin: '10px 0 0' }),
      },
      children: {
        value: '基于阿里云计算强大的基础资源',
        name: '详细说明',
      },
    },
    content7_img: {
      style: {
        ...offsetStyle({ width: '50%', top: '15%', right: '5%' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...marginAndPaddingStyle({ margin: '20px 0 0' }),
      },
      children: {
        value: 'https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png',
        name: '图片地址',
      },
    },
    content7_ul: {
      style: {
        ...marginAndPaddingStyle({ margin: '10% 0 0' }),
        '$ span': {
          name: '全部图片样式',
          style: { ...offsetStyle({ width: '30px', height: '30px' }) },
        },
        '$ h2': {
          name: '全部标题样式',
          style: {
            ...textStyle({
              color: '#3e3e3e',
              size: '14px',
              lineHeight: '1.5em',
            }),
            ...marginAndPaddingStyle({ margin: '0 0 10px 45px' }),
          },
        },
        '$ p': {
          name: '全部内容样式',
          style: {
            ...textStyle({ color: '#666', size: '14px', lineHeight: '1.5em' }),
            ...marginAndPaddingStyle({ margin: '0 0 0 45px' }),
          },
        },
      },
    },
    content7_block0: getBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
      title: '技术',
      content: '丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。',
    }),
    content7_block1: getBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
      title: '融合',
      content: '解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。\n解放业务及技术生产力，推动金融服务底层创新。',
    }),
    content7_block2: getBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
      title: '开发',
      content: '符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。',
    }),
  },
};
