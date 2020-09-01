---
order: 2
category:
  zh-CN: 使用教程
  en-US: Tutorial
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
│── src
│ │── Home 
│    │── less
│    │── index.js
│    └── ...
│ └── pages     
│    │── index.js
│    │── index.less
```

## 安装依赖

安装 `react` 和 `react-dom`, `npm install react react-dom --save`;

详细参考[开始使用里的安装依赖](docs/use/getting-started#安装依赖);

这里我们还需要安装 `npm install umi-plugin-react --save-dev`, 再创建 `.umirc.js` 在根目录里, 现在目录结构为：

```
│── node_modules
│  └── ...
│── src
│  └── ...
└── .umirc.js
```

### antd import 插件;

#### 3.0 只需要安装 `@umijs/preset-react` 即可；

`npm i @umijs/preset-react --save-dev`;

#### 2.0 添加 `umi-plugin-react`;

先安装插件 `npm i umi-plugin-react --save-dev`, 再在 `.umirc.js` 里添加 `plugins` 即可：

```js
export default {
  plugins: [
    [
      'umi-plugin-react', {
        antd: true,
      },
    ],
  ],
};
```

## 修改入口文件

更改刚才创建的 `index` 页面，打开 `index.js`，引入 `Home` 文件包并渲染。

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

### 3.0 将自动识别 css modules;

```jsx
import style from 'xxx.less' => 使用 css modules;

import 'xxx.less' => 不使用 css modules;
```

### 2.0 使用以下方法

umi 同样使用了 `css-modules`, 同样我们提供了以下几种解决方案。

#### 在全局样式里引用

在 `src` 里新建一个 `global.less`; 在 `global.less` 里引入 `Home` 样式: 

```less
@import './Home/less/antMotionStyle.less';
```

如果选择这个方案，我们需要删除 `Home` 的 `index.jsx` 里的 `import './less/antMotionStyle.less';`

#### 使用 css-module 的 global

使用 `css-modules` 的 `global`, 在 `index.less` 里添加 `:global`, 将样式不作转换, `global` 具体使用[请查看开始使用](/docs/use/getting-started#样式)。

#### 关闭 css-modules

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

完成以上步骤之后，我们再启动 `umi dev` 即可查看在 landing 上下载的模板。

<div style="width: 100%; height: 1px; background: #e9e9e9"></div>

## 额外内容

如果是单个页面的不必要往下看。


### 多页面路由

**带 router 的 demo 地址 [umi-example#router](https://github.com/ant-motion/landing-umi-example/tree/router);**

此块功能不是必要，如果有多个静态页面的情况下，我们可以在 umi 的 src 下新建 `layouts/index.js` 文件，具体可以查看 [umiJS Global Layout](https://umijs.org/guide/router.html#global-layout)

```diff
│── src
│ │── Home 
│    │── less
│    │── index.js
│    └── ...
│ └── pages     
│    │── index.js
│    │── index.less
+ └── layouts           
+    │── index.js       
```

#### 先转移 Nav 和 Footer

将 `Home` 里的 `Header` 和 `Footer` 提取放到 `layouts/index.js` 里即可。然后再将 `Home/index.js` 里跟 `Header` 和 `Footer` 相关的内容全部删除, 再将 `data.source.js` 里跟 `Header` 和 `Footer` 相关的内容全部剪切到 `layouts/data.source.js` 里。

> **注：文件转移后，请注意修改 import 相关的内容。**

Home/index.js 更改参考 [index.jsx](https://github.com/ant-motion/landing-umi-example/blob/router/src/Home/index.jsx)

```diff
│── src
│ │── Home 
│    │── less
-    │    │── nav0.less  
-    │    │── footer0.less  
*    │── index.js
-    │── Nav0.jsx  
-    │── Footer0.jsx  
*    │── data.source.js
│    └── ...
│ └── pages     
│    │── index.js
│    │── index.less
│    │── page2.js
│ └── layouts           
│    │── index.js  
+    │── Nav0.jsx  
+    │── nav0.less  
+    │── Footer0.jsx  
+    │── footer0.less  
+    │── data.source.js
```

#### 再引入 nav0.less 和 footer0.less 

如果 `less` 引入是 [在全局样式里引用](#在全局样式里引用) 时，我们需要将 `nav0.less` 和 `footer0.less` 以同样的方法引入;


#### 再添加 `layouts/index.js` 内容

```jsx
import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Nav0';
import Footer from './Footer0';

import {
  Nav00DataSource,
  Footer00DataSource,
} from './data.source.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    return (
      <>
        <Header dataSource={Nav00DataSource} isMobile={this.state.isMobile} />
        {this.props.children}
        <Footer dataSource={Footer00DataSource} isMobile={this.state.isMobile} />
      </>
    );
  }
}

export default Layout;
```

### 添加页面

将 `Landing` 上下载的另一个页面换个名称，如 `Page2`, 拷贝到 `src` 文件包里, 注: 不需要 `Nav` 和 `Footer`，然后在 `pages` 里添加 `page2.js`。

```diff
│── src
│ │── Home 
│    │── less
│    │── index.js
│    └── ...
+ │── Page2 
+    │── less
+    │── index.js
+    └── ...
│ └── pages     
│    │── index.js
│    │── index.less
+    │── page2.js
│ └── layouts           
│    │── index.js       
```

#### page2.js

添加文件指向

```jsx
import Page2 from '../Page2';

export default function () {
  return (
    <Page2 />
  );
}
```

#### 修改 Nav0 相关参数

先修改 `layouts` 里的 `Nav0` 文件的标签

##### ./src/layouts/Nav0

```diff
import React from 'react';
...
import { Menu } from 'antd';
+import NavLink from 'umi/navlink';

const Item = Menu.Item;

class Header extends React.Component {
  ....
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
-       <a
+       <NavLink
          {...navData[key].a}
+         href={navData[key].a.href}
+         to={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
-       </a>
+       </NavLink>
      </Item>
  ...
}

export default Header;

```

再修改 `layouts/data.source.js` 里的 `href` 值;

```diff
export const Nav00DataSource = {
  ...
  Menu: {
    className: 'header0-menu',
    children: [
-     { name: 'item0', a: { children: '导航一', href: '' } },
+     { name: 'item0', a: { children: '导航一', href: '/' } },
-     { name: 'item1', a: { children: '导航二', href: '' } },
+     { name: 'item1', a: { children: '导航二', href: '/page2' } },
      { name: 'item2', a: { children: '导航三', href: '' } },
      { name: 'item3', a: { children: '导航四', href: '' } },
    ],
  },
  ...
};
```

### Router 完成

完成以上步骤之后，我们再启动 `umi dev` 即可查看在 landing 上下载的模板, 通过导航切换的可查看多个页面了。