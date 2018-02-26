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
    }
    obj[key] = data[key];
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
      mergeDataToChild(data[key], newData[key]);
    } else {
      data[key] = newData[key];
    }
  });
  return data;
}

export function mergeURLDataToDefault(urlData, defaultData) {
  const dataSource = deepCopy(defaultData.dataSource);
  const dataProps = deepCopy(defaultData.dataProps);
  if (!urlData) {
    return {
      dataSource,
      dataProps,
    };
  }
  const data = {};
  data.dataSource = mergeDataToChild(urlData.dataSource, dataSource);
  data.dataProps = mergeDataToChild(urlData.dataProps, dataProps);
  return data;
}

export function getEditDomData(children) {
  const data = {};
  const doms = Array.prototype.slice.call(children);
  doms.forEach((item) => {
    const dataId = item.getAttribute('data-id');
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
      };
      data[tempNames[0]] = tempData;
    }
  });
  return data;
}

