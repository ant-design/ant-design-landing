import component from './index';
import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

export default {
  component,
  templateStr,
  less,
  dataSource: {
    wrapper: {
      className: 'home-page-wrapper content10-wrapper',
    },
    Content: {
      className: 'icon-wrapper',
      children: {
        icon: {
          className: 'icon',
          children: 'https://gw.alipayobjects.com/zos/rmsportal/zIUVomgdcKEKcnnQdOzw.svg',
          name: '主要图标',
        },
        iconShadow: {
          className: 'icon-shadow',
          children: 'https://gw.alipayobjects.com/zos/rmsportal/WIePwurYppfVvDNASZRN.svg',
          name: '图标影阴',
        },
        url: {
          children: 'https://gaode.com/place/B0FFH3KPBX',
          name: '跳转地址',
        },
        title: {
          children: '大会地址',
          name: '弹框标题',
        },
        content: {
          children: '蚂蚁 Z 空间  浙江省杭州市西湖区西溪路556号',
          name: '弹框内容',
        },
      },
    },
  },
};
