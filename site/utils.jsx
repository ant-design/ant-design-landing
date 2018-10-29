import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './edit-module/reducers';

import tempData from './templates/template/element/template.config';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const isImg = /\.(gif|jpg|jpeg|png|svg|JPG|PNG|GIF|JPEG|SVG)$/;

export const getState = (state) => {
  return state;
};

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
    return data.map(item => deepCopy(item));
  }
  const obj = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].map(item => deepCopy(item));
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
      data[key] = mergeDataToChild(newData[key], deepCopy(data[key])
        || (Array.isArray(newData[key]) ? [] : {}), useDelete);
      if (Array.isArray(newData[key])) {
        data[key] = data[key].filter(c => c || c === 0);
      }
    } else {
      data[key] = newData[key];
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


export function getNewHref(port, hash, remHash) {
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
  child = isLocalMode ? '' : child;
  const href = `${protocol}//${winLocation.hostname}${isLocalMode ? `:${port}` : ''}/${child}${newHash}`;
  return href;
}

export const getDataSourceValue = (id, templateData, parent) => {
  const array = parent || [];
  const childIds = id.split('&');
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
  array.concat(childIds).filter(c => c).forEach((key) => {
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
      if (isNaN(i)) {
        t = null;
      } else {
        t[i] = elem || {
          name: nameKey[1],
        };
        t = t[i];
      }
    } else {
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
