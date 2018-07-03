export default {
  OverPack: {
    apiLink: 'https://motion.ant.design/api/scroll-anim',
    appear: {
      name: '首次出现',
      remark: '是否开启进场动画, 关闭则不做第一次进场动画',
      type: 'switch',
      value: true,
    },
    always: {
      name: '无限重复',
      value: true,
      type: 'switch',
      remark: '随滚动重复播放，每次滚动到指定区域都将会有动画。关闭将只播放一次动画，元素出现后将不会有动画',
    },
    replay: {
      name: '上滚播放',
      value: false,
      type: 'switch',
      remark: '每次显示当前时是否都需要动画, 关闭则只有上往下滚时才有动画',
    },
    playScale: {
      name: '播放区域',
      value: [0.5, 0.5],
      type: 'inputGroup',
      props: {
        max: 1,
        min: 0,
        step: 0.1,
      },
      remark: '在标签元素进入屏幕指定区域开始播放动，0.5 为屏幕中间。第一个为进场，第二个为出场',
    },
  },
  BannerAnim: {
    apiLink: 'https://motion.ant.design/api/banner-anim',
    type: {
      name: '动画效果',
      value: ['across', 'vertical', 'acrossOverlay', 'verticalOverlay', 'gridBar', 'grid'],
      type: 'checkbox',
      props: {
        children: [
          {
            key: 'across',
            name: '横向滚动',
          },
          {
            key: 'vertical',
            name: '竖向滚动',
          },
          {
            key: 'acrossOverlay',
            name: '横向叠加',
          },
          {
            key: 'verticalOverlay',
            name: '竖向叠加',
          },
          {
            key: 'gridBar',
            name: '条形切换',
          },
          {
            key: 'grid',
            name: '网格切换',
          },
        ],
      },
    },
    ininShow: {
      name: '开始显示',
      value: 0,
      type: 'inputNumber',
      props: {
        min: 1,
        step: 1,
      },
    },
    autoPlay: {
      name: '自动播放',
      type: 'switch',
      value: false,
    },
    autoPlaySpeed: {
      name: '播放时间',
      value: 5000,
      type: 'inputNumber',
      remark: '自动播放时间，默认为 5000 毫秒',
    },
    sync: {
      name: '同步播放',
      value: false,
      type: 'switch',
      remark: '滑动与子级动画是否同步播放, 如果动画快过切换的速度将没有动画',
    },
  },
  BannerBgElement: {
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
  },
  Menu: {
    open: {
      name: '展开导航',
      type: 'switch',
      value: false,
      func: true,
      remark: '只适用在 mobile，如果打开状态点击到别处编辑，需要关闭请重新切换。',
    },
  },
  Row: {
    apiLink: 'https://ant.design/components/grid-cn/',
    gutter: {
      name: '栅格间隔',
      type: 'inputNumber',
      value: 0,
    },
  },
  Col: {
    apiLink: 'https://ant.design/components/grid-cn/',
    remark: '此处为 antd grid 布局，请不要随意更改下面样式宽度，请在此修改栅格',
    md: {
      name: '桌面栅格',
      type: 'inputNumber',
      value: 0,
      props: {
        max: 24,
        min: 0,
      },
    },
    xs: {
      name: '手机栅格',
      type: 'inputNumber',
      value: 0,
      props: {
        max: 24,
        min: 0,
      },
    },
  },
};
