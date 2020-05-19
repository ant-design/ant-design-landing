---
order: 0
category:
  zh-CN: 编辑器教程
  en-US: Edit-help
title: 
  zh-CN: 编辑器使用介绍
  en-US: Editor help
---

这里我们将介绍如何使用编辑器与编辑器里的几块功能，如果在编辑过程中遇到任何问题，都可以在我们的 [issue](https://github.com/ant-design/ant-design-landing/issues) 或 `Hotjar` 里反馈。

## 区块介绍

主要分为四个编辑区块：

<img class="preview-img" align="right" alt="右上角功能条" description="提供树状选择与区块功能编辑"  src="https://gw.alipayobjects.com/zos/rmsportal/zymxSqipeRCeobFxuQnP.png">

**顶部操作区块**
- 保存：对你当前编辑的代码进行保存。（注：数据库流量有限，请不要时时保存，编辑数据在本地会时时保存）
- 预览：时时查看你当前编辑
- 下载代码：下载当前编辑的区块代码，我们提供一个 `Home` 的文件包，详细可参考[开始使用](/docs/use/getting-started)
- 编辑数据：保存或粘帖你的编辑 json 数据
- 新建页面：新建页面或切换你以往新建的页面，下拉菜单上两个按钮功能： 
  - <img src="https://gw.alipayobjects.com/zos/rmsportal/zTiJvnQFzPgdEMsRjxvB.jpg" class="img-basic"/> 直接删除本地数据，更新为线上最后一次保存数据，不同机子上编辑时使用。
  - <img src="https://gw.alipayobjects.com/zos/rmsportal/ZGylAJNxayVfdXMlYYcG.jpg" class="img-basic"/>  删除当前数据。

**添加内容区块**
- 添加内容：选择你需要的模块
- 编辑加密：对编辑器加密（加密功能需要保存，不然无效），加密后将编辑 ID 发送给别人，别人需输入密码才可编辑。
- 实例
- 视频教程
- 查看帮助

**内容编辑区块**
- PC 与无线端切换
- 内容区块编辑：主要编辑区域

**样式或其它编辑区块**
- Child、Props 和样式管理编辑: 详细查看下方
- 其它功能：整屏滚动与锚点

## 编辑区域功能介绍

### 选中元素后，右上角出现的功能条

<img class="preview-img" align="right" alt="右上角功能条" description="提供树状选择与区块功能编辑" src="https://gw.alipayobjects.com/zos/rmsportal/mMVKpRIxSQyyuzMocBnQ.jpg" >

- select 功能： 展示当前选择元素 ID， 下拉里展示当前元素树状父级元素（可选择）。
- Icon 区域，我们提供了 7 种 icon 编辑

<style>
.edit-icon-wrapper{
  padding-left: 16px;
}
.edit-icon-wrapper ul li {
  list-style-type: disc;
}
.edit-icon-demo{
  color: #fff;
  background: #2F54EB;
  padding: 0 8px;
  height: 24px;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  line-height: 24px;
}
</style>

```__react
import React from 'react';
import {
  PictureOutlined,
  PaperClipOutlined,
  BarsOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const iconData = [
  { icon: 'T', content: '编辑当前文字内容。' },
  { icon: <PictureOutlined />, content: '更改图片' },
  { icon: 'Ty', content: 'rc-texty 专属的编辑当前文字内容。' },
  { icon: 'Icon', content: 'ant deisgn icon 的编辑，只需输入 icon 的 type。' },
  { icon: <PaperClipOutlined />, content: '编辑链接。' },
  { icon: <BarsOutlined />, content: '导航 Menu 编辑。' },
  { icon: <VideoCameraOutlined />, content: 'video 地址编辑。' },
];

function Demo() {
  return (
    <div className="edit-icon-wrapper">
      <ul>
        {iconData.map((item, i) => (
          <li key={i.toString()}>
            <span className="edit-icon-demo">
            {item.icon}
            </span>
            {' '}
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
ReactDOM.render(<Demo />, mountNode);
```

### 切换功能条

<img class="preview-img" align="right" alt="切换功能条" description="切换分屏的功能条" src="https://gw.alipayobjects.com/zos/rmsportal/tyeDqfxmDQtsSiUlhuSZ.jpg">

切换区块功能，在多图 banner 和多模块介绍里使用，主要功能：切换至下一屏，添加删除与排序区块。

### 移动区块功能条

<img class="preview-img" align="right" alt="移动区块功能条" description="上下移动区块与删除区块" src="https://gw.alipayobjects.com/zos/rmsportal/XZlMAEyydErXmkzSzbXY.jpg">

将区块移动到上一屏或下一屏的功能，并且可删除整个区块。

## 样式编辑区域功能介绍

### 子级内容编辑

子级可增删的时候出现在右侧的功能；

#### 基本子级编辑

<img class="preview-img" align="right" alt="子级增删" description="移动区块与删除区块" src="https://gw.alipayobjects.com/zos/rmsportal/wbovLkaLfSeczhXWJuVi.jpg">

添加时默认增加最后一条相同的数据。

#### 可选择添加类型

<img class="preview-img" align="right" alt="子级增删" description="可选择添加类型，移动区块与删除区块" src="https://gw.alipayobjects.com/zos/rmsportal/RWDgXBsrZEpDxAIflBNJ.jpg">

带添加类型的添加功能，此功能只限制于标题上使用。

### Props 编辑

如果是选择的元素是组件型式，我们提供相关的 props 编辑。

<img class="preview-img" align="right" alt="props 编辑" src="https://gw.alipayobjects.com/zos/rmsportal/yUWQkRSorCRiXCGlrCOM.jpg">

如 antd 的 Col 组件，可调整栅格大小。

### 样式编辑

<img class="preview-img" align="right" alt="样式编辑" src="https://gw.alipayobjects.com/zos/rmsportal/MGezUVWlekggsYPeZKLP.jpg">

调整当前元素的样式可视化编辑。提供主流功能，如没有你想要的功能可以在 `样式代码编辑` 里直接添加 css 样式，必需要添加正确的 css 格式内容，否则下载时将会出现代码格式化错误。

### 其它功能

<img class="preview-img" align="right" alt="其它功能" src="https://gw.alipayobjects.com/zos/rmsportal/MoOfsnZzXULUYsIOBNlD.jpg">

主要提供：页面锚点功能（`Link 导航` 与此功能相同）和整屏滚动。


### 导入及导出编辑器内容

如果你需要导入，或者导出编辑器内容，可以点击顶部菜单的小扳手图样，在出来的窗口中。点下载JSON，就是导出编辑数据，然后粘贴JSON数据，实际上就是导入（你之前导出的JSON文件）。
