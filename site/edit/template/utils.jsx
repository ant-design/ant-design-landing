import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import parseJs from 'prettier/src/parser-babylon';
import parseCss from 'prettier/src/parser-postcss';
import { printAstToDoc } from 'prettier/src/printer';
import { printDocToString } from 'prettier/src/doc-printer';
import comments from 'prettier/src/comments';

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

export const isImg = /\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/;

export const getState = (state) => {
  return state;
};

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
function ensureAllCommentsPrinted(astComments) {
  if (!astComments) {
    return;
  }

  for (let i = 0; i < astComments.length; i += 1) {
    if (astComments[i].value.trim() === 'prettier-ignore') {
      // If there's a prettier-ignore, we're not printing that sub-tree so we
      // don't know if the comments was printed or not.
      return;
    }
  }

  astComments.forEach((comment) => {
    if (!comment.printed) {
      throw new Error(
        `Comment "${
          comment.value.trim()
        }" was not printed. Please report this error!`
      );
    }
    delete comment.printed;
  });
}

function attachComments(text, ast, opts) {
  const astComments = ast.comments;
  if (astComments) {
    delete ast.comments;
    comments.attach(astComments, ast, text, opts);
  }
  ast.tokens = [];
  opts.originalText = text.trimRight();
  return astComments;
}

const cssArray = ['css', 'less', 'scss'];
export function format(code, parserName) {
  const opts = {
    useTabs: false,
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    parser: parserName || 'babylon',
    arrowParens: 'always',
    // insertPragma: true,
    requirePragma: true,
    semi: true,
    originalText: code,
  };
  const parser = cssArray.indexOf(parserName) >= 0 ? parseCss : parseJs;
  const ast = parser(code, null, opts);
  const astComments = attachComments(code, ast, opts);
  const doc = printAstToDoc(ast, opts);
  const result = printDocToString(doc, opts);
  ensureAllCommentsPrinted(astComments);
  return result.formatted;
}
