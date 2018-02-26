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

const getLiBlock = children => ({
  remark: { style: '如需编辑全局请选择外框' },
  style: {
    ...offsetStyle({ width: '33.33%' }),
    ...marginAndPaddingStyle({ padding: '6% 5% 0' }),
    '.content2 $ .img': {
      name: '当前 icon 样式',
      style: {
        ...offsetStyle({ width: '15%' }),
        ...marginAndPaddingStyle({ margin: '0', padding: '0' }),
      },
    },
    '.content2 $ .text': {
      name: '当前文字区块样式',
      style: {
        ...offsetStyle({ width: '85%' }),
        ...marginAndPaddingStyle({ margin: '0', padding: '0 0 0 8%' }),
      },
    },
    '.content2 $ .text h1': {
      name: '当前标题样式',
      style: {
        ...textStyle({
          size: '32px',
          color: '#404040',
        }),
        ...marginAndPaddingStyle({ margin: '0' }),
      },
    },
    '.content2 $ .text p': {
      name: '当前内容样式',
      style: {
        ...textStyle({ size: '12px', color: '#666' }),
        ...marginAndPaddingStyle({ margin: '0' }),
      },
    },
  },
  stylePhone: {
    ...offsetStyle({ width: '90%' }),
    ...marginAndPaddingStyle({ padding: '6% 5% 0' }),
    '.content2 $ .img': {
      name: '当前 icon 样式',
      stylePhone: {
        ...offsetStyle({ width: '15%' }),
        ...marginAndPaddingStyle({ margin: '0', padding: '0' }),
      },
    },
    '.content2 $ .text': {
      name: '当前文字区块样式',
      stylePhone: {
        ...offsetStyle({ width: '85%' }),
        ...marginAndPaddingStyle({ margin: '0', padding: '0 0 0 8%' }),
      },
    },
    '.content2 $ .text h1': {
      name: '当前标题样式',
      stylePhone: {
        ...textStyle({
          size: '32px',
          color: '#404040',
        }),
        ...marginAndPaddingStyle({ margin: '0' }),
      },
    },
    '.content2 $ .text p': {
      name: '当前内容样式',
      stylePhone: {
        ...textStyle({ size: '12px', color: '#666' }),
        ...marginAndPaddingStyle({ margin: '0' }),
      },
    },
  },
  children: {
    icon: {
      value: children.icon,
      name: 'icon图片',
      remark: '尺寸参考:40*40',
    },
    title: {
      value: children.title,
      name: '标题文字',
    },
    content: {
      value: children.content,
      name: '详细说明',
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    content4: {
      style: {
        ...offsetStyle({ height: '100vh' }),
        ...bgStyle(),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
      },
      stylePhone: {
        ...offsetStyle({ height: '900px' }),
        ...bgStyle({ isMode: true }),
        ...borderStyle({ width: '0px', style: 'none', color: '#666' }),
      },
    },
    content4_title: {
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
        ...marginAndPaddingStyle({ margin: 'auto' }),
      },
      children: {
        value: '蚂蚁金融云提供专业的服务',
        name: '标题文字',
      },
    },
    content4_titleContent: {
      style: {
        ...textStyle({
          lineHeight: '24px',
        }),
        maxWidth: {
          value: '600px',
          name: '最大宽度',
        },
      },
      children: {
        value: '基于阿里云强大的基础资源',
        name: '说明内容',
      },
    },
    content4_contentWrapper: {
      style: {
        ...offsetStyle({ top: '20%', height: '60%' }),
        '$ > ul > li': {
          name: '子级全部 li 样式',
          style: {
            ...offsetStyle({ width: '33.33%' }),
            ...marginAndPaddingStyle({ padding: '6% 5% 0' }),
          },
        },
        '$ .img': {
          name: '全部 icon 样式',
          style: {
            ...offsetStyle({ width: '15%' }),
            ...marginAndPaddingStyle({ margin: '0', padding: '0' }),
          },
        },
        '.content2 $ .text': {
          name: '全部文字区块样式',
          style: {
            ...offsetStyle({ width: '85%' }),
            ...marginAndPaddingStyle({ margin: '0', padding: '0 0 0 8%' }),
          },
        },
        '$ .text h1': {
          name: '全部标题样式',
          style: {
            ...textStyle({
              size: '32px',
              color: '#404040',
            }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
        '$ .text p': {
          name: '全部内容样式',
          style: {
            ...textStyle({ size: '12px', color: '#666' }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ height: '610px' }),
        ...marginAndPaddingStyle({ margin: '20px auto' }),
        '$>li': {
          name: '子级全部 li 样式',
          stylePhone: {
            ...offsetStyle({ width: '90%' }),
            ...marginAndPaddingStyle({ padding: '6% 5% 0' }),
          },
        },
        '$ .img': {
          name: '全部 icon 样式',
          stylePhone: {
            ...offsetStyle({ width: '15%' }),
            ...marginAndPaddingStyle({ margin: '0', padding: '0' }),
          },
        },
        '.content2 $ .text': {
          name: '全部文字区块样式',
          stylePhone: {
            ...offsetStyle({ width: '85%' }),
            ...marginAndPaddingStyle({ margin: '0', padding: '0 0 0 8%' }),
          },
        },
        '$ .text h1': {
          name: '全部标题样式',
          stylePhone: {
            ...textStyle({
              size: '32px',
              color: '#404040',
            }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
        '$ .text p': {
          name: '全部内容样式',
          stylePhone: {
            ...textStyle({ size: '12px', color: '#666' }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
      },
    },
    content4_block0: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
      title: '企业资源管理',
      content: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
    }),
    content4_block1: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
      title: '云安全',
      content: '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。',
    }),
    content4_block2: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
      title: '云监控',
      content: '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。',
    }),
    content4_block3: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
      title: '移动',
      content: '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。',
    }),
    content4_block4: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
      title: '分布式中间件',
      content: '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
    }),
    content4_block5: getLiBlock({
      icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
      title: '大数据',
      content: '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。',
    }),
  },
};
