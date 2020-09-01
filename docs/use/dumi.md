---
order: 2
category:
  zh-CN: 使用教程
  en-US: Tutorial
title: 
  zh-CN: dumi 里使用
  en-US: Use in dumi
---

[dumi](https://d.umijs.org/) 基于 [Umi](https://umijs.org/)、为组件开发场景而生的文档工具

使用 demo 地址请查看 [dumi-example](https://github.com/ant-motion/landing-dumi-example);

## 文件路径

我们首先初始化一个站点模式的组件库开发脚手架, 如果没装安 dumi 的，请先查看 dumi 的[轻松上手](https://d.umijs.org/#%E8%BD%BB%E6%9D%BE%E4%B8%8A%E6%89%8B)
```
$ npx @umijs/create-dumi-lib --site
```
安装完后，再将 Home 复制到 docs 里，我们的文件目录为：

```
│── docs
+ │── Home 
| └── index.md
│── src 
│ │── Foo
│ │── index.ts
│ └── ...
│── package.json
│── ...
```

## 安装依赖

安装 dumi 里的依赖: `npm install`;

我们组件的依赖详细参考[开始使用里的安装依赖](docs/use/getting-started#安装依赖);

## 修改首页

更改 index.md, 删掉全部内容，增加 gapless: true, 再在下面添加 code， 最后的 index.md 如下:

```
---
gapless: true
---

<code src="./Home/index.jsx" inline />
```
## 删除 Home 里的 md 文件

将 documentation.md 从文件包里删除；

## 完成

完成以上步骤之后，我们再启动 `npm start` 即可查看在 landing 上下载的模板。
