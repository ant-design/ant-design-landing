import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    footer0: {
      style: {
        ...offsetStyle({ height: '80px' }),
        ...bgStyle({ color: '#333', select: 'backgroundColor' }),
      },
    },
    footer0_content: {
      style: {
        ...textStyle({
          color: '#666', size: '12px', lineHeight: '1.5em', align: 'center',
        }),
        ...marginAndPaddingStyle({ margin: '20px auto 0' }),
      },
      children: {
        value: 'Copyright © 2017 The Project by <a href="#">Ant Motion</a>. All Rights Reserved',
        name: '版权信息',
      },
    },
  },
};
