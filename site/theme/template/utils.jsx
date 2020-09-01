export function getMenuItems(moduleData, locale, themeConfig) {
  const menuMeta = moduleData.map((item) => item.meta);
  const menuItems = [];
  const sortFn = (a, b) => (a.order || 0) - (b.order || 0);
  const categoryOrder = themeConfig.categoryOrder;
  const typeOrder = themeConfig.typeOrder;
  menuMeta.sort(sortFn).forEach((meta) => {
    if (!meta.category) {
      menuItems.push(meta);
    } else {
      const category = meta.category[locale] || meta.category;
      let group = menuItems.filter((i) => i.title === category)[0];
      if (!group) {
        group = {
          type: 'category',
          title: category,
          children: [],
          order: categoryOrder[category],
        };
        menuItems.push(group);
      }
      if (meta.type) {
        let type = group.children.filter((i) => i.title === meta.type)[0];
        if (!type) {
          type = {
            type: 'type',
            title: meta.type,
            children: [],
            order: typeOrder[meta.type],
          };
          group.children.push(type);
        }
        type.children.push(meta);
      } else {
        group.children.push(meta);
      }
    }
  });
  return menuItems.map((i) => {
    if (i.children) {
      i.children = i.children.sort(sortFn);
    }
    return i;
  }).sort(sortFn);
}
export function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

export function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  if (!zhCN) { // to enUS
    if (/^\/?index-cn/.test(pathname)) {
      return '/';
    }
    return /\/?index-cn/.test(pathname) ? pathname.replace('/index-cn', '') : pathname.replace('-cn', '');
  } if (pathname === '/') {
    return '/index-cn';
  } if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}

export function ping(callback) {
  // eslint-disable-next-line
  const url =
    'https://private-a'
    + 'lipay'
    + 'objects.alip'
    + 'ay.com/alip'
    + 'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';
  const img = new Image();
  let done;
  const finish = (status) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getURLData(name, url) {
  if (typeof window === 'undefined') {
    return '';
  }
  const myUrl = (url || window.location.hash || '').replace('#', '');
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = myUrl.match(reg);
  return r ? r[2] : null;
}

export function setURLData(name, value, url) {
  if (typeof window === 'undefined') {
    return '';
  }
  let myUrl = (url || window.location.hash || '').replace('#', '');
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = myUrl.match(reg);
  if (value) {
    if (r) {
      myUrl = myUrl.replace(r[0], `${r[1]}${name}=${value}${r[3]}`);
    } else {
      myUrl = myUrl ? `${myUrl}&${name}=${value}` : `#${name}=${value}`;
    }
  } else {
    myUrl = myUrl ? `${myUrl.replace(reg, '')}` : '';
  }
  window.location.hash = myUrl;
}

export function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = document.documentElement[method];
  }
  return ret;
}
