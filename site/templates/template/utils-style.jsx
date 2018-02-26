import { dataToArray } from '../../edit/template/utils';

export function textStyle(_data) {
  const data = _data || {};
  const d = {};
  if ('color' in data) {
    d.color = {
      value: data.color || '#666',
      name: '文字颜色',
    };
  }
  if ('size' in data) {
    d.fontSize = {
      value: data.size || '12px',
      name: '文字大小',
      type: 'number',
    };
  }
  if ('fontFamily' in data) {
    d.fontFamily = {
      value: data.fontFamily,
      name: '字体样式',
      remark: '字体间请用 , 隔开',
    };
  }
  if ('lineHeight' in data) {
    d.lineHeight = {
      value: data.lineHeight || '1.5em',
      name: '文字行高',
      type: 'number',
    };
  }
  if ('align' in data) {
    d.textAlign = {
      value: data.align,
      name: '文字位置',
      select: ['center', 'left', 'right'],
    };
  }
  if ('fontWeight' in data) {
    d.fontWeight = {
      value: data.fontWeight,
      name: '文字加粗',
      select: ['normal', 'bold', 'bolder', 'lighter'],
    };
  }
  return d;
}

export function borderStyle(_data) {
  const data = _data || {};
  const d = {};
  if ('width' in data) {
    d.borderWidth = {
      value: data.width,
      name: '描边线宽',
      length: data.widthLength ? 4 : 0,
      remark: data.widthLength && '参数： 上，右，下，左',
      type: data.widthLength ? ['number', 'number', 'number', 'number'] : 'number',
    };
  }
  if ('style' in data) {
    d.borderStyle = {
      value: data.style,
      name: '描边样式',
      select: [
        { name: '无边框', value: 'none' },
        { name: '实线', value: 'solid' },
        { name: '虚线', value: 'dashed' },
        { name: '点状边框', value: 'dotted' },
        { name: '双线', value: 'double' },
      ],
    };
  }
  if ('color' in data) {
    d.borderColor = {
      value: data.color,
      name: '描边颜色',
    };
  }
  if ('radius' in data) {
    d.borderRadius = {
      value: data.radius,
      name: '圆角样式',
      length: data.radiusLength,
      type: data.radiusType || 'number',
    };
  }
  return d;
}

export function bgStyle(_data) {
  const data = _data || {};
  const d = {
    backgroundColor: {
      value: data.color || '#fff',
      name: '背景颜色',
    },
    backgroundImage: {
      name: '背景图片',
      value: data.image || '',
      remark: data.imageRemark || '尺寸参考:1920*1080',
    },
    backgroundSize: {
      value: data.size || 'inherit',
      name: '背景大小',
      select: ['contain', 'cover', 'inherit'],
      remark: 'css 里的参数，"contain", "cover"等参数',
    },
    backgroundPosition: {
      value: data.position || 'left',
      name: '背景对齐',
      select: ['center', 'top', 'left', 'bottom', 'right',
        'left top', 'left bottom', 'right top', 'right bottom'],
      remark: '参数有: left right center bottom top; 如需配置两个，请以空格格开',
    },
    backgroundBlendMode: {
      value: data.blendMode || 'normal',
      name: '背景滤境',
      select: [
        { name: '正常', value: 'normal' },
        { name: '正片叠底', value: 'multiply' },
        { name: '滤色', value: 'screen' },
        { name: '叠加', value: 'overlay' },
        { name: '变暗', value: 'darken' },
        { name: '变亮', value: 'lighten' },
        { name: '颜色减淡', value: 'color-dodge' },
        { name: '颜色加深', value: 'color-burn' },
        { name: '强光', value: 'hard-light' },
        { name: '柔光', value: 'soft-light' },
        { name: '差值', value: 'difference' },
        { name: '排除', value: 'exclusion' },
        { name: '色相', value: 'hue' },
        { name: '饱和度', value: 'saturation' },
        { name: '颜色', value: 'color' },
        { name: '亮度', value: 'luminosity' },
      ],
      remark: '与psd里的滤镜一样, 在图片和颜色做滤境效果;',
    },
  };


  if ('isBanner' in data) {
    d.position = {
      value: data.attachment || 'relative',
      name: '背景固定',
      select: ['relative', 'fixed'],
      remark: '参数为： "relative", "fixed"; "fixed" 为背景随滚动条滚动',
    };
  } else if (!data.isMode) {
    // 移动端不做锁定..
    d.backgroundAttachment = {
      value: data.attachment || 'scroll',
      name: '背景固定',
      select: ['scroll', 'fixed'],
      remark: '参数为： "scroll", "fixed"; "fixed" 为背景随滚动条滚动',
    };
  }

  if ('select' in data) {
    const select = dataToArray(data.select);
    Object.keys(d).forEach((key) => {
      if (select.indexOf(key) === -1) {
        delete d[key];
      }
    });
  }
  return d;
}

export function marginAndPaddingStyle(data = {}) {
  const d = {};
  if ('margin' in data) {
    d.margin = {
      value: data.margin,
      length: 4,
      name: 'margin',
      remark: '参数: 左上 右上 左下 右下 => top right bottom left. 单位自填.',
    };
  }
  if ('padding' in data) {
    d.padding = {
      value: data.padding,
      length: 4,
      name: 'padding',
      remark: '参数: 左上 右上 左下 右下 => top right bottom left. 单位自填.',
    };
  }
  return d;
}

export function offsetStyle(data = {}) {
  const d = {};
  if ('width' in data) {
    d.width = {
      value: data.width,
      name: '区块宽度',
    };
  }

  if ('maxWidth' in data) {
    d.maxWidth = {
      value: data.maxWidth,
      name: '最大宽度',
    };
  }

  if ('minWidth' in data) {
    d.minWidth = {
      value: data.minWidth,
      name: '最小宽度',
    };
  }

  if ('height' in data) {
    d.height = {
      value: data.height,
      name: '区块高度',
    };
  }

  if ('maxHeight' in data) {
    d.maxHeight = {
      value: data.maxHeight,
      name: '最大高度',
    };
  }

  if ('minHeight' in data) {
    d.minHeight = {
      value: data.minHeight,
      name: '最小高度',
    };
  }

  if ('top' in data) {
    d.top = {
      value: data.top,
      name: '上边距离',
    };
  }
  if ('right' in data) {
    d.right = {
      value: data.right,
      name: '右边距离',
    };
  }

  if ('bottom' in data) {
    d.bottom = {
      value: data.bottom,
      name: '下边距离',
    };
  }

  if ('left' in data) {
    d.left = {
      value: data.left,
      name: '左边距离',
    };
  }
  return d;
}

export function boxShadowStyle(data = '0') {
  return {
    boxShadow: {
      value: data.boxShadow || data.value || data,
      name: '区块阴影',
      remark: '参数从左上右上左下右下: x y blur color;',
      length: 4,
      type: ['number', 'number', 'number', 'color'],
    },
  };
}

export function positionStyle(data = 'relative') {
  return {
    position: {
      value: data.value || data,
      select: ['relative', 'absolute', 'fixed'],
      name: data.name || '定位选择',
      remark: '参数为： "relative", "absolute", "fixed"; "fixed" 为始终浮在窗口；',
    },
  };
}

export function floatStyle(data = 'left') {
  return {
    float: {
      value: data.value || data,
      select: data.select || ['left', 'right'],
      name: data.name || '浮动位置',
    },
  };
}
