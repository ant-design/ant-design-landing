import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  borderStyle,
  boxShadowStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');


export default {
  component,
  templateStr,
  less,
  dataSource: {
    content5: {
      style: {
        ...offsetStyle({ height: '100vh' }),
        ...bgStyle(),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
      },
      stylePhone: {
        ...offsetStyle({ height: '350px' }),
        ...bgStyle({ isMode: true }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
      },
    },
    content5_video: {
      style: {
        ...offsetStyle({ width: '90%', maxWidth: '800px', top: '20%' }),
        ...boxShadowStyle('0 2px 6px rgba(0,0,0,0.2)'),
        ...borderStyle({ radius: '6px' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '90%', maxWidth: '800px', top: '20%' }),
        ...boxShadowStyle('0 2px 6px rgba(0,0,0,0.2)'),
        ...borderStyle({ radius: '6px' }),
        ...bgStyle({
          image: 'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg',
          select: 'backgroundImage',
        }),
      },
      children: {
        value: 'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4',
        name: '视频地址',
      },
    },
    content5_title: {
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
        ...offsetStyle({ width: '100%', top: '10%' }),
        ...textStyle({
          size: '24px',
          color: '#404040',
          align: 'center',
          lineHeight: '48px',
        }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
      },
      children: {
        value: '蚂蚁金融云提供专业的服务',
        name: '标题文字',
      },
    },
    content5_content: {
      style: {
        ...textStyle({
          size: '12px',
          align: 'center',
          color: '#666',
          lineHeight: '24px',
        }),
        ...offsetStyle({ maxWidth: '600px', width: '100%' }),
      },
      children: {
        value: '科技想象力，金融创造力',
        name: '详细说明',
      },
    },
  },
};
