const component = require('./index');
const less = require('raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'header0 home-page-wrapper',
    },
    page: {
      className: 'home-page',
    },
    logo: {
      className: 'header0-logo',
      children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
    },
    menu: {
      className: 'header0-menu',
      children: [
        {
          name: 'item0',
          children: {
            name: '导航一',
            link: '',
          },
        },
        {
          name: 'item1',
          children: {
            name: '导航二',
            link: '',
          },
        },
        {
          name: 'item2',
          children: {
            name: '导航三',
            link: '',
          },
        },
        {
          name: 'item3',
          children: {
            name: '导航四',
            link: '',
          },
        },
      ],
    },
    mobileMenu: {
      className: 'header0-mobile-menu',
    },
  },
};
