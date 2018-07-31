import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './edit-module/reducers';

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
  const dataSource = deepCopy(defaultData.dataSource) || {};
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
