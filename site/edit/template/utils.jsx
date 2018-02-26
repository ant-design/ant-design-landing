import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postType } from '../../edit-module/actions';
// import { createLogger } from 'redux-logger';
import rootReducer from '../../edit-module/reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk));

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

export function getEditID(editId) {
  const ids = editId.split('-');
  const id = ids[0];
  const bIds = ids[0].split('_');
  let childId = ids[1] || '';
  childId = childId ? `_${childId}` : '';
  childId = `${bIds[0]}${bIds[1]}${childId}`;
  return { id, childId };
}

export function createChildrenObject(object, keys) {
  const obj = object;
  let t = {};
  keys.forEach((key, i) => {
    if (i) {
      t[key] = t[key] || {};
      t = t[key];
    } else {
      obj[key] = obj[key] || {};
      t = obj[key];
    }
  });
  return t;
}

export function getChildrenObject(object, keys) {
  const obj = object;
  let t;
  keys.forEach((key, i) => {
    if (i) {
      t = t[key] || {};
    } else {
      t = obj[key] || {};
    }
  });
  return t;
}

// new
export const isImg = /\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/;

export const getData = (state) => {
  /* const templateData = state.templateData;
  console.log(state);
  if (templateData.type === postType.POST_SUCCESS) {
    return {
      templateData: {
        type: templateData.type,
        uid: templateData.data.id,
        data: templateData.data.attributes,
      },
    };
  } */
  return state;
};


export const getChildRect = (data) => {
  const array = [];
  function mapChild(child) {
    Array.prototype.slice.call(child).forEach((item) => {
      const dataId = item.getAttribute('data-id');
      if (dataId) {
        array.push({
          dataId,
          item,
          rect: item.getBoundingClientRect(),
        });
      }
      if (item.children) {
        mapChild(item.children);
      }
    });
  }
  if (data.item.children) {
    mapChild(data.item.children);
  }
  return array;
};

export const getCurrentDom = (pos, data, scrollTop) => {
  const t = data.map((item) => {
    const rect = item.rect;
    if (pos.x >= rect.x && pos.y >= rect.y &&
      pos.x <= rect.x + rect.width && pos.y <= rect.y + rect.height) {
      return {
        item: item.item,
        dataId: item.dataId,
        rect: {
          x: rect.x,
          y: rect.y + scrollTop,
          width: rect.width,
          height: rect.height,
        },
      };
    }
  }).filter(item => item);
  return t[t.length - 1];
};

