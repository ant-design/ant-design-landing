---
order: 0
category:
  zh-CN: 使用教程
  en-US: Tutorial
title: 
  zh-CN: 开始使用
  en-US: Getting-started
---

Landing 编辑器里下载的文件为 Home 文件包，导出的文件为 [React](https://reactjs.org/) 文件 `.jsx`， 样式采用的为 [less](http://lesscss.org/) 文件 `.less`， 如遇到问题时，建议先学习一下相关的语言特性，再前往 [Landing issues](https://github.com/ant-design/ant-design-landing/issues) 提问。

## 目录结构

```
|── less
|   └── index.less              
|   └── common.less            # 通用样式
|   └── content.less           # 内容模块通用样式
|   └── custom.less            # less 变量文件
|   └── edit.less              # 编辑器里编辑后生成的样式
|   └── Banner0.less *         # 相关模块样式
|   └── Content0.less *
|     ...
|── data.source.js           # 内容数据文件
|── index.js                 # 主入口
|── Banner0.jsx *            # 相关模块
|── Content0.jsx *
|   ...
```

> 以上加 * 号为可配置内容，当你在编辑器里选择了哪些模块，那么将对应出现相对的文件。

### 数据文件

- data.source.js
```jsx
import React from 'react';
export const Banner00DataSource = {
  OverPack: { replay: true, playScale: [0.3, 0.1], className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: (
      <span>
        <img
          width="100%"
          src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png"
          alt="img"
        />
      </span>
    ),
  },
  content: { className: 'banner0-content', children: '一个高效的页面动画解决方案' },
  button: { className: 'banner0-button', children: 'Learn More' },
};
```

所有的内容都在此文件里编辑，组件里以 `{ ...Banner00DataSource.title }` 续用以上参数，以 `props` 传入。

变量名： 请仔细查看里面的变量，变量名为 `模块的名称 + 当前序列 + DataSource`, 如 `Banner00DataSource` 模块名为 `Banner0`， 序列为 `0`。

## 脚手架里使用

请查看相关的脚手架使用说明。

## 安装依赖

我们依赖 ant design 的相关组件，动效依赖 ant motion 里相关动效组件，具体查看以下：

### 基本必要组件依赖

```
npm install antd enquire-js rc-queue-anim rc-scroll-anim rc-tween-one --save;
npm install rc-banner-anim --save;// 如果用的是多屏滑动型的 banner，加上这条;
npm install @ant-design/compatible --save;// 如果使用了 Content7 模块，请加上这条;
```

### 按需加载 ant design

> umi 或 ant design pro 无需安装此项;

```
npm install babel-plugin-import --save-dev;
```

需要注意： 目前加载了全部的 ant design 的 less, 如使用了 `babel-plugin-import`，请将 `less/custom.less` 里的 `@import "~antd/lib/style/index.less";` 更换成 @import "~antd/lib/style/themes/default.less";

详细使用请查看 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

## 配置自定义皮肤

[参考](https://ant.design/docs/react/customize-theme-cn) 里面的 package.theme（推荐);

## 配置 html scale

为更好的响应无线端的使用，Landing 需要你在你的 html 文件的 head 里配置以下代码：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 样式

Ant Design Landing 默认使用 less 作为样式语言，整个文件的 less 没使用 `css-modules` 需直接使用。

如果你的脚手架使用了 `css-modules` 请在 `index.less` 里加上 `:global`, [global 的使用详细查看](https://github.com/css-modules/css-modules#usage-with-preprocessors)

```less
:global {
  @import './global.less';
  @import './common.less';
  @import './custom.less';
  @import './content.less';
  @import './nav.less';
  @import './content0.less';
  @import './footer.less';
  @import './point.less';
  @import './edit.less';
}
```
