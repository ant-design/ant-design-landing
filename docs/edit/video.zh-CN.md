---
order: 1
category:
  zh-CN: 编辑器教程
  en-US: Edit-help
title: 
  zh-CN: 视频教程
  en-US: Video help
---

```__react
import React from 'react';
function Demo(){
  return (
    <div style={{ padding: '16px', background: '#f2f4f5',  }}>
      <video controls width="100%" style={{ display: 'block' }} src="https://gw.alipayobjects.com/os/rmsportal/SarwPFyWpqKjipcHkZFI.mp4" />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode);
```