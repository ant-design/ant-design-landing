

const component = require('./index');
const less = require('!raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

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
    OverPack: {
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
      className: 'content-wrapper',
      children: [
        {
          name: 'block0',
          md: 6,
          xs: 24,
          className: 'block-wrapper',
          children: {
            className: 'block',
            img: {
              className: 'content9-img',
              children: 'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
            },
            title: {
              className: 'content9-title',
              children: 'Jack',
            },
            content: {
              className: 'content9-content',
              children: '公司+职位 信息暂缺',
            },
          },
        },
      ],
    },
  },
};
