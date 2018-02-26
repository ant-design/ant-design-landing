import {
  marginAndPaddingStyle,
  offsetStyle,
  boxShadowStyle,
  textStyle,
  bgStyle,
  borderStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content1: {
      func: {
        name: '其它功能',
        page: {
          value: 1,
          total: 2,
          name: '显示当前面页',
          type: 'page',
        },
      },
      style: {
        ...offsetStyle({ height: '100vh' }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .bg0': {
          name: '第一屏背景',
          style: {
            ...bgStyle({
              image: 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
              position: 'center',
              size: 'cover',
            }),
          },
          stylePhone: {
            ...bgStyle({
              image: 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
              position: 'center',
              size: 'cover',
              isMode: true,
            }),
          },
        },
        '$ .bg1': {
          name: '第二屏背景',
          style: {
            ...bgStyle({
              image: 'https://zos.alipayobjects.com/rmsportal/xHxWkcvaIcuAdQl.jpg',
              position: 'center',
              size: 'cover',
            }),
          },
          stylePhone: {
            ...bgStyle({
              image: 'https://zos.alipayobjects.com/rmsportal/xHxWkcvaIcuAdQl.jpg',
              position: 'center',
              size: 'cover',
              isMode: true,
            }),
          },
        },
      },
    },
    content1_wrapperBlock0: {
      style: {
        ...offsetStyle({
          width: '550px', top: '20%', left: '0px', right: '0px',
        }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
        ...textStyle({ align: 'center' }),
      },
    },
    content1_titleBlock0: {
      style: {
        ...offsetStyle({ width: '350px', left: '30px' }),
        ...textStyle({ size: '40px', color: '#fff', align: 'center' }),
      },
      children: {
        value: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
        name: '图片标题',
        remark: '如果不是图片结尾将自动转换成标题',
      },
    },
    content1_contentBlock0: {
      style: {
        ...textStyle({ size: '14px', color: '#fff', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '0px 0px 20px 0px' }),
      },
      children: {
        value: '一个高效的页面动画解决方案',
        name: '广告语',
      },
    },
    content1_buttonBlock0: {
      style: {
        ...textStyle({ color: '#fff' }),
        ...borderStyle({
          color: '#fff', width: '1px', style: 'solid', radius: '4px',
        }),
        ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
        '$:hover': {
          name: 'hover 样式',
          style: {
            ...textStyle({ color: '#fff' }),
            ...borderStyle({ color: '#fff', width: '1px', style: 'solid' }),
            ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
            ...boxShadowStyle('0 0 10px rgba(50,250,255,0.75)'),
          },
          stylePhone: {
            ...textStyle({ color: '#fff' }),
            ...borderStyle({ color: '#fff', width: '1px', style: 'solid' }),
            ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
            ...boxShadowStyle('0 0 10px rgba(50,250,255,0.75)'),
          },
        },
      },
      children: {
        value: 'Learn More',
        name: '按钮文字',
      },
    },
    content1_wrapperBlock1: {
      style: {
        ...offsetStyle({
          width: '550px', top: '20%', left: '0px', right: '0px',
        }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
        ...textStyle({ align: 'center' }),
      },
    },
    content1_titleBlock1: {
      style: {
        ...offsetStyle({ width: '350px', left: '30px' }),
        ...textStyle({ size: '40px', color: '#fff', align: 'center' }),
      },
      children: {
        value: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
        name: '图片标题',
        remark: '如果不是图片结尾将自动转换成标题',
      },
    },
    content1_contentBlock1: {
      style: {
        ...textStyle({ size: '14px', color: '#fff', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '0px 0px 20px 0px' }),
      },
      children: {
        value: '一个高效的页面动画解决方案',
        name: '广告语',
      },
    },
    content1_buttonBlock1: {
      style: {
        ...textStyle({ color: '#fff' }),
        ...borderStyle({
          color: '#fff', width: '1px', style: 'solid', radius: '4px',
        }),
        ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
        '$:hover': {
          name: 'hover 样式',
          style: {
            ...textStyle({ color: '#fff' }),
            ...borderStyle({ color: '#fff', width: '1px', style: 'solid' }),
            ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
            ...boxShadowStyle('0 0 10px rgba(50,250,255,0.75)'),
          },
          stylePhone: {
            ...textStyle({ color: '#fff' }),
            ...borderStyle({ color: '#fff', width: '1px', style: 'solid' }),
            ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
            ...boxShadowStyle('0 0 10px rgba(50,250,255,0.75)'),
          },
        },
      },
      children: {
        value: 'Learn More',
        name: '按钮文字',
      },
    },
  },
};
