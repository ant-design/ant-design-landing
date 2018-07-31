const component = require('./index');
const templateStr = require('!raw-loader!./index.jsx');
const less = require('!raw-loader!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    OverPack: {
      replay: true,
      playScale: [0.3, 0.1],
      className: 'banner3',
    },
    textWrapper: {
      className: 'banner3-text-wrapper',
      children: [
        { name: 'nameEn', className: 'banner3-name-en', children: 'Seeking Experience & Engineering Conference' },
        { name: 'slogan', className: 'banner3-slogan', children: '首届蚂蚁金服体验科技大会', texty: true },
        { name: 'name', className: 'banner3-name', children: '探索极致用户体验与最佳工程实践探索' },
        { name: 'button', className: 'banner3-button', children: '立即报名' },
        { name: 'time', className: 'banner3-time', children: '2018.01.06 / 中国·杭州' },
      ],
    },
  },
};
