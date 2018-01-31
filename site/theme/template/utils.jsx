
export function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

export function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  if (!zhCN) { // to enUS
    return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    return '/index-cn';
  } else if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
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
  if (r) {
    myUrl = myUrl.replace(r[0], `${r[1]}${name}=${value}${r[3]}`);
  } else {
    myUrl = myUrl ? `${myUrl}&${name}=${value}` : `#${name}=${value}`;
  }
  window.location.hash = myUrl;
}
