import {
  marginAndPaddingStyle,
  offsetStyle,
  boxShadowStyle,
  positionStyle,
  textStyle,
  bgStyle,
  borderStyle,
} from '../../utils-style';

const component = require('./index');
const less = require('raw-loader!./index.less');

export default {
  component,
  less,
  dataSource: {
    wrapper: {
      className: 'header1 home-page-wrapper',
    },
    page: {
      className: 'home-page',
    },
    logo: {
      className: 'header1-logo',
      children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
    },
    menu: {
      className: 'header1-menu',
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
      className: 'header1-mobile-menu',
    },
    help: {
      className: 'help',
      children: '帮助',
    },
    user: {
    },
  },
};
