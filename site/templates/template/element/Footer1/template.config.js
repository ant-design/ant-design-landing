

const component = require('./index');
const less = require('!raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper footer1-wrapper',
    },
    OverPack: {
      className: 'footer1',
      playScale: 0.2,
    },
    block: {
      className: 'home-page',
      children: [
        {
          name: 'block0',
          xs: 24,
          md: 6,
          className: 'block',
          title: {
            className: 'logo',
            children: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
          },
          content: {
            className: 'slogan',
            children: 'Animation specification and components of Ant Design.',
          },
        },
        {
          name: 'block1',
          xs: 24,
          md: 6,
          className: 'block',
          title: {
            children: '产品',
          },
          content: {
            children: `<p>
              <a href="#">产品更新记录</a>
            </p>
            <p>
              <a href="#">API文档</a>
            </p>
            <p>
              <a href="#">快速入门</a>
            </p>
            <p>
              <a href="#">参考指南</a>
            </p>`,
          },
        },
        {
          name: 'block2',
          xs: 24,
          md: 6,
          className: 'block',
          title: {
            children: '关于',
          },
          content: {
            children: `<p>
              <a href="#">FAQ</a>
            </p>
            <p>
              <a href="#">联系我们</a>
            </p>`,
          },
        },
        {
          name: 'block3',
          xs: 24,
          md: 6,
          className: 'block',
          title: {
            children: '资源',
          },
          content: {
            children: `<p>
              <a href="#">Ant Design</a>
            </p>
            <p>
              <a href="#">Ant Design</a>
            </p>
            <p>
              <a href="#">Ant Design</a>
            </p>
            <p>
              <a href="#">Ant Design</a>
            </p>`,
          },
        },
      ],
    },
    copyrightWrapper: {
      className: 'copyright-wrapper',
    },
    copyrightPage: {
      className: 'home-page',
    },
    copyright: {
      className: 'copyright',
      children: 'Copyright © 2017 The Project by <a href="#">Ant Motion</a>. All Rights Reserved',
    },
  },
};
