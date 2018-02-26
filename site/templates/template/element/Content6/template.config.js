import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  borderStyle,
  positionStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

const getLiBlock = data => ({
  remark: { style: '如需编辑全局请选择外框' },
  style: {
    ...offsetStyle({ width: '25%', height: '220px' }),
    ...marginAndPaddingStyle({ padding: '1%', margin: 'auto' }),
    '.content4-img-wrapper $ .content-wrapper': {
      name: '当前区块外壳样式',
      style: {
        ...offsetStyle({ height: '220px' }),
        ...borderStyle({
          radius: '6px', width: '1px', style: 'solid', color: '#e9e9e9',
        }),
        ...bgStyle({ color: '#fff', select: 'backgroundColor' }),
        ...marginAndPaddingStyle({ padding: '10px' }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper > span': {
      name: '当前图片样式',
      style: {
        ...offsetStyle({ height: '100%' }),
        ...marginAndPaddingStyle({ padding: '5%' }),
        ...bgStyle({ color: '#e9e9e9', select: 'backgroundColor' }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper > p': {
      name: '当前内容文字区块样式',
      style: {
        ...offsetStyle({ width: '100%', bottom: '-30px' }),
        ...textStyle({
          color: '#fff',
          lineHeight: '30px',
        }),
        ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
        ...positionStyle({ value: 'absolute', select: ['relative', 'absolute'] }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper:hover p': {
      name: '当前内容区块 hover 样式',
      style: {
        ...offsetStyle({ width: '100%', bottom: '0px' }),
        ...textStyle({
          color: '#fff',
          lineHeight: '30px',
        }),
        ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
      },
    },
  },
  stylePhone: {
    ...offsetStyle({ width: '100%', top: '80px' }),
    ...marginAndPaddingStyle({ margin: 'auto', padding: '2%' }),
    '.content4-img-wrapper $ .content-wrapper': {
      name: '当前区块外壳样式',
      stylePhone: {
        ...offsetStyle({ width: '100%', height: '220px' }),
        ...borderStyle({
          radius: '6px', width: '1px', style: 'solid', color: '#e9e9e9',
        }),
        ...bgStyle({ color: '#fff', select: 'backgroundColor' }),
        ...marginAndPaddingStyle({ padding: '1%' }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper > span': {
      name: '当前图片样式',
      stylePhone: {
        ...offsetStyle({ height: '168px' }),
        ...marginAndPaddingStyle({ padding: '5%' }),
        ...bgStyle({ color: '#e9e9e9', select: 'backgroundColor' }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper > p': {
      name: '当前内容文字区块样式',
      style: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({
          color: '#fff',
          lineHeight: '30px',
        }),
        ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
      },
    },
    '.content4-img-wrapper $ .content-wrapper:hover p': {
      name: '当前内容区块 hover 样式',
      style: {
        ...offsetStyle({ width: '100%' }),
        ...textStyle({
          color: '#fff',
          lineHeight: '30px',
        }),
        ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
      },
    },
  },
  children: {
    img: {
      value: data.img,
      name: '案例 logo',
    },
    content: {
      name: '文字说明',
      value: data.content,
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content6: {
      style: {
        ...offsetStyle({ height: '100vh' }),
        ...bgStyle({ color: '#f3f3f3' }),
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
        ...offsetStyle({ height: '2000px' }),
        ...bgStyle({ color: '#f3f3f3', isMode: true }),
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
    content6_title: {
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
        ...marginAndPaddingStyle({ margin: '20px auto' }),
      },
      children: {
        value: '客户案例',
        name: '标题文字',
      },
    },
    content6_content: {
      style: {
        ...offsetStyle({ width: '100%', maxWidth: '600px' }),
        ...textStyle({
          size: '12px',
          color: '#666',
          align: 'center',
          lineHeight: '24px',
        }),
      },
      children: {
        value: '在这里用一段话介绍服务的案例情况',
        name: '标题说明',
      },
    },
    content6_ul: {
      style: {
        ...offsetStyle({ width: '98%', top: '25%' }),
        ...marginAndPaddingStyle({ padding: '20px 0' }),
        '$>li': {
          name: '区块 li 样式',
          style: {
            ...offsetStyle({ width: '25%' }),
            ...marginAndPaddingStyle({ padding: '1%', margin: 'auto' }),
          },
        },
        '$ .content-wrapper': {
          name: '全部区块外壳样式',
          style: {
            ...offsetStyle({ height: '220px' }),
            ...borderStyle({
              radius: '6px', width: '1px', style: 'solid', color: '#e9e9e9',
            }),
            ...bgStyle({ color: '#fff', select: 'backgroundColor' }),
            ...marginAndPaddingStyle({ padding: '10px' }),
          },
        },
        '$ .content-wrapper > span': {
          name: '全部图片样式',
          style: {
            ...offsetStyle({ height: '100%' }),
            ...marginAndPaddingStyle({ padding: '5%' }),
            ...bgStyle({ color: '#e9e9e9', select: 'backgroundColor' }),
          },
        },
        '$ .content-wrapper > p': {
          name: '全部内容文字区块样式',
          style: {
            ...offsetStyle({ width: '100%', bottom: '-30px' }),
            ...textStyle({
              color: '#fff',
              lineHeight: '30px',
            }),
            ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
            ...positionStyle({ value: 'absolute', select: ['relative', 'absolute'] }),
          },
        },
        '$ .content-wrapper:hover p': {
          name: '全部内容区块 hover 样式',
          style: {
            ...offsetStyle({ width: '100%', bottom: '0px' }),
            ...textStyle({
              color: '#fff',
              lineHeight: '30px',
            }),
            ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ width: '100%', top: '80px' }),
        ...marginAndPaddingStyle({ margin: 'auto', padding: '20px 0' }),
        '$>li': {
          name: '区块 li 样式',
          stylePhone: {
            ...offsetStyle({ width: '100%' }),
            ...marginAndPaddingStyle({ padding: '1%', margin: 'auto' }),
          },
        },
        '$ .content-wrapper': {
          name: '全部区块外壳样式',
          stylePhone: {
            ...offsetStyle({ width: '100%', height: '220px' }),
            ...borderStyle({
              radius: '6px', width: '1px', style: 'solid', color: '#e9e9e9',
            }),
            ...bgStyle({ color: '#fff', select: 'backgroundColor' }),
            ...marginAndPaddingStyle({ padding: '1%' }),
          },
        },
        '$ .content-wrapper > span': {
          name: '全部图片样式',
          stylePhone: {
            ...offsetStyle({ height: '168px' }),
            ...marginAndPaddingStyle({ padding: '5%' }),
            ...bgStyle({ color: '#e9e9e9', select: 'backgroundColor' }),
          },
        },
        '$ .content-wrapper > p': {
          name: '全部内容文字区块样式',
          style: {
            ...offsetStyle({ width: '100%' }),
            ...textStyle({
              color: '#fff',
              lineHeight: '30px',
            }),
            ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
          },
        },
        '$ .content-wrapper:hover p': {
          name: '全部内容区块 hover 样式',
          style: {
            ...offsetStyle({ width: '100%' }),
            ...textStyle({
              color: '#fff',
              lineHeight: '30px',
            }),
            ...bgStyle({ color: 'rgba(1, 155,240, 0.75)', select: 'backgroundColor' }),
          },
        },
      },
    },
    content6_block0: getLiBlock({
      img: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
      content: 'Ant Design',
    }),
    content6_block1: getLiBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
      content: 'Ant Motion',
    }),
    content6_block2: getLiBlock({
      img: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
      content: 'Ant Design',
    }),
    content6_block3: getLiBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
      content: 'Ant Motion',
    }),
    content6_block4: getLiBlock({
      img: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
      content: 'Ant Design',
    }),
    content6_block5: getLiBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
      content: 'Ant Motion',
    }),
    content6_block6: getLiBlock({
      img: 'https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg',
      content: 'Ant Design',
    }),
    content6_block7: getLiBlock({
      img: 'https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg',
      content: 'Ant Motion',
    }),
  },
};
