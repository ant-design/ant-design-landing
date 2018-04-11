# 如何使用：

### 1. 导出文件为 react，

### 2. 将 Home 文件包直接拷到 routes 文件夹下。

### 3. 修改 router.js 里的 IndexPage 的路径: 

```jsx
import IndexPage from './routes/Home';
```

### 4. 如果用的是 antd 的脚手架 [dva-cli](https://github.com/dvajs/dva-cli)； dva-cli 的具体教程[请查看](https://github.com/sorrycc/blog/issues/18)，或查看 [dva-cli-example](https://github.com/ant-motion/ant-motion-dva-cli-example);


#### `dva-cli ~0.8.0` 使用了 css-modules 的两个解决方案如下:

 1. 关闭 css-modules, 在 .roadhogrc 文件里加上: "disableCSSModules": true,
 2. 在 antMotion_style.less 里加上 :global, [global 的使用详细查看](https://github.com/css-modules/css-modules#usage-with-preprocessors) 如下: 
```less
:global {
  @import './global.less';
  @import './common.less';
  @import './custom.less';
  @import './content.less';
  @import './nav.less';
  @import './content0.less';
  @import './content1.less';
  @import './content2.less';
  @import './content3.less';
  @import './footer.less';
  @import './point.less';
  @import './edit.less';
}

```
### 5. 安装依赖:
```
npm install antd enquire-js rc-queue-anim rc-scroll-anim rc-tween-one --save;
npm install rc-banner-anim --save;// 如果用的是多屏滑动型的 banner，加上这条。
```

### 6. 按需加载 antd, 安装 babel-plugin-import:

```
npm install babel-plugin-import --save-dev;
```

### 7. 运用 "babel-plugin-import" 滤镜:

> dva-cli: ~0.8.0， 修改 .roadhogrc，在 "extraBabelPlugins" 里加上： ["import", { "libraryName": "antd", "style": true }][参考](https://github.com/dvajs/dva-example-user-dashboard/blob/master/.roadhogrc#L20)

```
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": true }]
  ]
```

### 8. 配置自定义皮肤[参考](https://ant.design/docs/react/customize-theme-cn) 里面的 package.theme（推荐);

### 9. 在你的 index.html 里的 head 里添加上 
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
> dva-cli 的可以忽略；

### 10. 如果不是 dva-cli 脚手架，去除 index.js 里的 show 相关代码;

```jsx
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
```
