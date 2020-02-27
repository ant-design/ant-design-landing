---
order: 1
category:
  zh-CN: 设计指引
  en-US: Guide
title: 
  zh-CN: 布局
  en-US: Layout
---

Ant Design 目前提供了两套布局方案: [Layout](https://ant.design/components/layout-cn/) 和 [Grid](https://ant.design/components/grid-cn/), 同样 Landing 的整体布局也是以 8 的倍数来计算。我们以页面宽度来做整体布局，提供以下两种类型:

---

## 百分比类型

<img class="preview-img" align="right" alt="100% 类型示例" description="两边的距离为 4%" src="https://gw.alipayobjects.com/zos/rmsportal/krTDyBweacvtOdScbhVq.jpg">

100% 类型，内容的宽度为 92%, 左右边距为 4%; 

需要注意： 在 banner 使用百分比类型布局后，导航必需也使用百分比类型；


---

## 像素类型

<img class="preview-img" align="right" alt="像素类型示例" description="两边的距离为 24px" src="https://gw.alipayobjects.com/zos/rmsportal/bWJWBtBklmyOlISZyOFi.jpg">

以 1152px 为最大宽度为例，为在响应式方面保证更好的预览效果，我们在最大宽度外面增加了 24px 的边距, 避免屏幕尺寸在低于 1152px 的时候内容贴边, 于是需要将内容区域的最大宽度改为 1200px，再增加 24px 的内边距 `padding: 0 24px`。
