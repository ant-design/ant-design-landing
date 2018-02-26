import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  borderStyle,
  floatStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');


const getBlock = data => ({
  [`content8_tagBlock${data.i}`]: {
    style: {
      '.content6 $.content6-tag': {
        style: {
          ...textStyle({
            size: '14px',
            lineHeight: '1.5em',
            color: '#666',
          }),
        },
      },
      '.ant-tabs-nav .ant-tabs-tab-active $, .ant-tabs-nav .ant-tabs-tab:hover $': {
        name: '标签 hover 与选中样式',
        style: {
          ...textStyle({ size: '14px', lineHeight: '1.5em', color: '#019BF0' }),
        },
      },
      '.content6 $.content6-tag i': {
        name: '全部标签图标样式',
        style: {
          ...offsetStyle({ width: '12px', height: '14px' }),
          ...marginAndPaddingStyle({ margin: '0 5px 0 0' }),
        },
      },
    },
    children: {
      tag: {
        name: '标签文字',
        value: data.tag,
      },
      icon: {
        name: 'icon地址',
        value: data.icon,
      },
    },
  },
  [`content8_textBlock${data.i}`]: {
    style: {
      '.content6 $.content6-text': {
        style: {
          ...textStyle({ size: '12px', color: '#666', lineHeight: '1.5em' }),
          ...offsetStyle({ left: '10%', width: '35%' }),
          ...marginAndPaddingStyle({ padding: '20px 0 0' }),
        },
      },
      '$.content6-text h3': {
        name: '当前标题样式(只适用 h3)',
        style: {
          ...textStyle({ size: '1.17em', color: '#3e3e3e', lineHeight: '1.5em' }),
          ...marginAndPaddingStyle({ margin: '10px auto' }),
        },
      },
    },
    stylePhone: {
      '.content6 $.content6-text': {
        stylePhone: {
          ...textStyle({
            size: '12px', color: '#666', lineHeight: '1.5em', align: 'left',
          }),
          ...offsetStyle({ width: '90%' }),
          ...marginAndPaddingStyle({ padding: '20px 0 0' }),
        },
      },
      '$.content6-text h3': {
        name: '当前标题样式(只适用 h3)',
        stylePhone: {
          ...textStyle({ size: '1.17em', color: '#3e3e3e', lineHeight: '1.5em' }),
          ...marginAndPaddingStyle({ margin: '10px auto' }),
        },
      },
    },
    children: {
      name: '详细内容',
      value: data.text,
    },
  },
  [`content8_imgBlock${data.i}`]: {
    style: {
      '.content6 $.content6-img': {
        style: {
          ...offsetStyle({ right: '10%', left: '0', width: '35%' }),
          ...floatStyle('right'),
        },
      },
    },
    stylePhone: {
      '.content6 $.content6-img': {
        stylePhone: {
          ...offsetStyle({ width: '80%', maxWidth: '350px' }),
        },
      },
    },
    children: {
      name: '图片地址',
      value: data.img,
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content8: {
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
    content8_title: {
      style: {
        ...offsetStyle({ width: '100%', top: '10%' }),
        ...textStyle({
          size: '32px',
          color: '#404040',
          align: 'center',
          lineHeight: '48px',
        }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({
          size: '24px',
          color: '#404040',
          align: 'center',
          lineHeight: '48px',
        }),
        ...marginAndPaddingStyle({ margin: '40px auto 20px' }),
      },
      children: {
        name: '标题文案',
        value: '蚂蚁金融云提供专业的服务',
      },
    },
    content8_content: {
      style: {
        ...offsetStyle({ maxWidth: '600px', width: '100%' }),
        ...textStyle({
          size: '12px',
          lineHeight: '1.5em',
          color: '#666',
        }),
      },
      children: {
        name: '详细说明',
        value: '科技想象力，金融创造力',
      },
    },
    content8_tabs: {
      func: {
        name: '其它功能',
        page: {
          value: 1,
          total: 3,
          name: '显示当前标签',
          type: 'page',
        },
      },
      style: {
        ...offsetStyle({ top: '12%' }),
        '$ .ant-tabs-nav .ant-tabs-tab': {
          name: '标签样式',
          style: {
            ...textStyle({
              size: '14px',
              lineHeight: '1.5em',
              color: '#666',
            }),
          },
        },
        '$ .ant-tabs-nav .ant-tabs-tab-active, $ .ant-tabs-nav .ant-tabs-tab:hover': {
          name: '标签 hover 与选中样式',
          style: {
            ...textStyle({ size: '14px', lineHeight: '1.5em', color: '#019BF0' }),
          },
        },
        '$ .content6-tag i': {
          name: '全部标签图标样式',
          style: {
            ...offsetStyle({ width: '12px', height: '14px' }),
            ...marginAndPaddingStyle({ margin: '0 5px 0 0' }),
          },
        },
        '$ .ant-tabs-ink-bar': {
          name: '横条样式',
          style: {
            ...offsetStyle({ height: '2px' }),
            ...bgStyle({ color: '#019BF0', select: 'backgroundColor' }),
          },
        },
        '$ .ant-tabs .ant-tabs-tabpane': {
          name: '全部内容外框',
          style: {
            ...marginAndPaddingStyle({ margin: '40px 0 0' }),
          },
        },
        '$ .content6-text': {
          name: '全部内容文字样式',
          style: {
            ...textStyle({
              size: '12px',
              color: '#666',
              lineHeight: '1.5em',
            }),
            ...offsetStyle({ left: '10%', width: '35%' }),
            ...marginAndPaddingStyle({ padding: '20px 0 0' }),
          },
          stylePhone: {
            ...textStyle({
              size: '12px',
              color: '#666',
              lineHeight: '1.5em',
              align: 'left',
            }),
            ...offsetStyle({ width: '90%' }),
            ...marginAndPaddingStyle({ padding: '20px 0 0' }),
          },
        },
        '$ .content6-text h3': {
          name: '全部内容文字标题样式(只适用 h3)',
          style: {
            ...textStyle({ size: '1.17em', color: '#3e3e3e', lineHeight: '1.5em' }),
            ...marginAndPaddingStyle({ margin: '10px auto' }),
          },
        },
        '$ .content6-img': {
          name: '全部内容图片样式',
          style: {
            ...offsetStyle({ right: '10%', left: '0', width: '35%' }),
            ...floatStyle('right'),
          },
          stylePhone: {
            ...offsetStyle({ width: '80%', maxWidth: '350px' }),
          },
        },
      },
    },

    ...getBlock({
      i: 0,
      tag: 'PHONE',
      icon: 'https://zos.alipayobjects.com/rmsportal/XnzcslQvRoBHMHd.svg',
      text: `<h3>技术</h3>
丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。
<h3>融合</h3>
解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。`,
      img: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
    }),

    ...getBlock({
      i: 1,
      tag: 'TABLET',
      icon: 'https://zos.alipayobjects.com/rmsportal/XnzcslQvRoBHMHd.svg',
      text: `<h3>技术</h3>
丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。
<h3>融合</h3>
解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。`,
      img: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
    }),

    ...getBlock({
      i: 2,
      tag: 'DESKTOP',
      icon: 'https://zos.alipayobjects.com/rmsportal/XnzcslQvRoBHMHd.svg',
      text: `<h3>技术</h3>
丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。
<h3>融合</h3>
解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。
<h3>开放</h3>
符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。`,
      img: 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
    }),
  },
};

