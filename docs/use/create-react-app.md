---
order: 1
category:
  zh-CN: 使用教程
  en-US: Tutorial
title:
  zh-CN: create-react-app 里使用
  en-US: Use in create-react-app
---

## zh-CN

[create-react-app](https://github.com/facebookincubator/create-react-app) 是业界最优秀的 React 应用开发工具之一，本文会在 create-react-app 创建的工程中使用 Ant Design Landing 的模板。

使用 demo 地址请查看 [landing-create-react-app-example](https://github.com/ant-motion/landing-create-react-app-example);

## 安装与初始化

`create-react-app` 的安装和初始化请查看 [create-react-app](https://github.com/facebook/create-react-app) 或者查看 antd 的 [use-with-create-react-app](https://ant.design/docs/react/use-with-create-react-app-cn#%E5%AE%89%E8%A3%85%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96);

安装完成后，目录结构:
```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
```

## 文件路径

我们直接将从 `Landing` 上下载的 `Home` 文件夹直接拷贝到 `src` 文件包里;

```diff
├── README.md
├── ...
├── public
│   ├── ...
│── src
+   ├── Home
+   │    ├── less
+   │    ├── index.js
+   │    ├── ...
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
```
## 安装依赖

详细参考[开始使用里的安装依赖](docs/use/getting-started#安装依赖);

### less 加载

```
npm install react-app-rewired customize-cra less less-loader
```

## 配置加载 less

安装完 `less 加载` 后， 我们还需要修改 package.json 里的启动配置。

```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

### 创建 `config-overrides.js`

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```diff
├── README.md
├── node_modules
├── package.json
├── .gitignore
+── config-overrides.js
├── public
│   ├── ...
│── src
│   ├── Home
│   └── ...
```
### config-overrides.js

```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // 按需加载 antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 添加加载 less 的 javascriptEnabled 和 antd 的主题配置。
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
);
```

> 本文只引用 antd 的[高级配置](https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)，同样 `eject` 不在本文的讨论范围，`eject` 可以参考 [yarn run eject](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup)。

## 修改入口文件

更改的 `src` 里的 `index.js` 页面，打开 `index.js`，引入 `Home` 文件包并渲染。

#### src/index.js

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
- import App from './App';
+ import App from './Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

## 完成

完成以上步骤之后，我们再启动 `npm start` 即可查看在 landing 上下载的模板。

<div style="width: 100%; height: 1px; background: #e9e9e9"></div>

## 额外内容

如果是单个页面的不必要往下看。

### 多页面路由

**带 router 的 demo 地址[landing-create-react-app-example#router](https://github.com/ant-motion/landing-create-react-app-example/tree/router)**

`create react app` 并没有路由配置，所以我们需要安装 `react-router-dom`。


#### 安装

```
npm install react-router-dom --save
```

#### 配置路由

> react-router 基本使用方法可参考 [Basic Example](https://reacttraining.com/react-router/web/example/basic);

将上述的 [修改入口文件](#修改入口文件) 更改回原始状态，然后对 `APP.js` 进行修改, 详细参考:

##### App.js

添加 `Router` 入口和提取 `Header` 和 `Footer。`

```jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer0';
import Home from './Home';

import {
  Nav00DataSource,
  Footer00DataSource,
} from './Home/data.source.js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class App extends Component {
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
      <Router>
        <div>
          <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
          <Route exact path="/" component={Home} />
          <Footer dataSource={Footer00DataSource} isMobile={this.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;
```

> 注： 如果觉得 enquireScreen 多次出现比较不舒服，可以选择用 React Context 或其它来传递，[React Context 详细参考](https://reactjs.org/docs/context.html)

### 添加面页

将 `Landing` 上下载的另一个页面换个名称，如 `Page2`, 拷贝到 `src` 文件包里, 注: 不需要 `Nav` 和 `Footer`， 然后再在 `App.js` 增加入口。

##### App.js

```jsx
import React, { Component } from 'react';
...
import Home from './Home';
+ import Page2 from './Page2';

....

class App extends Component {
  ...
  render() {
    return (
      <Router>
        <div>
          <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
          <Route exact path="/" component={Home} />
+         <Route exact path="/page2" component={Page2} />
          <Footer dataSource={Footer00DataSource} isMobile={this.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;
```

#### 修改 Nav0 相关参数

先修改 `Home` 里的 `Nav0` 文件的标签

> 也可以将 `Nav0` 和 `Footer0` 提出放至一个文件包里，，如 `Layout`;

##### ./src/Home/Nav0

```diff
import React from 'react';
...
import { Menu } from 'antd';
+import { Link } from "react-router-dom";

const Item = Menu.Item;

class Header extends React.Component {
  ....
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
-       <a
+       <Link
          {...navData[key].a}
+         href={navData[key].a.href}
+         to={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
-       </a>
+       </Link>
      </Item>
  ...
}

export default Header;

```

再修改 `data.source.js` 里的 `href` 值;

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

完成以上步骤之后，我们再启动 `npm start` 即可查看在 landing 上下载的模板, 通过导航切换的可查看多个页面了。

## en-US

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of the best tools for React development in the industry. This article shows how to use Ant Design Landing templates inside a project created with create-react-app.

Check out an example project here: [ant-motion/landing-create-react-app-example](https://github.com/ant-motion/landing-create-react-app-example).

## Installation and app creation
To install and start using `create-react-app`, see [create-react-app](https://github.com/facebook/create-react-app) or see antd's [use-with-create-react-app](https://ant.design/docs/react/use-with-create-react-app-cn#%E5%AE%89%E8%A3%85%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96).

The app will have this directory structure:
```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
```

## Combining the directories
Copy the `Home` folder from `Landing` directly into the `src` folder of the newly created app:

```diff
├── README.md
├── ...
├── public
│   ├── ...
│── src
+   ├── Home
+   │    ├── less
+   │    ├── index.js
+   │    ├── ...
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
```

## Dependencies
See [Getting Started: Dependencies](docs/use/getting-started#安装依赖) for more details.

### Adding support for `less`
```
npm install react-app-rewired customize-cra less less-loader
```

## Configuring `less-loader`
After installing `less-loader`, change the initialization configuration in the `package.json` file.

```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

## Create `config-overrides.js`
Create a file called `config-overrides.js` at the root of the project to modify its default configuration.

```diff
├── README.md
├── node_modules
├── package.json
├── .gitignore
+── config-overrides.js
├── public
│   ├── ...
│── src
│   ├── Home
│   └── ...
```

### `config-overrides.js`
```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // Load antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // Add `javascriptEnabled` and antd theme configuration
  // to the Less loader
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
);
```

> For more advanced configurations, check [antd's advanced configuration](https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE). `eject` is also outside the scope of this article, you can read more about it at the official documentation: [`yarn run eject`](https://github.com/facebookincubator/create-react-app#converting-to-a-custom- setup).

## Modify the entrypoint

Open the `src/index.js` file and import and render the `Home` package.

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
- import App from './App';
+ import App from './Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```

## All set!
After completing the steps above, run `npm start` to view a live version of the downloaded template.

<div style="width: 100%; height: 1px; background: #e9e9e9"></div>

## Extras
There's no need to follow the next instructions if working on a single-page app.

### Routing

**Example project showcasing a router: [ant-motion/landing-create-react-app-example#router](https://github.com/ant-motion/landing-create-react-app-example/tree/)**

`create-react-app` doesn't provide routes, so we need to install `react-router-dom`.

#### Installation
```
npm install react-router-dom --save
```

#### Configuring the routes
> An example of a basic router can be found at [React Router: Basic Example](https://reacttraining.com/react-router/web/example/basic).

Revert the changes indicated in [Modify the entrypoint](#Modify the entrypoint) and modify `App.js`:

##### `App.js`
Add code for the `Router` and import the `Header` and `Footer` components.

```jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer0';
import Home from './Home';

import {
  Nav00DataSource,
  Footer00DataSource,
} from './Home/data.source.js';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class App extends Component {
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
      <Router>
        <div>
          <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
          <Route exact path="/" component={Home} />
          <Footer dataSource={Footer00DataSource} isMobile={this.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;
```

> Note: instead of using `enquireScreen` as shown above, you can use React Context: [React Context Reference](https://reactjs.org/docs/context.html).

### Adding pages
Download another template from Ant Design Landing and rename its folder, so it doesn't collide with the previous one (`Home`); in the example we use `Page2`. Copy it to `src` (you can remove the `Nav` and `Footer` components from this new folder). Add an entry for this new page at `App.js`:

##### `App.js`
```jsx
import React, { Component } from 'react';
...
import Home from './Home';
+ import Page2 from './Page2';

....

class App extends Component {
  ...
  render() {
    return (
      <Router>
        <div>
          <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
          <Route exact path="/" component={Home} />
+         <Route exact path="/page2" component={Page2} />
          <Footer dataSource={Footer00DataSource} isMobile={this.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;
```

#### Configuring `Nav0` properties
First modify the `Nav0` file from the `Home` folder.
> You can also put `Nav0` and `Footer0` into a new folder named `Layout`.

##### `./src/Home/Nav0`
```diff
import React from 'react';
...
import { Menu } from 'antd';
+import { Link } from "react-router-dom";

const Item = Menu.Item;

class Header extends React.Component {
  ....
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
-       <a
+       <Link
          {...navData[key].a}
+         href={navData[key].a.href}
+         to={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
-       </a>
+       </Link>
      </Item>
  ...
}

export default Header;

```

Modify the value of the property `href` in `data.source.js`:
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

### Router set!
After completing the steps above, run `npm start` again to view a live version of the downloaded template. We can now navigate to different pages.
