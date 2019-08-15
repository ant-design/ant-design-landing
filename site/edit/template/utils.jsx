// import { createLogger } from 'redux-logger';
const worker = new Worker('./worker.js');

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

export function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field] && fieldsError[field][0] !== 'password error'
  );
}


export const getCurrentDom = (pos, data) => {
  const t = data.map((item) => {
    const rect = item.rect;
    if (pos.x >= rect.x && pos.y >= rect.y
      && pos.x <= rect.x + rect.width && pos.y <= rect.y + rect.height) {
      return {
        ...item,
        rect,
      };
    }
    return null;
  }).filter(item => item);
  return t[t.length - 1];
};
