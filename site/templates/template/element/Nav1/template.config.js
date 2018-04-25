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
    help: {
      className: 'help',
      children: '帮助',
    },
  },
};
