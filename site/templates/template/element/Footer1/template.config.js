import {
  marginAndPaddingStyle,
  offsetStyle,
  textStyle,
  bgStyle,
  borderStyle,
} from '../../utils-style';

const component = require('./index');
const templateStr = require('!raw!./index.text');
const less = require('!raw!./index.less');

const getBlock = (data = {}) => ({
  style: {
    ...textStyle({ width: '20%' }),
    ...marginAndPaddingStyle({ padding: '10px' }),
    '.footer1 $ h2': {
      name: '标题样式',
      style: {
        ...textStyle({ size: '24px', color: '#ccc' }),
        ...marginAndPaddingStyle({ margin: '0 0 20px 0' }),
      },
    },
    '.footer1 $ ul li a': {
      name: '链接样式',
      style: {
        ...textStyle({ size: '12px', color: '#666', lineHeight: '1.5em' }),
      },
    },
    '.footer1 $ ul li a:hover': {
      name: '链接 hover 样式',
      style: {
        ...textStyle({ size: '12px', color: '#CCC', lineHeight: '1.5em' }),
      },
    },
  },
  stylePhone: {
    ...textStyle({ width: '100%' }),
    ...marginAndPaddingStyle({ padding: '10px' }),
    '.footer1 $ h2': {
      name: '标题样式',
      stylePhone: {
        ...textStyle({ size: '24px', color: '#ccc' }),
        ...marginAndPaddingStyle({ margin: '0 0 10px 0' }),
      },
    },
    '.footer1 $ ul li a': {
      name: '链接样式',
      stylePhone: {
        ...textStyle({ size: '12px', color: '#666', lineHeight: '1.5em' }),
      },
    },
    '.footer1 $ ul li a:hover': {
      name: '链接 hover 样式',
      stylePhone: {
        ...textStyle({ size: '12px', color: '#CCC', lineHeight: '1.5em' }),
      },
    },
  },
  children: {
    title: {
      name: '标题名称',
      value: data.title || '产品',
    },
    content: {
      name: '文字内容',
      value: data.content || '产品更新记录\nAPI文档\n快速入门\n参考指南',
      remark: '与下面的链接地址相对应，一行一个',
    },
    contentLink: {
      name: '链接地址',
      value: data.link || '#\n#\n#\n#',
      remark: '与上面的文字内容相对应，一行一个',
    },
  },
});

export default {
  component,
  templateStr,
  less,
  dataSource: {
    footer1: {
      style: {
        ...offsetStyle({ height: '400px' }),
        ...bgStyle({ color: '#333' }),
      },
      stylePhone: {
        ...offsetStyle({ height: '550px' }),
        ...bgStyle({ color: '#333', isMode: true }),
      },
    },
    footer1_logo: {
      style: {
        ...offsetStyle({ width: '20%' }),
        ...marginAndPaddingStyle({ padding: '10px' }),
        '$ .logo': {
          name: '图片样式',
          style: {
            ...offsetStyle({ width: '80%', maxWidth: '150px' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
        '$ p': {
          name: '内容编辑',
          style: {
            ...textStyle({ size: '12px', color: '#666', lineHeight: '16px' }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ width: '100%' }),
        ...marginAndPaddingStyle({ padding: '10px' }),
        '$ .logo': {
          name: '图片样式',
          stylePhone: {
            ...offsetStyle({ width: '80%', maxWidth: '150px' }),
            ...marginAndPaddingStyle({ margin: 'auto' }),
          },
        },
        '$ p': {
          name: '内容编辑',
          stylePhone: {
            ...textStyle({ size: '12px', color: '#666', lineHeight: '16px' }),
            ...marginAndPaddingStyle({ margin: '0' }),
          },
        },
      },
      children: {
        img: {
          name: '图片地址',
          value: 'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
        },
        content: {
          name: '标语文案',
          value: 'A efficient motion design solutions',
        },
      },
    },
    footer1_ul: {
      style: {
        ...offsetStyle({ width: '95%', maxWidth: '1200px' }),
        ...marginAndPaddingStyle({ margin: '40px auto 0' }),
        '$ > li': {
          name: '全部内部框样式',
          style: {
            ...textStyle({ width: '20%' }),
            ...marginAndPaddingStyle({ padding: '10px' }),
          },
        },
        '$ > li > h2': {
          name: '全部标题样式',
          style: {
            ...textStyle({ size: '24px', color: '#ccc' }),
            ...marginAndPaddingStyle({ margin: '0 0 20px 0' }),
          },
        },
        '$ > ul > li a': {
          name: '合部链接样式',
          style: {
            ...textStyle({ size: '12px', color: '#666', lineHeight: '1.5em' }),
          },
        },
        '$ > ul > li > a:hover': {
          name: '全部链接 hover 样式',
          style: {
            ...textStyle({ size: '12px', color: '#CCC', lineHeight: '1.5em' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ width: '90%', maxWidth: '1200px' }),
        ...marginAndPaddingStyle({ margin: '20px auto 0', padding: '10px 0' }),
        '$ > li': {
          name: '全部内部框样式',
          stylePhone: {
            ...textStyle({ width: '100%' }),
            ...marginAndPaddingStyle({ padding: '10px' }),
          },
        },
        '$ > li > h2': {
          name: '全部标题样式',
          stylePhone: {
            ...textStyle({ size: '24px', color: '#ccc' }),
            ...marginAndPaddingStyle({ margin: '0 0 10px 0' }),
          },
        },
        '$ > ul > li a': {
          name: '合部链接样式',
          stylePhone: {
            ...textStyle({ size: '12px', color: '#666', lineHeight: '1.5em' }),
          },
        },
        '$ > ul > li > a:hover': {
          name: '全部链接 hover 样式',
          stylePhone: {
            ...textStyle({ size: '12px', color: '#CCC', lineHeight: '1.5em' }),
          },
        },
      },
    },
    footer1_block0: getBlock(),
    footer1_block1: getBlock({
      title: '关于',
      content: 'FAQ\n联系我们',
      link: '#\n#',
    }),
    footer1_block2: getBlock({
      title: '资源',
      content: 'Ant Design\nAnt Design Mobile\nAnt Cool\nAntD Library',
      link: '#\n#\n#\n#',
    }),
    footer1_block3: {
      style: {
        ...textStyle({ width: '20%' }),
        ...marginAndPaddingStyle({ padding: '10px' }),
        '$ ul li.icon': {
          name: 'icon 图片样式',
          style: {
            ...offsetStyle({ width: '20px' }),
            opacity: {
              name: '透明度',
              value: '0.35',
              type: 'string',
            },
          },
        },
        '$ ul li.icon:hover': {
          name: 'icon 图片样式',
          style: {
            ...offsetStyle({ width: '20px' }),
            opacity: {
              name: '透明度',
              value: '1',
              type: 'string',
            },
          },
        },
      },
      stylePhone: {
        ...textStyle({ width: '100%' }),
        ...marginAndPaddingStyle({ padding: '10px' }),
        '$ ul li.icon': {
          name: 'icon 图片样式',
          stylePhone: {
            ...offsetStyle({ width: '20px' }),
            opacity: {
              name: '透明度',
              value: '0.35',
              type: 'string',
            },
          },
        },
        '$ ul li.icon:hover': {
          name: 'icon 图片样式',
          stylePhone: {
            ...offsetStyle({ width: '20px' }),
            opacity: {
              name: '透明度',
              value: '1',
              type: 'string',
            },
          },
        },
      },
      children: {
        title: {
          name: '标题名称',
          value: '关注',
        },
        content: {
          name: '图片地址',
          value: `https://zos.alipayobjects.com/rmsportal/IiCDSwhqYwQHLeU.svg
 https://zos.alipayobjects.com/rmsportal/AXtqVjTullNabao.svg
 https://zos.alipayobjects.com/rmsportal/fhJykUTtceAhYFz.svg
 https://zos.alipayobjects.com/rmsportal/IDZTVybHbaKmoEA.svg`,
          remark: '与下面的链接地址相对应，一行一个',
        },
        contentLink: {
          name: '链接地址',
          value: '#\n#\n#\n#',
          remark: '与上面的文字内容相对应，一行一个',
        },
      },
    },
    footer1_content: {
      style: {
        ...offsetStyle({ height: '80px' }),
        ...borderStyle({
          width: '1px 0 0',
          widthLength: true,
          color: 'rgba(233, 233, 233, 0.1)',
          borderStyle: 'solid',
        }),
        '$ span': {
          name: '内容文字样式',
          style: {
            ...textStyle({ color: '#666', size: '12px' }),
            ...marginAndPaddingStyle({ margin: '20px auto 0' }),
          },
        },
      },
      stylePhone: {
        ...offsetStyle({ height: '80px' }),
        ...borderStyle({
          width: '1px 0 0',
          widthLength: true,
          color: 'rgba(233, 233, 233, 0.1)',
          borderStyle: 'solid',
        }),
        '$ span': {
          name: '内容文字样式',
          stylePhone: {
            ...offsetStyle({ width: '90%' }),
            ...textStyle({ color: '#666', size: '12px' }),
            ...marginAndPaddingStyle({ margin: '20px auto 0' }),
          },
        },
      },
      children: {
        name: '版权信息',
        value: 'Copyright © 2016 The Project by <a href="#">Ant Motion</a>. All Rights Reserved',
      },
    },
  },
};
