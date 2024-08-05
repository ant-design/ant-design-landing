---
order: 4
title: 
  zh-CN: 设计资源
  en-US: Download Sketch
---

这里提供以 Ant Design 设计规范完成的相关设计资源，更多设计资源正在整理和完善中。

```__react
const downloadData = [
  { title: '基础模板', content: '百搭型产品 Landing 模板，拼搭自已的专属产品 Landing Page', name: 'basic', url: 'https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.Landing.Template.sketch', img: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*an5vQIKuBLgAAAAAAAAAAABkARQnAQ' },
  { title: 'Ant Design Home 3.0', content: 'Ant Design 首页的源文件', name: 'antd', url: 'https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.home-3.0.sketch', img: 'https://gw.alipayobjects.com/zos/rmsportal/JhuPtNExKmpFjYKxBSZg.jpg' },
  { title: 'Ant Design Landing', content: 'Ant Design Landing 首页的源文件', name: 'landing', url: 'https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.Landings.home.noImg.sketch', img: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*Ke86RZXx9SkAAAAAAAAAAABjARQnAQ' },
];

import React from 'react';
import Demo from '../site/theme/template/Other/Download';
ReactDOM.render(<Demo data={downloadData}/>, mountNode);
```

