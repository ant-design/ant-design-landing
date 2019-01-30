
export default {
  template: {
    template: [
      'Nav0_0',
      'Banner0_1',
      'Content0_0',
      'Content5_0',
      'Content3_0',
      'Footer1_0',
    ],
    config: {},
    style: [],
    other: {},
  },
  seeconf: {
    template: [
      'Nav2_0',
      'Banner3_0',
      'Content8_0',
      'Content9_0',
      'Content10_0',
      'Content11_0',
      'Content12_0',
      'Footer2_0',
    ],
    config: {
      Nav2_0: {
        dataSource: {
          Menu: {
            children: [
              {
                name: 'Banner3_0',
                to: 'Banner3_0',
                children: '首页',
                className: 'active menu-item',
              },
              {
                name: 'Content8_0',
                to: 'Content8_0',
                children: '特邀嘉宾',
                className: 'menu-item',
              },
              {
                name: 'Content9_0',
                to: 'Content9_0',
                children: '会议日程',
                className: 'menu-item',
              },
              {
                name: 'Content10_0',
                to: 'Content10_0',
                children: '大会地址',
                className: 'menu-item',
              },
              {
                name: 'Content11_0',
                to: 'Content11_0',
                children: '展台展示',
                className: 'menu-item',
              },
              {
                name: 'Content12_0',
                to: 'Content12_0',
                children: '特别鸣谢',
                className: 'menu-item',
              },
            ],
          },
          wrapper: {
            className: 'header2 home-page-wrapper jrhtw9ph4a-editor_css',
          },
          logo: {
            children:
              'https://gw.alipayobjects.com/os/s/prod/seeconf/9b458a789d9a000312899b42a7542b9c.svg',
          },
        },
      },
    },
    style: [
      {
        cssString:
          'div > .templates-wrapper > .jrhtw9ph4a-editor_css {\n  position: absolute;\n  background-color: rgba(0, 21, 41, 0);\n  box-shadow: none;\n}',
        id: 'div_templates-wrapper_jrhtw9ph4a-editor_css',
      },
      {
        cssString:
          '.home-page > .header2-menu > .active {\n  color: #ffffff;\n}',
        id: 'home-page_header2-menu_active',
      },
      {
        cssString:
          '.home-page > .header2-menu > .menu-item:hover {\n  color: #e0e7ff;\n  border-bottom-color: #ffffff;\n}',
        id: 'home-page_header2-menu_menu-item',
      },
    ],
    other: {},
  },
};
