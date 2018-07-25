const component = require('./index');
const less = require('!raw-loader!./index.less');
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
          a: {
            children: '导航一',
            href: '',
          },
        },
        {
          name: 'item1',
          a: {
            children: '导航二',
            href: '',
          },
        },
        {
          name: 'item2',
          a: {
            children: '导航三',
            href: '',
          },
        },
        {
          name: 'item3',
          a: {
            children: '导航四',
            href: '',
          },
        },
      ],
    },
    mobileMenu: {
      className: 'header0-mobile-menu',
    },
  },
};
