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
          a: {
            children: '导航一',
          },
          subItem: [
            {
              name: 'item0',
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
              name: 'item1',
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
