---
order: 3
title:
  zh-CN: 实践案例
  en-US: Case
  gl-ES: Caso de estudo
---

Actualmente, existen moitos produtos externos creados,  se queres tamén podes mostrar túa páxina aquí,，[Mensaxe de benvida](https://github.com/ant-design/ant-motion/issues/30)。

```__react
const casesData = [
  { title: '蚂蚁科技官网', content: '蚂蚁金融科技，数字金融新原力', url: 'https://tech.antfin.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/vHQCWlZGnFSYiPOnbluw.jpg' },
  { title: 'Ant Design官网', content: '服务于企业级产品的设计体系。', url: 'https://ant.design/', img: 'https://gw.alipayobjects.com/zos/rmsportal/yYQUqTuAxwHzSgGEGqkE.jpg' },
  { title: '闪蝶', content: '提供专业的云上建站服务，满足不同行业的个性化需求', url: 'https://morpho.alipay.com/domain-intro', img: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*YHa3S5yO6EsAAAAAAAAAAABkARQnAQ' },
  { title: '智能物料设计平台', content: '花更少的时间做更专业的物料', url: 'https://chitu.alipay.com/', img: 'https://gw.alipayobjects.com/zos/rmsportal/aBwXHHpGMhIrnhUPUYVW.jpg' },
];

import React from 'react';
import Demo from '../site/theme/template/Other/Cases';
ReactDOM.render(<Demo data={casesData}/>, mountNode);
```
