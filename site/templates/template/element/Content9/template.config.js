import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content9-wrapper',
    },
    page: {
      className: 'home-page content9',
    },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'image',
          children: 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
          className: 'title-image',
        },
        {
          name: 'title',
          children: '会议日程',
          className: 'title-h1',
        },
      ],
    },
    block: {
      className: 'timeline',
      children: [
        {
          name: 'block0',
          className: 'block-wrapper',
          playScale: 0.3,
          children: {
            imgWrapper: {
              className: 'image-wrapper',
            },
            textWrapper: {
              className: 'text-wrapper',
            },
            img: {
              className: 'block-img',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
            },
            icon: {
              className: 'block-icon',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg',
            },
            name: {
              className: 'block-name',
              children: '姓名',
            },
            post: {
              className: 'block-post',
              children: '公司 职位',
            },
            time: {
              className: 'block-time',
              children: '09:00 - 10:00',
            },
            title: {
              className: 'block-title',
              children: '开幕致辞',
            },
            content: {
              className: 'block-content',
              children: '',
            },
          },
        },
        {
          name: 'block1',
          className: 'block-wrapper',
          playScale: 0.3,
          children: {
            imgWrapper: {
              className: 'image-wrapper',
            },
            textWrapper: {
              className: 'text-wrapper',
            },
            img: {
              className: 'block-img',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
            },
            icon: {
              className: 'block-icon',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
            },
            name: {
              className: 'block-name',
              children: '姓名',
            },
            post: {
              className: 'block-post',
              children: '公司 职位',
            },
            time: {
              className: 'block-time',
              children: '09:00 - 10:00',
            },
            title: {
              className: 'block-title',
              children: '演示标题 - XYZ',
            },
            content: {
              className: 'block-content',
              children: '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。',
            },
          },
        },
        {
          name: 'block2',
          className: 'block-wrapper',
          playScale: 0.3,
          children: {
            imgWrapper: {
              className: 'image-wrapper',
            },
            textWrapper: {
              className: 'text-wrapper',
            },
            img: {
              className: 'block-img',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
            },
            icon: {
              className: 'block-icon',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
            },
            name: {
              className: 'block-name',
              children: '姓名',
            },
            post: {
              className: 'block-post',
              children: '公司 职位',
            },
            time: {
              className: 'block-time',
              children: '09:00 - 10:00',
            },
            title: {
              className: 'block-title',
              children: '演示标题 - XYZ',
            },
            content: {
              className: 'block-content',
              children: '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。',
            },
          },
        },
        {
          name: 'block3',
          className: 'block-wrapper',
          playScale: 0.3,
          children: {
            imgWrapper: {
              className: 'image-wrapper',
            },
            textWrapper: {
              className: 'text-wrapper',
            },
            img: {
              className: 'block-img',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
            },
            icon: {
              className: 'block-icon',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/agOOBdKEIJlQhfeYhHJc.svg',
            },
            name: {
              className: 'block-name',
              children: '姓名',
            },
            post: {
              className: 'block-post',
              children: '公司 职位',
            },
            time: {
              className: 'block-time',
              children: '09:00 - 10:00',
            },
            title: {
              className: 'block-title',
              children: '演示标题 - XYZ',
            },
            content: {
              className: 'block-content',
              children: '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。',
            },
          },
        },
      ],
    },
  },
};
