
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
      Banner3_0: {
        dataSource: {
          textWrapper: {
            children: [
              {
                name: 'nameEn',
                className: 'banner3-name-en jntzoi4tesu-editor_css',
                children: 'Seeking Experience & Engineering Conference',
              },
              {
                name: 'slogan',
                className: 'banner3-slogan',
                children: '首届蚂蚁金服体验科技大会',
                texty: true,
              },
              {
                name: 'name',
                className: 'banner3-name',
                children: '探索极致用户体验与最佳工程实践探索',
              },
              {
                name: 'button',
                className: 'banner3-button',
                children: '立即报名',
              },
              {
                name: 'time',
                className: 'banner3-time',
                children: '2018.01.06 / 中国·杭州',
              },
            ],
          },
        },
      },
      Nav2_0: {
        dataSource: {
          menuLink: {
            children: [
              {
                name: 'Banner3_0',
                to: 'Banner3_0',
                children: '<p>首屏</p>',
                className: 'menu-item active jnu03ta970t-editor_css',
                delete: true,
              },
              {
                name: 'Content8_0',
                to: 'Content8_0',
                children: '<p>特邀嘉宾</p>',
                className: 'menu-item active-editor_css',
              },
              {
                name: 'Content9_0',
                to: 'Content9_0',
                children: '<p>会议日程</p>',
                className: 'menu-item',
              },
              {
                name: 'Content10_0',
                to: 'Content10_0',
                children: '<p>地址</p>',
                className: 'menu-item',
              },
              {
                name: 'Content11_0',
                to: 'Content11_0',
                children: 'Content11_0',
                className: 'menu-item',
                delete: true,
              },
              {
                name: 'Content12_0',
                to: 'Content12_0',
                children: '<p>赞助商</p>',
                className: 'menu-item',
              },
            ],
          },
          wrapper: {
            className:
              'header2 home-page-wrapper header2 home-page-wrapper jnu03e5hwa6-editor_css',
          },
          logo: {
            children:
              'https://gw.alipayobjects.com/os/s/prod/seeconf/9b458a789d9a000312899b42a7542b9c.svg',
          },
          page: {
            className: 'home-page home-page home-page jnu03sdxtga-editor_css',
          },
        },
      },
      Content8_0: {
        dataSource: {
          page: {
            className:
              'home-page content8 home-page content8 jnu21j2rjc-editor_css',
          },
        },
      },
    },
    style: [
      {
        className: '.banner3 > .banner3-text-wrapper > .jntzoi4tesu-editor_css',
        css: {
          default: '  color: #ffffff;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Banner3_0-textWrapper&children&array_name=nameEn',
      },
      {
        className: '.home-page > .header2-menu > .jntztinctro-editor_css',
        css: {
          default: '  text-decoration: overline;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Content10_0',
      },
      {
        className: '.home-page > .header2-menu > .jntzuvh7k9n-editor_css',
        css: {
          default: '  text-decoration: line-through;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Content11_0',
      },
      {
        className: '.home-page > .header2-menu > .jntzxmqtpmn-editor_css',
        css: {
          default: '  text-decoration: overline;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Content12_0',
      },
      {
        className: 'div > .templates-wrapper > .jnu03e5hwa6-editor_css',
        css: {
          default:
            '  position: absolute;\n  background-color: rgba(0, 0, 0, 0);\n  box-shadow: none;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-wrapper',
      },
      {
        className: '.home-page > .header2-menu > .jnu03ta970t-editor_css',
        css: {
          default: '  color: #ffffff;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Banner3_0',
      },
      {
        className: '.templates-wrapper > .header2 > .jnu03sdxtga-editor_css',
        css: {
          default: '  max-width: 100%;\n  padding: 0 2.5%;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-page',
      },
      {
        className: '.home-page > .header2-menu > .menu-item',
        css: {
          default: '',
          hover: '  color: #ffffff;\n  border-bottom-width: 0;',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Content9_0',
      },
      {
        className: '.home-page > .header2-menu > .active-editor_css',
        css: {
          default: '  border-bottom-width: 0;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Nav2_0-menuLink&children&array_name=Content8_0',
      },
      {
        className:
          '.templates-wrapper > .home-page-wrapper > .jnu21j2rjc-editor_css',
        css: {
          default: '  margin: -120px auto auto ;',
          hover: '',
          active: '',
          focus: '',
        },
        mobileCss: { default: '', active: '', focus: '' },
        id: 'Content8_0-page',
      },
    ],
    other: {},
  },
};
