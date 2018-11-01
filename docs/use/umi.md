---
order: 1
category:
  zh-CN: 下载使用
  en-US: download-use
title: 
  zh-CN: umi 里使用
  en-US: Use in umi
---

[umi](https://umijs.org/) 脚手架为 [ant design](https://ant.design) 提供的可插拔的企业级 react 应用框架，具体教程[请查看](https://www.youtube.com/watch?v=vkAUGUlYm24&feature=youtu.be)。

使用 demo 地址请查看 [umi-example](https://github.com/ant-motion/landing-umi-example);

## 文件路径

创建文件我们分三步来完成：

- 首先我们创建一个文件目录，在文件夹里创建一个 `src` 文件夹；
- 使用 umi 的 `umi generate page index` 创建一个 `index` 页；
- 我们将从 `landing` 上下载的 `Home` 文件包和 `pages` 放至 `src` 文件包里；

```
|── src
| |── Home 
|    |── less
|    |── index.js
|    └── ...
| └── pages     
|    |── index.js
|    |── index.less
```

## 安装依赖

安装 `react` 和 `react-dom`, `npm install react react-dom --save`;

详细参考[开始使用里的安装依赖](docs/use/getting-started-cn#安装依赖);

这里我们还需要安装 `npm install umi-plugin-react --save-dev`, 再创建 `.umirc.js` 在根目录里, 现在目录结构为：

```
|── node_modules
|  └── ...
|── src
|  └── ...
└── .umirc.js
```

### 添加 `umi-plugin-react`;

在 `.umirc.js` 里添加 `plugins` 即可：

```js
export default {
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
      }
    ],
  ]
}
```

## 修改入口文件

更新刚才创建的 `index` 页面，打开 `index.js`，引入 `Home` 文件包并渲染。

```jsx
- import styles from './index.css';
+ import Home from '../Home';

export default function() {
  return (
-   <div className={styles.normal}>
-     <h1>Page index</h1>
-   </div>
+   <Home />
  );
}
```

## CSS Modules

umi 同样使用了 `css-modules`, 同样我们提供了以下几种解决方案。

### 在全局样式里引用

在 `src` 里新建一个 `global.less`; 在 `global.less` 里引入 `Home` 样式: 

```less
@import './Home/less/antMotionStyle.less';
```

如果选择这个方案，我们需要删除 `Home` 的 `index.jsx` 里的 `import './less/antMotionStyle.less';`

### 使用 css-module 的 global

使用 `css-modules` 的 `global`, 在 `index.less` 里添加 `:global`, 将样式不作转换, `global` 具体使用[请查看开始使用](/docs/use/getting-started#样式)。

### 关闭 css-modules

如果你当前项目为新项目，且对 `css-modules` 并不是太了解，可以选择关闭 `css-modules`，只需要在 `.umirc.js` 文件里增加 `disableCSSModules: true`。

```jsx
export default {
+ disableCSSModules: true,
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
      }
    ],
  ]
}
```

## 完成

完成以上频骤之后，我们再启动 `umi dev` 即可查看在 landing 上下载的模板。