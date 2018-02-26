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
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

export default {
  component,
  templateStr,
  less,
  dataSource: {
    nav1: {
      style: {
        ...offsetStyle({ height: '64px', top: '0px' }),
        ...positionStyle({ value: 'relative', name: '导航位置' }),
        ...bgStyle({ color: 'rgba(51, 51, 51, 0.95)', select: 'backgroundColor' }),
        ...boxShadowStyle('0 5px 8px rgba(0,0,0,0.15)'),
      },
    },
    nav1_logo: {
      style: {
        ...offsetStyle({ width: '150px', left: '4%' }),
        lineHeight: {
          value: '64px',
          name: '区块行高',
          remark: '图片垂直居中, 每行的行高',
        },
      },
      children: {
        value: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
        name: 'logo 图片',
      },
    },
    nav1_menu: {
      func: {
        name: '其它功能',
        switch: {
          value: false,
          name: '切换导航',
          type: 'switch',
          isMode: true,
        },
        switchMenu: {
          value: false,
          name: '展开二级',
          type: 'switch',
        },
      },
      style: {
        ...offsetStyle({ height: '64px' }),
        ...textStyle({ color: '#fff', lineHeight: '62px' }),
        ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
        '$ .ant-menu-item-active, $ .ant-menu-item-selected, $ .ant-menu-submenu-selected, $ .ant-menu-submenu-active': {
          name: 'hover 与选中样式',
          style: {
            ...textStyle({ color: '#019BF0' }),
            ...borderStyle({ color: '#019BF0', width: '0px', style: 'none' }),
          },
        },
        '$ .ant-menu-sub': {
          name: '下拉框外框样式',
          style: {
            ...textStyle({ color: 'rgba(102,102,102,0.75)' }),
            ...bgStyle({ color: '#fff', select: ['backgroundColor'] }),
            ...boxShadowStyle('0 1px 6px rgba(0,0,0,0.2)'),
          },
        },
        '$ .ant-menu-sub > li.ant-menu-item': {
          name: '下拉框横条样式',
          style: {
            ...offsetStyle({ height: '42px' }),
            ...textStyle({ lineHeight: '42px', size: '12px' }),

          },
        },
        '$ .ant-menu-sub .ant-menu-item-active': {
          name: '下拉框横条 hover 样式',
          style: {
            ...textStyle({ color: '#019BF0' }),
            ...bgStyle({ color: 'transparent', select: ['backgroundColor'] }),
          },
        },
        '$ .ant-menu-sub .ant-menu-item.ant-menu-item-selected': {
          name: '下拉框横条选中样式',
          style: {
            ...textStyle({ color: '#019BF0' }),
            ...bgStyle({ color: '#ebf7fe', select: ['backgroundColor'] }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({
          top: '0px', right: '20px', width: '16px', height: '14px',
        }),
        ...marginAndPaddingStyle({ margin: 'auto' }),
        '$ .header1-phone-nav-bar em': {
          name: '横条样式',
          stylePhone: {
            ...bgStyle({ color: '#fff', select: 'backgroundColor' }),
          },
        },
        '$ .header1-phone-nav-text': {
          name: '菜单打开后外框',
          stylePhone: {
            ...offsetStyle({
              width: '100%', height: '100%', top: '0px', left: '0px',
            }),
            paddingTop: {
              value: '64px',
              name: 'paddingTop',
            },
            ...bgStyle({ color: '#404040', select: 'backgroundColor' }),
            ...boxShadowStyle('0 0 0 rgba(0,0,0,0)'),
          },
        },
        '$ .header1-phone-nav-text .ant-menu .ant-menu-item, $ .header1-phone-nav-text .ant-menu-submenu': {
          name: '菜单默认',
          stylePhone: {
            ...offsetStyle({ height: '42px' }),
            ...bgStyle({ color: '#404040', select: 'backgroundColor' }),
            ...textStyle({ size: '12px', color: 'rgba(255, 255, 255, 0.67)', lineHeight: '42px' }),
          },
        },
        '$ .header1-phone-nav-text .ant-menu .ant-menu-item-active': {
          name: '菜单经过',
          stylePhone: {
            ...bgStyle({ color: 'transparent', select: 'backgroundColor' }),
            ...textStyle({ color: '#ffffff' }),
          },
        },
        '$ .header1-phone-nav-text .ant-menu .ant-menu-item.ant-menu-item-selected': {
          name: '菜单选中',
          stylePhone: {
            ...bgStyle({ color: '#019BF0', select: 'backgroundColor' }),
            ...textStyle({ color: '#ffffff' }),
          },
        },
      },
      children: {
        menu1: {
          name: '导航一',
          value: '导航一',
        },
        menu2: {
          name: '导航二',
          value: '导航二',
        },
        menu3: {
          name: '导航三',
          value: '导航三',
        },
        menu4: {
          name: '导航四',
          value: '导航四',
        },
      },
    },
  },
};
