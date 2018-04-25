import { isImg, deepCopy } from '../../utils';
import compConfig from '../../edit/template/component.config';

export function getEditDomData(children) {
  const data = {};
  const doms = Array.prototype.slice.call(children);
  doms.forEach((item) => {
    const dataId = item.getAttribute('data-id');
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
  let objectForEachChild;
  const arrayForEachChild = (item, i, parentKey) => {
    const name = item.name ? `array_name=${item.name}` : i;
    item['data-id'] = `${dataId}-${parentKey}&${name}`;
    if (item.children && typeof item.children !== 'object') {
      if (item.children.match(isImg)) {
        item['data-edit'] = 'image';
      } else {
        item['data-edit'] = 'text';
      }
    }
    Object.keys(item).forEach((key) => {
      const cItem = item[key];
      if (typeof cItem === 'object') {
        objectForEachChild(cItem, `${parentKey}&${name}&${key}`);
      }
    });
  };
  objectForEachChild = (item, key) => {
    item['data-id'] = `${dataId}-${key}`;
    if (Array.isArray(item.children)) {
      item.children.forEach((cItem, i) => {
        arrayForEachChild(cItem, i, `${key}&children`);
      });
    }
    if (key in compConfig) {
      item['data-edit'] = key;
    } else if (item.children && typeof item.children !== 'object') {
      if (item.children.match(isImg)) {
        item['data-edit'] = 'image';
      } else {
        item['data-edit'] = 'text';
      }
    }
  };
  Object.keys(data).forEach((key) => {
    const item = data[key];
    objectForEachChild(item, key);
  });
  return data;
};
