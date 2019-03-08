import md5 from 'blueimp-md5';
import { isImg, mdId } from '../../utils';

import compConfig from '../../edit/template/component.config';

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
            const name = cItem.name ? `array_name=${cItem.name}` : i;
            objectForEachChild(cItem, `${key}&${name}`);
            id = md5(`${dataId}-${key}&${name}`);
            mdId[id] = `${dataId}-${key}&${name}`;
            cItem['data-id'] = id;
            // cItem['data-id'] = `${dataId}-${key}&${name}`;
          }
        });
      } else {
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
