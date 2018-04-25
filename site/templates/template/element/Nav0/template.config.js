const component = require('./index');
const less = require('raw-loader!./index.less');

export default {
  component,
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
          children: '导航一',
        },
        {
          name: 'item1',
          children: '导航二',
        },
        {
          name: 'item2',
          children: '导航三',
        },
        {
          name: 'item3',
          children: '导航四',
        },
      ],
    },
    mobileMenu: {
      className: 'header0-mobile-menu',
    },
  },
};
