import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

const getBlock = (children) => ({
  name: children.name,
  className: 'content3-block',
  md: 8,
  xs: 24,
  children: {
    icon: {
      className: 'content3-icon',
      children: children.icon,
    },
    textWrapper: {
      className: 'content3-text',
    },
    title: {
      className: 'content3-title',
      children: children.title,
    },
    content: {
      className: 'content3-content',
      children: children.content,
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content3-wrapper',
    },
    page: {
      className: 'home-page content3',
    },
    OverPack: {
      playScale: 0.3,
    },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: '蚂蚁金融云提供专业的服务',
          className: 'title-h1',
        },
        {
          name: 'content',
          className: 'title-content',
          children: '基于阿里云强大的基础资源',
        },
      ],
    },
    block: {
      className: 'content3-block-wrapper',
      children: [
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          title: '企业资源管理',
          content: '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',
          name: 'block0',
        }),
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          title: '云安全',
          content: '按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。',
          name: 'block1',
        }),
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          title: '云监控',
          content: '分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。',
          name: 'block2',
        }),
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          title: '移动',
          content: '一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。',
          name: 'block3',
        }),
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          title: '分布式中间件',
          content: '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
          name: 'block4',
        }),
        getBlock({
          icon: 'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          title: '大数据',
          content: '一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。',
          name: 'block5',
        }),
      ],
    },
  },
};
