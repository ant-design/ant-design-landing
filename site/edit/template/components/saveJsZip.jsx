import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import { Modal } from 'antd';
import { formatCode } from '../utils';
import { mergeEditDataToDefault, isImg } from '../../../utils';
import webData from '../../../templates/template/element/template.config';
import otherComp from '../../../templates/template/other/otherToString';
import lessComp from '../../../templates/static/lessToString';

const replaceStr = /\/\*\s+replace-start\s+\*\/([\S\s]*?)\/\*\s+replace-end\s+\*\//g;
const replaceValueStr = /\/\*\s+replace-start-value\s+=\s+(.*)\s+\*\/([\S\s]*?)\/\*\s+replace-end-value\s+\*\//g;

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };

let templateStrObj;

const utils = `
import React from 'react';
import { Button } from 'antd';

export const isImg = ${isImg};
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && item.children.match(isImg)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};
`;

let publishJSON;

const setScrollScreen = () => {
  const str = `// 实现整屏滚动
    scrollScreen.init({ location: ['${
  templateStrObj.TEMPLATE.map((c) => !c.match(/Nav/ig) && c).filter((c) => c).join('\', \'')}'] });`;
  templateStrObj.OTHER.index = templateStrObj.OTHER.index
    .replace('&scrollScreen&', str)
    .replace('&scrollScreen-pragma&', `/* 如果不是 dva 2.0 请使用以下代码
    ${str}
    */`);
};

const getEditCss = (dataArray) => {
  let cssStr = '';
  let mobileCssStr = '';
  const getCssToString = (css, className) => {
    return Object.keys(css).sort((a, b) => (
      stateSort[a] > stateSort[b]
    )).map((key) => {
      if (!css[key]) {
        return null;
      }
      switch (key) {
        case 'default':
          return `${className}{${css[key]}}`;
        default:
          return `${className}:${key}{${css[key]}}`;
      }
    }).filter((c) => c)
      .join('');
  };
  let cssString = '';
  dataArray.forEach((item) => {
    if ('cssString' in item) {
      cssString += item.cssString;
    } else {
      const { className, css, mobileCss } = item;
      cssStr += getCssToString(css, className);
      mobileCssStr += getCssToString(mobileCss, className);
    }
  });
  return `${cssStr}${mobileCssStr ? `${mobileTitle}${mobileCssStr}}` : ''}${cssString}`;
};
const setChildrenToIndex = (other, template) => {
  let importStr = '';
  let childStr = '';
  Object.keys(template).forEach((key) => {
    importStr += `import ${key} from './${key}';\n`;
  });
  templateStrObj.TEMPLATE.forEach((key) => {
    const keys = key.split('_');
    childStr += `<${keys[0]} id="${key}" key="${key}" dataSource={${key
      .replace('_', '')}DataSource} isMobile={this.state.isMobile}/>,`;
  });
  const dataSourceStr = `import {${templateStrObj.TEMPLATE
    .map((s) => `${s.replace('_', '')}DataSource`)
    .join(',')}} from './data.source'`;

  if (templateStrObj.OTHER.point && templateStrObj.TEMPLATE.length) {
    let pointProps = '';
    Object.keys(other.point).forEach((key) => {
      pointProps += `${key}="${other.point[key]}" `;
    });
    // 点转换
    importStr += 'import Point from \'./Point\';';
    childStr += '// 导航和页尾不进入锚点区，如果需要，自行添加;\n';
    childStr += `<Point key="list" data={${JSON.stringify(templateStrObj.TEMPLATE)}} ${pointProps}/>,`;
  }
  childStr = `const children = [${childStr}]`;
  return templateStrObj.OTHER.index
    .replace('&dataSource&', dataSourceStr)
    .replace('&import&', importStr)
    .replace('&children&', childStr)
    .replace('&scrollScreen&', '')
    .replace('&scrollScreen-pragma&', '');
};
const jsToZip = (getJSON) => {
  const zip = new JSZip();
  let indexLessStr = '';
  const forEachToFile = (key, name, parent) => {
    const content = parent[key];
    let fileName;
    switch (name) {
      case 'JS':
        fileName = `${key}.jsx`;
        break;
      case 'LESS':
        indexLessStr += `@import './${key.toLocaleLowerCase()}.less';\n`;
        fileName = `less/${key.toLocaleLowerCase()}.less`;
        break;
      default:
        {
          const fileType = key === 'documentation' ? 'md' : 'jsx';
          fileName = `${key === 'point' ? 'Point' : key}.${fileType}`;
        }
        break;
    }
    if (getJSON) {
      if (!fileName.match('.md')) {
        publishJSON.push({
          file: `components/${fileName}`,
          data: content,
        });
      }
    } else {
      zip.file(fileName, content);
    }
  };
  Object.keys(lessComp).forEach((key) => {
    if (key === 'point' && !('point' in templateStrObj.OTHER)) {
      return;
    }
    indexLessStr += `@import './${key.toLocaleLowerCase()}.less';\n`;
    const lessName = `less/${key.toLocaleLowerCase()}.less`;
    if (getJSON) {
      publishJSON.push({
        file: `components/${lessName}`,
        data: lessComp[key],
      });
    } else {
      zip.file(lessName, lessComp[key]);
    }
  });
  let propsStr = 'import React from \'react\';\n';
  Object.keys(templateStrObj).forEach((key) => {
    const item = templateStrObj[key];
    if (key === 'PROPS') {
      Object.keys(item).forEach((k) => {
        propsStr += item[k];
      });
    } else if (key !== 'TEMPLATE' && key !== 'PROPS') {
      if (typeof item === 'object') {
        Object.keys(item).forEach((k) => { forEachToFile(k, key, item); });
      } else if (key === 'EDITCSS') {
        indexLessStr += '@import \'./edit.less\';';
        if (getJSON) {
          publishJSON.push({
            file: 'components/less/edit.less',
            data: templateStrObj[key] || '@edit: .edit;',
          });
        } else {
          zip.file('less/edit.less', templateStrObj[key]);
        }
      }
    }
  });
  if (getJSON) {
    [
      { file: 'components/data.source.js', data: propsStr },
      { file: 'components/utils.js', data: utils },
      { file: 'components/less/antMotionStyle.less', data: indexLessStr },
    ].forEach((item) => {
      publishJSON.push(item);
    });
  } else {
    zip.file('data.source.js', propsStr);
    zip.file('utils.js', utils);
    zip.file('less/antMotionStyle.less', indexLessStr);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'Home.zip');
    });
  }
};
/* const imgToTag = (data) => {
  let forEachData;
  const forEachFunc = (item, parent, key) => {
    if (typeof item === 'object') {
      forEachData(item);
    } else if (typeof item === 'string' && item.match(isImg) && key === 'children') {
      console.log(data, item);
      parent[key] = `<img width="100%" src="${item}" alt="img"/>`;
    }
  };
  forEachData = (d) => {
    if (Array.isArray(d)) {
      d.forEach((item, i) => {
        forEachFunc(item, d, i);
      });
    }
    Object.keys(d).forEach((k) => {
      const item = d[k];
      forEachFunc(item, d, k);
    });
  };
  forEachData(data);
  return data;
}; */

export function saveJsZip(templateData, callBack, getJSON) {
  // 每次保存重置保存对象数据。。
  templateStrObj = {
    JS: {},
    LESS: {},
    PROPS: {},
    OTHER: {
      index: otherComp.index,
      documentation: otherComp.documentation,
    },
  };
  publishJSON = [
    {
      file: 'pages/index.js',
      data: 'import React from \'react\';\nimport Home from \'../components/index\';\n\nexport default () => <Home />;',
    },
  ];
  const { data } = templateData;
  const { config, style, template, other } = data;
  templateStrObj.TEMPLATE = template;
  const promiseObject = {};
  promiseObject.EDITCSS = { type: 'css', value: getEditCss(style) };
  /* getEditCss(style).then((v) => {
    templateStrObj.EDITCSS = v;
  }); */

  template.forEach((key) => {
    const keys = key.split('_');
    const { templateStr, less } = webData[keys[0]];
    const dataSource = mergeEditDataToDefault(config[key], webData[keys[0]], true);
    const props = `export const ${key.replace('_', '')}DataSource =${
      JSON.stringify(dataSource)
        .replace(/\\n/g, '')
        .replace(/href="(.*?)"/g, 'href=\\"$1\\"')
        .replace(/<br>/g, '<br />')
        .replace(/"(<.*?>)"/g, (_, s1) => {
          // https://github.com/ant-design/ant-design-landing/issues/61 去除 span 标签，编辑时可能会出现 span 标签。。
          /* const tagIsSpanMatch = s1.match(/<span>.*?<\/span>/g);
          const startSpanMatch = s1.match(/^<span>.*?<\/span>?/g);
          if (startSpanMatch && tagIsSpanMatch.length === 1) {
            return s1;
          } */
          return `${s1.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')}`;
        })
        .replace(/\\"/g, '"')}`;
    promiseObject[`PROPS-${key}`] = { value: props };
    /*  formatCode(props).then((value) => {
      templateStrObj.PROPS[key] = value;
    }); */
    // 转换 antd;
    const l = templateStr.match(/import\s+(.+?)\s+'antd\/lib\/(.+?)';/g);
    let newTemplateStr = templateStr.replace(/import\s+(.+?)\s+'antd\/lib\/(.+?)';/g, '&antd&');
    if (l && l.length) {
      const ll = l.map((k) => k.split(/\s+/g)[1]).join(',');
      newTemplateStr = newTemplateStr.replace('&antd&', `import {${ll}} from 'antd';`);
    }
    newTemplateStr = newTemplateStr.replace(/(&antd&)/g, '');
    // formatCode(JSON.stringify(imgToTag(dataSource)).replace(/({|,|\n)"(.*?)":/ig, '$1$2:'), 'json')
    // .replace(/"(<.*?>)"/g, '<span>$1</span>').replace('<br>', '<br />').replace(/"/g, '\'');
    promiseObject[`JS-${keys[0]}`] = {
      value: newTemplateStr
        .replace(replaceStr, '')
        .replace(replaceValueStr, '$1'),
    };
    /* formatCode(newTemplateStr
      .replace(replaceStr, '')
      .replace(replaceValueStr, '$1')).then((v) => {
      templateStrObj.JS[keys[0]] = v;
    }); */
    templateStrObj.LESS[keys[0]] = less.replace('@import \'../../../static/custom.less\';\n', '');
  });
  templateStrObj.OTHER.index = templateStrObj.OTHER.index.replace('&scrollAnim&',
    other.full ? 'import scrollScreen from \'rc-scroll-anim/lib/ScrollScreen\';' : ''
  );

  Object.keys(other).forEach((key) => {
    switch (key) {
      case 'point':
        templateStrObj.OTHER.point = otherComp[key];
        break;
      case 'full':
        setScrollScreen();
        break;
      default:
        break;
    }
  });
  // templateStrObj.OTHER.index = setChildrenToIndex(other);
  const fileNameObject = {};
  template.forEach((key) => {
    const keys = key.split('_');
    fileNameObject[keys[0]] = 1;
  });
  promiseObject['OTHER-index'] = { value: setChildrenToIndex(other, fileNameObject) };
  let i = 0;
  const promiseArray = Object.keys(promiseObject);
  function startSave() {
    jsToZip(getJSON);
    callBack(publishJSON);
  }
  const setTemplateStrObj = (key, v) => {
    const keys = key.split('-');
    if (keys[1]) {
      templateStrObj[keys[0]][keys[1]] = v;
    } else {
      templateStrObj[key] = v;
    }
  };
  let modalOpen = false;
  promiseArray.forEach((key) => {
    const item = promiseObject[key];
    formatCode({
      code: item.value,
      parser: item.type,
      cb: (v, cKey) => {
        if (modalOpen) {
          return;
        }
        if (v.match('Error:')) {
          modalOpen = true;
          callBack('error');
          Modal.error({
            title: 'Error formatting code.',
            content: `${cKey}: ${v}`,
          });
        }
        setTemplateStrObj(cKey, v);
        i += 1;
        if (i >= promiseArray.length) {
          startSave();
        }
      },
      key,
    });
  });
}

export function saveJSON(json, cb) {
  const zip = new JSZip();
  formatCode({
    code: json,
    parser: 'json',
    cb: (v) => {
      zip.file('edit-data.json', v);
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'edit-data.json.zip');
        cb();
      });
    },
  });
}
