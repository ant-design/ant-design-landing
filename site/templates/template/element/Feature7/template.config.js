import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper feature7-wrapper',
    },
    page: {
      className: 'home-page feature7',
    },
    OverPack: {
      playScale: 0.3,
    },
    titleWrapper: {
      className: 'feature7-title-wrapper',
      children: [
        {
          name: 'title',
          className: 'feature7-title-h1',
          children: '图像在线服务',
        },
        {
          name: 'content',
          className: 'feature7-title-content',
          children: '你可以直接快速接入图像能力',
        },
      ],
    },
    blockWrapper: {
      className: 'feature7-block-wrapper',
      gutter: 24,
      children: [
        {
          md: 6,
          xs: 24,
          name: 'block0',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block1',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block2',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block3',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block4',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block5',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block6',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
        {
          md: 6,
          xs: 24,
          name: 'block7',
          className: 'feature7-block',
          children: {
            className: 'feature7-block-group',
            children: [
              {
                name: 'image',
                className: 'feature7-block-image',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg',
              },
              {
                name: 'title',
                className: 'feature7-block-title',
                children: '身份证',
              },
              {
                name: 'content',
                className: 'feature7-block-content',
                children: '识别身份证正反面姓名、身份证号、发证机关等相关信息',
              },
            ],
          },
        },
      ],
    },
  },
};
