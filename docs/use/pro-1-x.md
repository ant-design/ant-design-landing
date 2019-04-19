---
order: 5
category:
  zh-CN: 使用教程
  en-US: Tutorial
title: 
  zh-CN: pro 1.x 里使用
  en-US: Use in pro 1.x
---

> 蚂蚁金服用户同学可直接查看 [Bigfish 的新增页面](https://docs.antfin.com/basement/bigfish/newpage)

[Ant Design pro](https://pro.ant.design) 是 Ant Design 推出的一个开箱即用的中台前端/设计解决方案。

基本配置请查看 [开始使用](docs/use/getting-started);

## 文件路径 

[Ant Design pro](https://pro.ant.design) 使用的为 dva 脚手架，文件目录同样为 `src/routes`, 首先我们需要将下载的 Home 文件包直接复制到 routes 文件夹下。

## 修改路由

我们提供了两种方案： 1. 直接新增页面。 2. 更改 pro 的主路由。详细请查看下方；

### 直接新增页面

复制完成后，首页我们在顶部引入 Home, 命名为 IndexPage。

```jsx
import IndexPage from './routes/Home';
```

然后在 pro 的路由上添加 Route, 由于 pro 占了 `/` 主路由，我们将 path 设为 `/home` 即可。

```jsx 
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
+         <Route path="/home" component={IndexPage} />  {/* 增加在此处 */} 
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}
```
### 更换 pro 的主路由

由于 pro 里没有自定义变量来管理路由，所以需手动修改，首先更改 routerConfig 的路径， 参照以下步骤；

#### router.js

文件地址： `src/common/router.js`;

首先需要修改 `router.js` 里的除 `user` 相关的地址以外的路径，增加个前辍，如 `/dashboards`;
```jsx
  const routerConfig = {
+   '/dashboards': {
-   '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
+   '/dashboards/dashboard/analysis': {
-   '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    ...
```

#### menu.js

文件地址： `src/common/menu.js`;

将里面的 `path` 除 `user` 相关的地址以外同样前面加上 `dashboards/`;

```jsx
const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
+   path: 'dashboards/dashboard',
-   path: 'dashboard',
    children: [
      {
  ...
```

#### BasicLaout.js

文件地址： `src/layout/BasicLaout.js`;

将 `getBashRedirect` 的路径改为 `'/dashboards'`, 再将 `redirct` 的 `from` 改为 `/dashboards`

```jsx
  ...
+ item => check(routerData[item].authority, item) && item !== '/dashboards'
- item => check(routerData[item].authority, item) && item !== '/'
  ...
+ <Redirect exact from="/dashboards" to={bashRedirect} />
- <Redirect exact from="/" to={bashRedirect} />
  ...
```

#### login.js

文件地址： `src/models/login.js`; 

只需将登录或注册完成后改成 `/dashboards` 即可；

```jsx
  ...
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
+       yield put(routerRedux.push('/dashboards'));
-       yield put(routerRedux.push('/'));
      }
    },
  ...
```

#### 在 layouts 下增加自已网站的 layout 文件

文件地址： `src/layout/PageLayout.js` 新增;

命名为: `PageLayout.jsx`; 然后在 router.js 上加上 `<Route path="/" component={PageLayout} />`  layout 上就可以增加网站的内容了。

PageLayout.jsx

```jsx
import React from 'react';
import Home from '../routes/Home';

export default class LandingLayout extends React.Component {
  render(){
    return (<Home />);
  }
} 
```

#### router.js

文件地址： `src/router.js`;

将 `AuthorizedRoute` 的 path 改为 `/dashboards`, 新增 `/` 的 `Route` 到自已的 `layout` 文件, 顺便再新增个 404 路由； 

```jsx
  ...
+ import NotFound from './routes/Exception/404';
+ import PageLayout from './layouts/PageLayout';
  ...
+ const BasicLayout = routerData['/dashboards'].component;
- const BasicLayout = routerData['/'].component;  
  ...
+     <Route exact path="/" component={PageLayout} />
      <Route path="/user" component={UserLayout} />
      <AuthorizedRoute
+       path="/dashboards"
-       path="/"
        render={props => <BasicLayout {...props} />}
        authority={['admin', 'user']}
        redirectPath="/user/login"
      />
+     <Route render={NotFound} /> {/*增加 404*/}
  ...
```

## CSS Modules

具体参考 [开如使用里的 global](docs/use/getting-started#样式);
