// import deepCopy from 'deepcopy';
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
// console.log(mergeEditDataToDefault({ dataSource: { a: ['delete', 0] } }, { dataSource: { a: [1, 2] } }));

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
    if (tempNames[1] === 'wrapper') {
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
    }
  });
  return data;
}

