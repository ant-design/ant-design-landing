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

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content10: {
      style: {
        ...offsetStyle({ height: 'calc(100vh - 64px)' }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .bg0': {
          name: '背景样式',
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
        '$ .bg0:before': {
          name: '背景蒙板',
          style: {
            ...bgStyle({ color: 'rgba(0,0,0,0.35)', select: 'backgroundColor' }),
          },
        },
      },
    },
    content10_wrapperBlock0: {
      style: {
        ...offsetStyle({ width: '400px', top: '25%', left: '10%' }),
        ...textStyle({ align: 'left' }),
        ...marginAndPaddingStyle({ padding: '20px' }),
      },
    },
    content10_titleBlock0: {
      style: {
        ...offsetStyle({ width: '350px', left: '30px' }),
        ...textStyle({ size: '40px', color: '#fff', align: 'center' }),
      },
      children: {
        value: 'Ant Motion',
        name: '图片标题',
        remark: '如果不是图片结尾将自动转换成标题',
      },
    },
    content10_contentBlock0: {
      style: {
        ...textStyle({
          size: '14px', lineHeight: '1.5em', color: '#fff', align: 'center',
        }),
        ...marginAndPaddingStyle({ margin: 'auto auto 20px auto' }),
      },
      children: {
        value: 'Ant Motion 在界面里主要是来加强体验舒适度、描述层级关系、增加界面活力、反馈与意向等功能性的动效。',
        name: '广告语',
      },
    },
    content10_buttonBlock0: {
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
            ...borderStyle({ color: '#019BF0', width: '1px', style: 'solid' }),
            ...bgStyle({ color: '#019BF0', select: ['backgroundColor'] }),
          },
          stylePhone: {
            ...textStyle({ color: '#fff' }),
            ...borderStyle({ color: '#019BF0', width: '1px', style: 'solid' }),
            ...bgStyle({ color: '#019BF0', select: ['backgroundColor'] }),
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
