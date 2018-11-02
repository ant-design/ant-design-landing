---
order: 3
title: 
  zh-CN: 实践案例
  en-US: Case
---

目前在外部也有许多产品实践，如果你的页面想在这里展现，[欢迎留言](https://github.com/ant-design/ant-motion/issues/30)。

```__react
const casesData = [
  { title: '蚂蚁科技官网', content: '蚂蚁金融科技，数字金融新原力', url: 'https://tech.antfin.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/vHQCWlZGnFSYiPOnbluw.jpg' },
  { title: 'Ant Design官网', content: '服务于企业级产品的设计体系。', url: 'https://ant.design/', img: 'https://gw.alipayobjects.com/zos/rmsportal/yYQUqTuAxwHzSgGEGqkE.jpg' },
  { title: '云凤蝶', content: '提供专业的云上建站服务，满足不同行业的个性化需求', url: 'https://www.yunfengdie.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/GezXGXPExUBxdmeOkYvA.jpg' },
  { title: '智能物料设计平台', content: '花更少的时间做更专业的物料', url: 'https://chitu.alipay.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/aBwXHHpGMhIrnhUPUYVW.jpg' },
];

import React from 'react';
import Demo from '../site/theme/template/Other/Cases';
ReactDOM.render(<Demo data={casesData}/>, mountNode);
```