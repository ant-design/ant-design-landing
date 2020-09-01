import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper feature8-wrapper',
    },
    page: {
      className: 'home-page feature8',
    },
    OverPack: {
      playScale: 0.3,
    },
    titleWrapper: {
      className: 'feature8-title-wrapper',
      children: [
        {
          name: 'title',
          className: 'feature8-title-h1',
          children: '使用流程',
        },
        {
          name: 'content',
          className: 'feature8-title-content',
          children: '流程简单清晰，快速响应需求',
        },
      ],
    },
    childWrapper: {
      className: 'feature8-button-wrapper',
      children: [
        {
          name: 'button',
          className: 'feature8-button',
          children: {
            href: '#',
            children: '立即体验',
          },
        },
      ],
    },
    Carousel: {
      dots: false,
      className: 'feature8-carousel',
      wrapper: {
        className: 'feature8-block-wrapper',
      },
      children: {
        className: 'feature8-block',
        titleWrapper: {
          className: 'feature8-carousel-title-wrapper',
          title: {
            className: 'feature8-carousel-title',
          },
        },
        children: [
          {
            name: 'block0',
            className: 'feature8-block-row',
            gutter: 120,
            title: {
              className: 'feature8-carousel-title-block',
              children: '平台自主训练流程',
            },
            children: [
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child0',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child1',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child2',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child3',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
            ],
          },
          {
            name: 'block1',
            className: 'feature8-block-row',
            gutter: 120,
            title: {
              children: '平台自主训练流程',
              className: 'feature8-carousel-title-block',
            },
            children: [
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child0',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child1',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child2',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
              {
                className: 'feature8-block-col',
                md: 6,
                xs: 24,
                name: 'child3',
                arrow: {
                  className: 'feature8-block-arrow',
                  children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                },
                children: {
                  className: 'feature8-block-child',
                  children: [
                    {
                      name: 'image',
                      className: 'feature8-block-image',
                      children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                    },
                    {
                      name: 'title',
                      className: 'feature8-block-title',
                      children: '需求沟通',
                    },
                    {
                      name: 'content',
                      className: 'feature8-block-content',
                      children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  },
};
