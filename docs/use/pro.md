---
order: 4
category:
  zh-CN: 使用教程
  en-US: Tutorial
title: 
  zh-CN: pro 里使用
  en-US: Use in pro
---

[Ant Design pro](https://pro.ant.design) 是 Ant Design 推出的一个开箱即用的中台前端/设计解决方案。

## 文件路径

[Ant Design pro v2.x](https://pro.ant.design) 使用的为 umi 脚手架，文件目录同样为 `src/pages`, 首先我们需要将下载的 Home 文件包直接复制到 `pages` 文件夹下。

## 修改路由

文件目录：  `config/router.config.js`；

修改 `dashboard` 的路由， 增加 `Home` 路由；

```js
export default [
+ { path: '/', component: './Home' }, // 增加 Home 路由
  // user
  {
    path: '/user',
    ...
  },
  // app
  {
-   path: '/',
+   path: '/dashboard', // 更改 dashboard 路由；
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    ...
  },
];
```

## 安装依赖

详细参考[开始使用里的安装依赖](docs/use/getting-started#安装依赖);

## CSS Modules

多方案请查看 [umi 里使用的 css module](/docs/use/umi#CSS-Modules);

这里推荐使用 css-module 的 global;

antMotionStyle.less 如下

```
:global {
  @import './common.less';
  @import './custom.less';
  @import './content.less';
  @import './nav0.less';
  @import './banner0.less';
  ...
}
```

## 暂时先删除换肤插件

由于换肤插件需要重新 build 全部的 less, 暂时不支持 landing 的 less，所以我们先暂时删除换肤插件。

文件目录：`config/config.js`;

删除 `webpackPlugin` 相关的代码：
```jsx
// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
- import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

...

export default {
  // add for transfer to umi
  ...
  manifest: {
    basePath: '/',
  },

- chainWebpack: webpackPlugin,
};

```