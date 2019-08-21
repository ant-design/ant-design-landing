import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';

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
    Menu: {
      className: 'header0-menu',
      children: [
        {
          name: 'item0',
          className: 'header0-item',
          children: {
            href: '#',
            children: [
              {
                children: '导航一',
                name: 'text',
              },
            ],
          },
          subItem: [
            {
              name: 'sub0',
              className: 'item-sub',
              children: {
                className: 'item-sub-item',
                children: [
                  {
                    name: 'image0',
                    className: 'item-image',
                    children: 'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                  },
                  {
                    name: 'title',
                    className: 'item-title',
                    children: 'Ant Design',
                  },
                  {
                    name: 'content',
                    className: 'item-content',
                    children: '企业级 UI 设计体系',
                  },
                ],
              },
            },
            {
              name: 'sub1',
              className: 'item-sub',
              children: {
                className: 'item-sub-item',
                children: [
                  {
                    name: 'image0',
                    className: 'item-image',
                    children: 'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg',
                  },
                  {
                    name: 'title',
                    className: 'item-title',
                    children: 'Ant Design',
                  },
                  {
                    name: 'content',
                    className: 'item-content',
                    children: '企业级 UI 设计体系',
                  },
                ],
              },
            },
          ],
        },
        {
          name: 'item1',
          className: 'header0-item',
          children: {
            href: '#',
            children: [
              {
                children: '导航二',
                name: 'text',
              },
            ],
          },
        },
        {
          name: 'item2',
          className: 'header0-item',
          children: {
            href: '#',
            children: [
              {
                children: '导航三',
                name: 'text',
              },
            ],
          },
        },
        {
          name: 'item3',
          className: 'header0-item',
          children: {
            href: '#',
            children: [
              {
                children: '导航四',
                name: 'text',
              },
            ],
          },
        },
      ],
    },
    mobileMenu: {
      className: 'header0-mobile-menu',
    },
  },
};
