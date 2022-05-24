import React from 'react';
import deepEql from 'deep-eql';
import tempData from './templates/template/element/template.config';
import { isZhCN, getLocalizedPathname } from './theme/template/utils';
import { xssHref } from './shared/utils';

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;// /\.(gif|jpg|jpeg|png|svg|JPG|PNG|GIF|JPEG|SVG)$/;

export const tagRep = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g;

export function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function deepCopy(data) {
  if (typeof data !== 'object' || !data) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => deepCopy(item));
  }
  const obj = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].map((item) => deepCopy(item));
      } else {
        obj[key] = deepCopy(data[key]);
      }
    } else {
      obj[key] = data[key];
    }
  });
  return obj;
}

function mergeDataToChild(newData, _data, useDelete) {
  if (!newData) {
    return _data;
  }
  const data = _data;
  Object.keys(newData).forEach((key) => {
    if (typeof newData[key] === 'object') {
      // 数组直接用 newData 的;
      if (Array.isArray(newData[key])) {
        data[key] = newData[key];
        return;
      }
      data[key] = mergeDataToChild(newData[key], deepCopy(data[key])
        || (Array.isArray(newData[key]) ? [] : {}), useDelete);
    } else {
      data[key] = key === 'href' ? xssHref(newData[key] || '') : newData[key];
    }
    if (useDelete && data[key].delete) {
      delete data[key];
    }
  });
  return data;
}

export function mergeEditDataToDefault(newData, defaultData, useDelete) {
  const dataSource = deepCopy(defaultData && defaultData.dataSource) || {};
  if (!newData) {
    return dataSource;
  }
  return mergeDataToChild(newData.dataSource, dataSource, useDelete);
}

export const mdId = {};

export function getNewHref(port, hash, remHash, $path = '', setLocal = true) {
  const winLocation = window.location;
  const userHash = hash ? `#${hash}` : '';
  let newHash = winLocation.hash ? `${winLocation.hash}${hash ? `&${hash}` : ''}` : userHash;
  newHash = remHash ? '' : newHash;
  const protocol = winLocation.protocol;
  const isLocalMode = winLocation.port;
  let child = '';
  switch (port) {
    case '7113':
      child = 'templates';
      break;
    case '7112':
      child = 'edit';
      break;
    default:
      break;
  }
  child = isLocalMode || !child ? '' : `/${child}`;
  let path = '';
  if (setLocal) {
    path = getLocalizedPathname($path, isZhCN(location.pathname));
  }
  const href = `${protocol}//${winLocation.hostname}${isLocalMode ? `:${port}` : ''}${child}${path}${newHash}`;
  return href;
}

export const getDataSourceValue = (id, templateData, parent) => {
  const array = parent || [];
  const childIds = id ? id.split('&') : [];
  let t = templateData;
  let tt;
  if (parent) {
    const cid = parent[0].split('_')[0];
    tt = {
      [parent[0]]: {
        dataSource: tempData[cid].dataSource,
      },
    };
  }
  array.concat(childIds).filter((c) => c).forEach((key) => {
    const nameKey = key.split('=');
    if (nameKey.length > 1 && nameKey[0] === 'array_name') {
      let i = parseFloat(nameKey[1].replace(/[a-z]/g, ''));
      const elem = t.filter((item, ii) => {
        if (item && item.name === nameKey[1]) {
          i = ii;
          return item;
        }
        return null;
      })[0];
      if (!elem && tt) {
        tt.forEach((item, ii) => {
          if (item.name === nameKey[1]) {
            i = ii;
          }
        });
      }
      if (isNaN(i) || !elem) {
        t = null;
      } else {
        t[i] = elem;
        /* || {
         name: nameKey[1],
       }; */
        t = t[i];
      }
    } else if (t) {
      const isArray = key === 'children' && childIds.length > 1;
      t[key] = t[key] || (isArray ? deepCopy(tt[key]) : {});
      t = t[key];
      if (tt) {
        tt = tt[key];
      }
    }
  });
  return t;
};

export const setDataSourceValue = (ids, key, value, newData) => {
  const data = getDataSourceValue(ids[1], newData, [ids[0], 'dataSource']);
  data[key] = value;
};

export const RemoveLocalStorage = (width = '18') => (
  <svg viewBox="0 0 1024 1024" width={width} fill="currentColor">
    <path d="M943.097924 388.29149c-3.054569-5.03876-7.489578-9.338692-13.134135-12.19474l-76.219939-38.294165-70.353324-35.367509L879.378693 110.721731c6.450922-12.867052-4.13211-31.242562-23.648606-41.017182-19.516496-9.774621-40.579207-7.255241-47.029106 5.644557l-95.925746 191.58748-63.569828-31.956829-98.860589-49.682539c-0.437975-0.234337-0.908696-0.404206-1.378393-0.604774-0.536212-0.23536-1.007957-0.469698-1.547239-0.672312-0.469698-0.200568-0.940418-0.369414-1.476631-0.503467-0.536212-0.167822-1.042749-0.369414-1.578961-0.538259-0.503467-0.134053-1.00591-0.201591-1.512447-0.336668-0.538259-0.101307-1.075495-0.26913-1.612731-0.336668-0.50449-0.101307-1.00591-0.134053-1.546216-0.201591-0.535189-0.067538-1.075495-0.134053-1.611707-0.201591-0.470721-0.033769-1.00591 0-1.512447-0.033769-0.535189 0-1.075495-0.033769-1.578961 0-0.535189 0-1.042749 0.033769-1.546216 0.101307-0.535189 0.033769-1.075495 0.033769-1.578961 0.101307-0.502443 0.066515-1.00591 0.167822-1.512447 0.268106-0.537236 0.101307-1.043772 0.168846-1.545192 0.26913-0.50449 0.13303-1.007957 0.26913-1.478677 0.403183-0.502443 0.134053-1.00591 0.268106-1.545192 0.435928-0.470721 0.168846-0.941442 0.336668-1.411139 0.537236-0.469698 0.168846-0.974188 0.336668-1.477654 0.537236-0.436952 0.23536-0.873903 0.469698-1.343601 0.672312-0.469698 0.23536-0.939395 0.470721-1.411139 0.706081-0.469698 0.268106-0.873903 0.537236-1.307785 0.806365-0.438998 0.268106-0.908696 0.537236-1.379417 0.839111-0.404206 0.301875-0.806365 0.638543-1.210571 0.940418-0.405229 0.300852-0.873903 0.638543-1.277086 0.974188-0.403183 0.334621-0.738827 0.705058-1.140986 1.075495-0.404206 0.336668-0.806365 0.705058-1.14201 1.075495-0.403183 0.369414-0.73985 0.806365-1.074472 1.209548-0.367367 0.405229-0.740874 0.772596-1.042749 1.174756-0.369414 0.435928-0.671289 0.907673-0.974188 1.37737-0.335644 0.404206-0.63752 0.840134-0.907673 1.277086-0.302899 0.469698-0.572028 0.974188-0.873903 1.477654-0.234337 0.435928-0.503467 0.806365-0.704035 1.242294-23.514553 45.719274-53.145407 88.8854-88.549755 128.993886-0.50449 0.572028-1.007957 1.108241-1.478677 1.713015-22.64065 25.461905-47.565319 49.750077-74.742285 72.693626C271.488763 462.563054 188.61631 510.668679 96.001983 545.738405c-13.638625 5.175883-21.766746 18.611893-20.760836 32.516578-0.806365 11.621688 4.76963 23.246447 15.385409 29.761837L646.545834 947.770851c4.02978 2.451842 8.365528 3.898797 12.764722 4.467755 5.544273 3.897773 12.060687 5.877871 18.544355 5.877871 8.163937 0 16.358573-3.090385 22.64065-9.237385 78.169337-76.725452 139.541103-162.821319 182.439122-255.939113 43.401486-94.123704 65.571415-190.435237 65.907059-286.137903C948.87551 399.914202 946.726567 393.532865 943.097924 388.29149zM824.255235 665.900136c-36.716226 79.648015-88.246857 153.888879-153.315828 221.00651l-122.813117-75.04723 77.127611-75.447343c12.765745-12.462846 13.000082-32.921807 0.503467-45.685505-12.498662-12.767791-32.91976-13.001105-45.686529-0.505513l-88.818885 86.87051-144.446833-88.279602 87.206154-61.138452c14.646582-10.211573 18.174941-30.368658 7.928576-45.014216-10.211573-14.57802-30.367635-18.140149-45.013193-7.892761l-110.283756 77.295434-112.500237-68.730361c77.464279-34.869159 147.872862-78.840626 209.884195-131.143852 22.909779-19.382443 44.408419-39.606043 64.396659-60.702524L844.410274 617.626689C838.363558 633.752971 831.644529 649.877207 824.255235 665.900136zM864.464005 554.644239 491.656161 341.736175c21.433148-27.076682 40.647769-55.327096 57.579393-84.653005l334.579171 168.164001C882.267487 468.311988 875.751073 511.546675 864.464005 554.644239z" />
  </svg>
);

function getEnumerableKeys(target) {
  const keys = [];
  for (const key in target) {/* eslint-disable-line */
    keys.push(key);
  }
  return keys;
}

export function objectEqual(obj1, obj2) {
  if (obj1 === obj2 || deepEql(obj1, obj2)) {
    return true;
  }
  if (!obj1 || !obj2 || getEnumerableKeys(obj1).length !== getEnumerableKeys(obj2).length) {
    return false;
  }
  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
  let equalBool = true;
  const setEqualBool = ($a, $b) => {
    const objA = getEnumerableKeys($a).length > getEnumerableKeys($b).length ? $a : $b;
    const objB = getEnumerableKeys($a).length > getEnumerableKeys($b).length ? $b : $a;
    getEnumerableKeys(objA).forEach((key) => {
      // 如果前面有参数匹配不相同则直接返回；
      if (!equalBool) {
        return;
      }
      if (!(key in objB)) {
        equalBool = false;
      }
      if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
        equalBool = objectEqual(objA[key], objB[key]);
      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
        if (objA[key].toString().replace(/\s+/g, '') !== objB[key].toString().replace(/\s+/g, '')) {
          equalBool = false;
        }
      } else if (objA[key] !== objB[key]) {
        equalBool = false;
      }
    });
  };

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    obj1.forEach((item, i) => {
      setEqualBool(item, obj2[i]);
    });
  } else {
    setEqualBool(obj1, obj2);
  }
  return equalBool;
}
const getParentRect = (item, parentData) => {
  const p = [];
  let i = 0;
  function parentNode(parent) {
    if (!parent) {
      return;
    }
    const dataId = mdId[parent.getAttribute('data-id')];
    // const dataId = parent.getAttribute('data-id');
    if (dataId) {
      const rect = parent.getBoundingClientRect();
      p.push({
        dataId,
        item: parent,
        rect,
        parent: getParentRect(parent, parentData),
        parentData,
      });
      i += 1;
    }
    if (i < 3 && parent.parentNode && parent.parentNode.tagName.toLocaleLowerCase() !== 'body') {
      parentNode(parent.parentNode);
    }
  }
  parentNode(item.parentNode);
  return p;
};

export const getChildRect = (data) => {
  const array = [];
  function mapChild(child) {
    Array.prototype.slice.call(child).forEach((item) => {
      const dataId = mdId[item.getAttribute('data-id')];
      // const dataId = item.getAttribute('data-id');
      if (
        item.getAttribute('aria-hidden') === 'true'
      ) {
        return;
      }
      if (dataId && !array.find((c) => c.dataId === dataId)) {
        const rect = item.getBoundingClientRect();
        array.push({
          dataId,
          item,
          rect,
          parent: getParentRect(item, data),
          parentData: data,
        });
      }
      if (item.children) {
        mapChild(item.children);
      }
    });
  }
  const dom = data.item || data;
  if (dom.children) {
    mapChild(dom.children);
  }
  return array;
};
