import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './edit-module/reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const isImg = /\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/;

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
  if (typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return [].concat(data);
  }
  const obj = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        obj[key] = [].concat(data[key]);
      } else {
        obj[key] = deepCopy(data[key]);
      }
    } else {
      obj[key] = data[key];
    }
  });
  return obj;
}


function mergeDataToChild(newData, _data) {
  if (!newData) {
    return _data;
  }
  const data = _data;
  Object.keys(newData).forEach((key) => {
    if (typeof newData[key] === 'object') {
      data[key] = mergeDataToChild(newData[key], deepCopy(data[key]) ||
        (Array.isArray(newData[key]) ? [] : {}));
      if (Array.isArray(newData[key])) {
        data[key] = data[key].filter(c => c || c === 0);
      }
    } else if (newData[key] === 'delete') {
      delete data[key];
    } else {
      data[key] = newData[key];
    }
  });
  return data;
}

export function mergeEditDataToDefault(newData, defaultData) {
  const dataSource = deepCopy(defaultData.dataSource) || {};
  if (!newData) {
    return dataSource;
  }
  return mergeDataToChild(newData.dataSource, dataSource);
}