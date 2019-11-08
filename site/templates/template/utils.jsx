import md5 from 'blueimp-md5';
import React from 'react';
import { Button } from 'antd';
import { isImg as imgStr, mdId } from '../../utils';

import compConfig from '../../edit/template/component.config';

export const isImg = imgStr;

export const getChildrenToRender = (item, i) => {
  let tag = item.name && item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && item.children.match(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children } });
  if (item.name.indexOf('button') === 0) {
    if (typeof item.children === 'object') {
      children = React.createElement(Button, {
        ...item.children,
        'data-edit': 'link,text',
      }, React.createElement('span', { dangerouslySetInnerHTML: { __html: item.children.children } }));
    } else {
      // 去除 linkA, linkA 全部用文字编辑的 #
      item['data-edit'] = 'linkA,text';
    }
  }
  if (item.name.indexOf('link') === 0) {
    item['data-edit'] = 'linkA,text';
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

export function getEditDomData(children) {
  const data = {};
  const doms = Array.prototype.slice.call(children);
  doms.forEach((item) => {
    // const dataId = item.getAttribute('data-id');
    const dataId = mdId[item.getAttribute('data-id')];
    if (!dataId) {
      return;
    }
    const comp = item.getAttribute('data-comp');
    const tempNames = dataId.split('-');
    let tempData = data[tempNames[0]] || {};
    const rect = item.getBoundingClientRect();
    /* const style = typeof window !== 'undefined' && document.defaultView ?
        document.defaultView.getComputedStyle(child) : {}; */
    tempData = {
      rect,
      // style,
      dataId,
      item,
      comp,
    };
    data[tempNames[0]] = tempData;
  });
  return data;
}

export const setDataIdToDataSource = (data, dataId) => {
  let id;
  const objectForEachChild = (item, key) => {
    if (typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach((cItem, i) => {
          if (typeof cItem === 'object') {
            // 数组必需加name;
            const name = cItem.name ? `array_name=${cItem.name}` : i;
            objectForEachChild(cItem, `${key}&${name}`);
            id = md5(`${dataId}-${key}&${name}`);
            mdId[id] = `${dataId}-${key}&${name}`;
            cItem['data-id'] = id;
            // cItem['data-id'] = `${dataId}-${key}&${name}`;
          }
        });
      } else if (item) {
        Object.keys(item).forEach((cKey) => {
          const cItem = item[cKey];
          objectForEachChild(cItem, `${key}&${cKey}`);
        });
        if (key in compConfig) {
          item['data-edit'] = key;
        } else if (item.children && typeof item.children !== 'object') {
          if (item.children.match(isImg) || (item.name && item.name.indexOf('image') === 0)) {
            item['data-edit'] = 'image';
          } else {
            item['data-edit'] = 'text';
          }
        }
        id = md5(`${dataId}-${key}`);
        mdId[id] = `${dataId}-${key}`;
        item['data-id'] = id;
        // item['data-id'] = `${dataId}-${key}`;;
      }
    }
  };
  Object.keys(data).forEach((key) => {
    const item = data[key];
    objectForEachChild(item, key);
  });
  return data;
};
