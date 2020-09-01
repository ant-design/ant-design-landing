import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  less,
  templateStr,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content2-wrapper',
    },
    OverPack: {
      className: 'home-page content2',
      playScale: 0.3,
    },
    imgWrapper: {
      className: 'content2-img',
      md: 10,
      xs: 24,
    },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/tvQTfCupGUFKSfQ.png',
    },
    textWrapper: {
      className: 'content2-text',
      md: 14,
      xs: 24,
    },
    title: {
      className: 'content2-title',
      children: '分布式中间件',
    },
    content: {
      className: 'content2-content',
      children: '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。'
      + '金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。',
    },
  },
};
