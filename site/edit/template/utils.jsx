// import { createLogger } from 'redux-logger';

const worker = new Worker('/worker.js');
export function formatCode({ code, cb, parser = 'babylon', key }) {
  const options = {
    useTabs: false,
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    parser,
    arrowParens: 'always',
    semi: true,
  };
  worker.onmessage = (message) => {
    cb(message.data.formatted, message.data.key);
  };
  worker.postMessage({
    text: code,
    key,
    options,
  });
}

const getParentRect = (item) => {
  const p = [];
  let i = 0;
  function parentNode(parent) {
    const dataId = parent.getAttribute('data-id');
    if (dataId) {
      const rect = parent.getBoundingClientRect();
      p.push({
        dataId,
        item: parent,
        rect,
        parent: getParentRect(parent),
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
      const dataId = item.getAttribute('data-id');
      const rect = item.getBoundingClientRect();
      if (dataId) {
        array.push({
          dataId,
          item,
          rect,
          parent: getParentRect(item),
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

export const getCurrentDom = (pos, data) => {
  const t = data.map((item) => {
    const rect = item.rect;
    if (pos.x >= rect.x && pos.y >= rect.y &&
      pos.x <= rect.x + rect.width && pos.y <= rect.y + rect.height) {
      return {
        ...item,
        rect,
      };
    }
    return null;
  }).filter(item => item);
  return t[t.length - 1];
};

export const getDataSourceValue = (id, templateData, parent, tempDefaultData) => {
  const array = parent || [];
  const childIds = id.split('&');
  let t = templateData;
  let tt = tempDefaultData;
  array.concat(childIds).forEach((key) => {
    const nameKey = key.split('=');
    if (nameKey.length > 1 && nameKey[0] === 'array_name') {
      let i = parseFloat(nameKey[1].replace(/[a-z]/g, ''));
      const elem = t.filter((item, ii) => {
        if (item.name === nameKey[1]) {
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
      t[i] = elem || {
        name: nameKey[1],
      };
      t = t[i];
    } else {
      const isArray = key === 'children' && childIds.length > 1;
      t[key] = t[key] || (isArray ? [] : {});
      t = t[key];
      if (tt) {
        tt = tt[key];
      }
    }
  });
  return t;
};
