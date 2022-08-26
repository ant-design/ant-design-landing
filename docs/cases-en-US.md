---
order: 3
title: 
  zh-CN: 实践案例
  en-US: Case
---

At the moment, there are many use cases of the Ant Design Landing system outside of the Ant Group. If your page wants to be displayed here, [you can leave us a message](https://github.com/ant-design/ant-motion/issues/30)..

```__react
const casesData = [
   { title: 'Ant Technology Official Website', content:'Ant Financial Technology, The New Force of Digital Finance', url: 'https://tech.antfin.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/vHQCWlZGnFSYiPOnbluw.jpg' },
   { title: 'Ant Design official website', content: 'Design system for enterprise-level products. ', url: 'https://ant.design/', img: 'https://gw.alipayobjects.com/zos/rmsportal/yYQUqTuAxwHzSgGEGqkE.jpg' },
   { title: 'Morpho', content: 'Provide professional cloud website building services to meet the individual needs of different industries', url: 'https://morpho.alipay.com/domain-intro', img: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*YHa3S5yO6EsAAAAAAAAAAABkARQnAQ' },
   { title: 'Intelligent Material Design Platform', content: 'Spend less time on more professional materials', url: 'https://chitu.alipay.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/aBwXHHpGMhIrnhUPUYVW.jpg' },
];

import React from 'react';
import Demo from '../site/theme/template/Other/Cases';
ReactDOM.render(<Demo data={casesData} />, mountNode);
```