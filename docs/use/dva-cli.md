---
order: 3
category:
  zh-CN: 使用教程
  en-US: Tutorial
title: 
  zh-CN: dva-cli 里使用
  en-US: Use in dva
---
[dva](https://github.com/dvajs/dva) 脚手架为 ant design 提供的基于 redux、redux-saga 和 react-router 比较完善的轻量级前端框架，具体教程[请查看](https://github.com/sorrycc/blog/issues/18)。

如何使用 demo 地址请查看 [dva-cli-example](https://github.com/ant-motion/ant-motion-dva-cli-example);

基本配置请查看 [开始使用](docs/use/getting-started);

## 文件路径

[dva-cli](https://github.com/dvajs/dva-cli) 脚手架的文件目录为 `src/routes`, 首先我们需要将下载的 Home 文件包直接复制到 routes 文件夹下。

## 修改路由

复制完成后，我们需要将主页入口修改成以上复制的文件目录。

```jsx
import IndexPage from './routes/Home';
```

## CSS Modules

dva 默认使用了 `css-modules`，同样我们提供了两套解决方案。

### 关闭 css-modules

如果你当前项目为新项目，且对 `css-modules` 并不是太了解，可以选择关闭 `css-modules`，只需要在 `.roadhogrc` 文件里加上 `"disableCSSModules": true` 即可。
```json
{
  "entry": "src/index.js",
+  "disableCSSModules": true, // 加在此处
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  },
}
```

### 使用 global

使用 `css-modules` 的 `global`, 在 `index.less` 里添加 `:global`, 将样式不作转换, `global` 具体使用[请查看开始使用](/docs/use/getting-started#样式)。


## 按需加载

dva 里使用 `babel-plugin-import` 我们只需要 `.roadhogrc` 文件里添加 `["import", { "libraryName": "antd", "style": true }]` 即可。

```json

{
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  },
}
```

## 完成

完成以上频骤之后，我们再启动 `npm start` 即可查看在 landing 上下载的模板。