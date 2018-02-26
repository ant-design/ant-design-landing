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

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content3: {
      style: {
        ...offsetStyle({ height: '50vh' }),
        ...bgStyle({
          imageRemark: '图片尺寸参考： 1920*540',
        }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .content-template': {
          name: '区块内框',
          style: {
            ...offsetStyle({ width: '100%', maxWidth: '1200px' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ height: '400px' }),
        ...bgStyle({
          imageRemark: '图片尺寸参考： 1920*540',
          isMode: true,
        }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
        '$ .content-template': {
          name: '区块内框',
          stylePhone: {
            ...offsetStyle({ width: '90%' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
      },
    },
    content3_imgWrapper: {
      style: {
        ...offsetStyle({ width: '40%' }),
      },
      stylePhone: {
        ...offsetStyle({ height: '200px', width: '100%' }),
        ...marginAndPaddingStyle({ margin: '20px auto' }),
      },
    },
    content3_img: {
      style: {
        ...offsetStyle({ width: '55%', left: '10%', height: '50vh' }),
        lineHeight: {
          value: '50vh',
          name: '区块行高',
          remark: '控制图片垂直居中元素, 跟区块高度一样为居中',
        },
      },
      stylePhone: {
        ...offsetStyle({
          width: '180px', height: '200px', right: '0px', left: '0px',
        }),
        ...textStyle({ lineHeight: '200px' }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
      },
      children: {
        name: '图片展示',
        value: 'https://zos.alipayobjects.com/rmsportal/tvQTfCupGUFKSfQ.png',
        remark: '尺寸参考:268*290',
      },
    },
    content3_textWrapper: {
      style: {
        ...offsetStyle({ width: '55%', height: '150px' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%', height: '140px' }),
        ...marginAndPaddingStyle({ margin: 'auto auto 20px' }),
        ...textStyle({ align: 'center' }),
      },
    },
    content3_title: {
      style: {
        ...offsetStyle({ width: '75%', top: '35%' }),
        ...textStyle({
          size: '32px',
          color: '#404040',
          align: 'left',
        }),
        ...floatStyle('right'),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({ size: '24px', color: '#404040', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '10px auto' }),
      },
      children: {
        name: '标题名称',
        value: '分布式中间件',
      },
    },
    content3_content: {
      style: {
        ...offsetStyle({ width: '75%', top: '37%' }),
        ...textStyle({
          size: '12px',
          color: '#666',
          align: 'left',
        }),
        ...marginAndPaddingStyle({ margin: '20px auto auto' }),
        ...floatStyle('right'),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({ size: '12px', color: '#666', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '20px auto auto' }),
      },
      children: {
        name: '详细说明',
        value: '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。' +
        '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
      },
    },
  },
};
