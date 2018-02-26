import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  floatStyle,
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
    content2: {
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
    content2_imgWrapper: {
      style: {
        ...offsetStyle({ width: '40%' }),
      },
      stylePhone: {
        ...offsetStyle({ height: '200px', width: '100%' }),
        ...marginAndPaddingStyle({ margin: '20px auto' }),
      },
    },
    content2_img: {
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
        value: 'https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png',
        name: '图片展示',
        remark: '尺寸参考:268*296',
      },
    },
    content2_textWrapper: {
      style: {
        ...offsetStyle({ width: '55%', height: '150px' }),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%', height: '140px' }),
        ...marginAndPaddingStyle({ margin: 'auto auto 20px' }),
        ...textStyle({ align: 'center' }),
      },
    },
    content2_title: {
      style: {
        ...offsetStyle({ width: '75%', top: '35%' }),
        ...textStyle({
          size: '32px',
          color: '#404040',
          align: 'left',
        }),
        ...floatStyle('left'),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({ size: '24px', color: '#404040', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '10px auto' }),
      },
      children: {
        name: '标题名称',
        value: '企业资源管理',
      },
    },
    content2_content: {
      style: {
        ...offsetStyle({ width: '75%', top: '37%' }),
        ...textStyle({
          size: '12px',
          color: '#666',
          align: 'left',
        }),
        ...marginAndPaddingStyle({ margin: '20px auto auto' }),
        ...floatStyle('left'),
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({ size: '12px', color: '#666', align: 'center' }),
        ...marginAndPaddingStyle({ margin: '20px auto auto' }),
      },
      children: {
        name: '详细说明',
        value: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。' +
        '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。' +
        '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
      },
    },
  },
};
