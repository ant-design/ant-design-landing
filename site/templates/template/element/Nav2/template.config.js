const component = require('./index');
const less = require('!raw-loader!./index.less');
const templateStr = require('!raw-loader!./index');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    isScrollLink: true,
    wrapper: {
      className: 'header2 home-page-wrapper',
    },
    page: {
      className: 'home-page',
    },
    logo: {
      className: 'header2-logo',
      children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
    },
    Menu: {
      className: 'header2-menu',
      children: [

      ],
    },
    mobileMenu: {
      className: 'header2-mobile-menu',
    },
  },
};
