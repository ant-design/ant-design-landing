import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  OverPack: {
    apiLink: 'https://motion.ant.design/api/scroll-anim',
    appear: {
      name: <FormattedMessage id="app.edit.overpack.appear" />,
      remark: <FormattedMessage id="app.edit.overpack.appear.remark" />,
      type: 'switch',
      value: true,
    },
    always: {
      name: <FormattedMessage id="app.edit.overpack.always" />,
      value: true,
      type: 'switch',
      remark: <FormattedMessage id="app.edit.overpack.always.remark" />,
    },
    replay: {
      name: <FormattedMessage id="app.edit.overpack.replay" />,
      value: false,
      type: 'switch',
      remark: <FormattedMessage id="app.edit.overpack.replay.remark" />,
    },
    playScale: {
      name: <FormattedMessage id="app.edit.overpack.play-scale" />,
      value: [0.5, 0.5],
      type: 'inputGroup',
      props: {
        max: 1,
        min: 0,
        step: 0.1,
      },
      remark: <FormattedMessage id="app.edit.overpack.play-scale.remark" />,
    },
  },
  BannerAnim: {
    apiLink: 'https://motion.ant.design/api/banner-anim',
    type: {
      name: <FormattedMessage id="app.edit.banner-anim.type" />,
      value: ['across', 'vertical', 'acrossOverlay', 'verticalOverlay', 'gridBar', 'grid'],
      type: 'checkbox',
      props: {
        children: [
          {
            key: 'across',
            name: <FormattedMessage id="app.edit.banner-anim.type.across" />,
          },
          {
            key: 'vertical',
            name: <FormattedMessage id="app.edit.banner-anim.type.vertical" />,
          },
          {
            key: 'acrossOverlay',
            name: <FormattedMessage id="app.edit.banner-anim.type.across-overlay" />,
          },
          {
            key: 'verticalOverlay',
            name: <FormattedMessage id="app.edit.banner-anim.type.vertical-overlay" />,
          },
          {
            key: 'gridBar',
            name: <FormattedMessage id="app.edit.banner-anim.type.grid-bar" />,
          },
          {
            key: 'grid',
            name: <FormattedMessage id="app.edit.banner-anim.type.grid" />,
          },
        ],
      },
    },
    initShow: {
      name: <FormattedMessage id="app.edit.banner-anim.init-show" />,
      value: 0,
      type: 'inputNumber',
      props: {
        min: 1,
        step: 1,
      },
    },
    autoPlay: {
      name: <FormattedMessage id="app.edit.banner-anim.auto-play" />,
      type: 'switch',
      value: false,
    },
    autoPlaySpeed: {
      name: <FormattedMessage id="app.edit.banner-anim.auto-play-speed" />,
      value: 5000,
      type: 'inputNumber',
      remark: <FormattedMessage id="app.edit.banner-anim.auto-play-speed.remark" />,
    },
    sync: {
      name: <FormattedMessage id="app.edit.banner-anim.sync" />,
      value: false,
      type: 'switch',
      remark: <FormattedMessage id="app.edit.banner-anim.sync.remark" />,
    },
  },
  /* BannerBgElement: {
    apiLink: 'https://motion.ant.design/api/banner-anim',
    scrollParallax: {
      name: '背景视差',
      value: null,
      type: 'inputNumber',
      props: {
        min: 1,
      },
    },
  },
  BannerElement: {
    apiLink: 'https://motion.ant.design/api/banner-anim',
    leaveChildHide: {
      name: '出场动画',
      type: 'switch',
      value: false,
      remark: '出场时是否播放子级的出场动画',
    },
  }, */
  Carousel: {
    autoplay: {
      name: <FormattedMessage id="app.edit.banner-anim.auto-play" />,
      type: 'switch',
      value: false,
    },
    dots: {
      name: 'Point',
      type: 'switch',
      value: false,
    },
  },
  Menu: {
    open: {
      name: <FormattedMessage id="app.edit.menu.open" />,
      type: 'switch',
      value: false,
      isMobile: true,
      func: true,
      remark: <FormattedMessage id="app.edit.menu.open.remark" />,
    },
    childMenu: {
      name: <FormattedMessage id="app.edit.menu.child" />,
      type: 'menuChild',
      value: null,
      parentKey: 'Menu',
      remark: <FormattedMessage id="app.edit.menu.child.remark" />,
      defaultData: [
        {
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
    currentMenu: {
      name: <FormattedMessage id="app.edit.menu.child-switch" />,
      type: 'menuSwitch',
      value: {},
      func: true,
    },
  },
  Row: {
    apiLink: 'https://ant.design/components/grid-cn/',
    gutter: {
      name: <FormattedMessage id="app.edit.row.gutter" />,
      type: 'inputNumber',
      value: 0,
    },
  },
  Col: {
    apiLink: 'https://ant.design/components/grid-cn/',
    remark: <FormattedMessage id="app.edit.col.remark" />,
    md: {
      name: <FormattedMessage id="app.edit.col.md" />,
      type: 'inputNumber',
      value: 0,
      props: {
        max: 24,
        min: 0,
      },
    },
    xs: {
      name: <FormattedMessage id="app.edit.col.xs" />,
      type: 'inputNumber',
      value: 0,
      props: {
        max: 24,
        min: 0,
      },
    },
  },
  Table: {
    size: {
      name: <FormattedMessage id="app.edit.table.size" />,
      type: 'select',
      props: {
        children: [
          {
            key: 'default',
            name: 'default',
          },
          {
            key: 'middle',
            name: 'middle',
          },
          {
            key: 'small',
            name: 'small',
          },
        ],
      },
    },
    columns: {
      name: <FormattedMessage id="app.edit.table.columns" />,
      join: ['dataSource', 'children', '$all', 'children'],
      parentKey: 'Table',
      type: 'array',
    },
    dataSource: {
      name: <FormattedMessage id="app.edit.table.dataSource" />,
      type: 'array',
    },
  },
};
