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

const getBlock = data => (
  {
    style: {
      ...offsetStyle({ width: '33.33%' }),
      ...marginAndPaddingStyle({ padding: '0 4%' }),
      '.content7 $ .icon': {
        name: '图片样式',
        style: {
          ...offsetStyle({ width: '100px', height: '100px' }),
          ...marginAndPaddingStyle({ margin: 'auto' }),
        },
      },
      '.content7 $ h3': {
        name: '标题标式',
        style: {
          ...textStyle({ size: '1.17em', lineHeight: '32px', color: '#3e3e3e' }),
          ...marginAndPaddingStyle({ margin: '10px auto' }),
        },
      },
      '.content7 $ p': {
        name: '内容样式',
        style: {
          ...textStyle({ size: '12px', lineHeight: '1.5em', color: '#666' }),
        },
      },
    },
    stylePhone: {
      ...offsetStyle({ width: '100%', maxWidth: '250px' }),
      ...marginAndPaddingStyle({ padding: '0', margin: '20px auto 40px' }),
      '.content7 $ .icon': {
        name: '图片样式',
        stylePhone: {
          ...offsetStyle({ width: '100px', height: '100px', maxWidth: '250px' }),
          ...marginAndPaddingStyle({ margin: 'auto' }),
        },
      },
      '.content7 $ h3': {
        name: '标题样式',
        stylePhone: {
          ...textStyle({ size: '1.17em', lineHeight: '32px', color: '#3e3e3e' }),
          ...marginAndPaddingStyle({ margin: '10px auto' }),
        },
      },
      '.content7 $ p': {
        name: '内容样式',
        stylePhone: {
          ...textStyle({ size: '12px', lineHeight: '1.5em', color: '#666' }),
        },
      },
    },
    children: {
      icon: {
        value: data.icon,
        name: 'icon地址',
      },
      title: {
        value: data.title,
        name: '标题名称',
      },
      content: {
        value: data.content,
        name: '区块内容',
      },
    },
  }
);

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content9: {
      style: {
        ...offsetStyle({ height: '500px' }),
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
        ...offsetStyle({ width: '100%', height: '760px' }),
        ...bgStyle({ isMode: true }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .content-template': {
          name: '内框样式',
          style: {
            ...offsetStyle({ width: '90%' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
      },
    },
    content9_title: {
      style: {
        ...offsetStyle({ width: '100%', top: '15%' }),
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
        value: '产品与服务',
      },
    },
    content9_contentWrapper: {
      style: {
        ...offsetStyle({ width: '100%', top: '25%' }),
        ...marginAndPaddingStyle({ margin: '0' }),
        '$ li': {
          name: '全部 li 区块样式',
          style: {
            ...offsetStyle({ width: '33.33%' }),
            ...marginAndPaddingStyle({ padding: '0 4%' }),
          },
        },
        '$ .icon': {
          name: '全部图片样式',
          style: {
            ...offsetStyle({ width: '100px', height: '100px' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
        '$ h3': {
          name: '全部标题样式',
          style: {
            ...textStyle({ size: '1.17em', lineHeight: '32px', color: '#3e3e3e' }),
            ...marginAndPaddingStyle({ margin: '10px auto' }),
          },
        },
        '$ p': {
          name: '全部内容样式',
          style: {
            ...textStyle({ size: '12px', lineHeight: '1.5em', color: '#666' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...marginAndPaddingStyle({ padding: '0', margin: '0' }),
        '$ li': {
          name: '全部 li 区块样式',
          stylePhone: {
            ...offsetStyle({ width: '100%', maxWidth: '250px' }),
            ...marginAndPaddingStyle({ padding: '0', margin: '20px auto 40px' }),
          },
        },
        '$ .icon': {
          name: '全部图片样式',
          stylePhone: {
            ...offsetStyle({ width: '100px', height: '100px' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
        '$ h3': {
          name: '全部标题样式',
          stylePhone: {
            ...textStyle({ size: '1.17em', lineHeight: '32px', color: '#3e3e3e' }),
            ...marginAndPaddingStyle({ margin: '10px auto' }),
          },
        },
        '$ p': {
          name: '全部内容样式',
          stylePhone: {
            ...textStyle({ size: '12px', lineHeight: '1.5em', color: '#666' }),
          },
        },
      },
    },
    content9_block0: getBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
      title: '一站式业务接入',
      content: '支付、结算、核算接入产品效率翻四倍',
    }),
    content9_block1: getBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
      title: '一站式事中风险监控',
      content: '在所有需求配置环节事前风险控制和质量控制能力',
    }),
    content9_block2: getBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
      title: '一站式数据运营',
      content: '沉淀产品接入效率和运营小二工作效率数据',
    }),
  },
};

