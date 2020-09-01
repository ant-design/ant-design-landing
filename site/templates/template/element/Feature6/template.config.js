import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper feature6-wrapper',
    },
    OverPack: {
      className: 'home-page feature6',
      playScale: 0.3,
    },
    Carousel: {
      className: 'feature6-content',
      dots: false,
      wrapper: {
        className: 'feature6-content-wrapper',
      },
      titleWrapper: {
        className: 'feature6-title-wrapper',
        barWrapper: {
          className: 'feature6-title-bar-wrapper',
          children: {
            className: 'feature6-title-bar',
          },
        },
        title: {
          className: 'feature6-title',
        },
      },
      children: [
        {
          title: {
            className: 'feature6-title-text',
            children: '服务指标',
          },
          className: 'feature6-item',
          name: 'block0',
          children: [
            {
              md: 8,
              xs: 24,
              className: 'feature6-number-wrapper',
              name: 'child0',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '万',
                },
                toText: true,
                children: '116',
              },
              children: {

                className: 'feature6-text',
                children: '模型数据',
              },
            },
            {
              md: 8,
              xs: 24,
              className: 'feature6-number-wrapper',
              name: 'child1',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '亿',
                },
                toText: true,
                children: '1.17',
              },
              children: {
                className: 'feature6-text',
                children: '模型迭代数量',
              },
            },
            {
              md: 8,
              xs: 24,
              className: 'feature6-number-wrapper',
              name: 'child2',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '亿',
                },
                toText: true,
                children: '2.10',
              },
              children: {
                className: 'feature6-text',
                children: '训练样本数量',
              },
            },
          ],
        },
        {
          title: {
            className: 'feature6-title-text',
            children: '服务指标',
          },
          className: 'feature6-item',
          name: 'block1',
          children: [
            {
              md: 8,
              xs: 24,
              name: 'child0',
              className: 'feature6-number-wrapper',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '万',
                },
                toText: true,
                children: '116',
              },
              children: {

                className: 'feature6-text',
                children: '模型数据',
              },
            },
            {
              md: 8,
              xs: 24,
              name: 'child1',
              className: 'feature6-number-wrapper',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '亿',
                },
                toText: true,
                children: '1.17',
              },
              children: {
                className: 'feature6-text',
                children: '模型迭代数量',
              },
            },
            {
              md: 8,
              xs: 24,
              name: 'child2',
              className: 'feature6-number-wrapper',
              number: {
                className: 'feature6-number',
                unit: {
                  className: 'feature6-unit',
                  children: '亿',
                },
                toText: true,
                children: '2.10',
              },
              children: {
                className: 'feature6-text',
                children: '训练样本数量',
              },
            },
          ],
        },
      ],
    },
  },
};
