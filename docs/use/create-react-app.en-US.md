---
order: 1
category: Tutorial
title: Use in create-react-app
---

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
    // Support for mobile resolutions
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
