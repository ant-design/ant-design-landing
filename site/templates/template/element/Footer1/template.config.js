import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

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
      gutter: 0,
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
          childWrapper: {
            className: 'slogan',
            children: [
              {
                name: 'content0',
                children: 'Animation specification and components of Ant Design.',
              },
            ],
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
          childWrapper: {
            children: [
              {
                name: 'link0',
                href: '#',
                children: '产品更新记录',
              },
              {
                name: 'link1',
                href: '#',
                children: 'API文档',
              },
              {
                name: 'link2',
                href: '#',
                children: '快速入门',
              },
              {
                name: 'link3',
                href: '#',
                children: '参考指南',
              },
            ],
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
          childWrapper: {
            children: [
              {
                href: '#',
                name: 'link0',
                children: 'FAQ',
              },
              {
                href: '#',
                name: 'link1',
                children: '联系我们',
              },
            ],
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
          childWrapper: {
            children: [
              {
                href: '#',
                name: 'link0',
                children: 'Ant Design',
              },
              {
                href: '#',
                name: 'link1',
                children: 'Ant Motion',
              },
            ],
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
      children: '<span>©2018 by <a href="https://motion.ant.design">Ant Motion</a> All Rights Reserved</span>',
    },
  },
};
