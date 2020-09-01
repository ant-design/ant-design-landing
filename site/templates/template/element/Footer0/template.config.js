import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper footer0-wrapper',
    },
    OverPack: {
      className: 'home-page footer0',
      playScale: 0.05,
    },
    copyright: {
      className: 'copyright',
      children: '<span>©2018 <a href="https://motion.ant.design">Ant Motion</a> All Rights Reserved</span>',
    },
  },
};
