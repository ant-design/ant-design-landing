import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import { format } from '../utils';
import { mergeEditDataToDefault } from '../../../templates/template/utils';
import webData from '../../../templates/template/element/template.config';
import otherComp from '../../../templates/template/other/otherToString';
import lessComp from '../../../templates/static/lessToString';

const replaceStr = /\/\*\s+replace-start\s+\*\/([\S\s]*?)\/\*\s+replace-end\s+\*\//g;
const replaceValueStr = /\/\*\s+replace-start-value\s+=\s+(.*)\s+\*\/([\S\s]*?)\/\*\s+replace-end-value\s+\*\//g;

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };
const isImg = /\.(gif|jpg|jpeg|png|svg|JPG|PNG|GIF|JPEG|SVG)$/;

const templateStrObj = {
  JS: {},
  LESS: {},
  PROPS: {},
  OTHER: {
    index: otherComp.index,
    documentation: otherComp.documentation,
  },
};

const setScrollScreen = () => {
  templateStrObj.OTHER.index = templateStrObj.OTHER.index
    .replace('componentDidMount() {', `componentDidMount() {
    // 实现整屏滚动
    const docHeight = ReactDOM.findDOMNode(this).getBoundingClientRect().height;
    scrollScreen.init({ docHeight });`);
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
    }).filter(c => c)
      .join('');
  };
  dataArray.forEach((item) => {
    const { className, css, mobileCss } = item;
    cssStr += getCssToString(css, className);
    mobileCssStr += getCssToString(mobileCss, className);
  });
  return format(`${cssStr}${mobileCssStr ? `${mobileTitle}${mobileCssStr}}` : ''}`, 'css');
};
const setChildrenToIndex = () => {
  let importStr = '';
  let childStr = '';
  Object.keys(templateStrObj.JS).forEach((key) => {
    importStr += `import ${key} from './${key}';\n`;
  });
  templateStrObj.TEMPLATE.forEach((key) => {
    const keys = key.split('_');
    childStr += `<${keys[0]} id="${key}" key="{${key}}" dataSource={${key
      .replace('_', '')}DataSource} isMobile={this.state.isMobile}/>,`;
  });
  const dataSourceStr = `import {${templateStrObj.TEMPLATE
    .map(s => `${s.replace('_', '')}DataSource`)
    .join(',')}} from './data.source.js'`;

  if (templateStrObj.OTHER.point && templateStrObj.TEMPLATE.length) {
    // 点转换
    importStr += 'import Point from \'./Point\';';
    childStr += '// 导航和页尾不进入锚点区，如果需要，自行添加;\n';
    childStr += `<Point key="list" ref="list" data={${templateStrObj.TEMPLATE}} />,`;
  }
  childStr = `const children = [${childStr}]`;
  templateStrObj.OTHER.index = format(templateStrObj.OTHER.index
    .replace('&dataSource&', dataSourceStr)
    .replace('&import&', importStr)
    .replace('&children&', childStr));
};
const jsToZip = () => {
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
        indexLessStr += `@import './${key}.less';\n`;
        fileName = `less/${key}.less`;
        break;
      default:
        {
          const fileType = key === 'documentation' ? 'md' : 'jsx';
          fileName = `${key}.${fileType}`;
        }
        break;
    }
    zip.file(fileName, content);
  };
  Object.keys(lessComp).forEach((key) => {
    if (key === 'point' && !('point' in templateStrObj.OTHER)) {
      return;
    }
    indexLessStr += `@import './${key}.less';\n`;
    zip.file(`less/${key}.less`, lessComp[key]);
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
        zip.file('less/edit.less', templateStrObj[key]);
      }
    }
  });
  zip.file('data.source.js', propsStr);
  zip.file('less/antMotion_style.less', indexLessStr);
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'Home.zip');
  });
};
const imgToTag = (data) => {
  let forEachData;
  const forEachFunc = (item, parent, key) => {
    if (typeof item === 'object') {
      forEachData(item);
    } else if (typeof item === 'string' && item.match(isImg) && key === 'children') {
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
};

export default function saveJsZip(templateData) {
  const { data } = templateData;
  const { config, style, template, other } = data;
  templateStrObj.TEMPLATE = template;
  templateStrObj.EDITCSS = getEditCss(style);
  template.forEach((key) => {
    const keys = key.split('_');
    const { templateStr, less } = webData[keys[0]];
    const dataSource = mergeEditDataToDefault(config[key], webData[keys[0]]);
    const props = `export const ${key.replace('_', '')}DataSource =${
      JSON.stringify(imgToTag(dataSource))
        .replace(/"(<.*?>)"/g, '<span>$1</span>')//  to react;
        .replace(/\\"/g, '"')
        .replace(/<br>/g, '<br />')}`;
    templateStrObj.PROPS[key] = format(props);
    // format(JSON.stringify(imgToTag(dataSource)).replace(/({|,|\n)"(.*?)":/ig, '$1$2:'), 'json')
    // .replace(/"(<.*?>)"/g, '<span>$1</span>').replace('<br>', '<br />').replace(/"/g, '\'');
    templateStrObj.JS[keys[0]] = format(templateStr
      .replace(replaceStr, '')
      .replace(replaceValueStr, '$1'));
    templateStrObj.LESS[keys[0]] = less.replace('../../../static/custom.less', './custom.less');
  });
  templateStrObj.OTHER.index = templateStrObj.OTHER.index.replace('&scrollAnim&',
    other.full ? 'import scrollScreen from \'rc-scroll-anim/lib/ScrollScreen\';' : ''
  );
  Object.keys(other).forEach((key) => {
    switch (key) {
      case 'point':
        templateStrObj.OTHER[key] = otherComp[key];
        break;
      case 'full':
        setScrollScreen();
        break;
      default:
        break;
    }
  });
  console.log(templateStrObj);
  setChildrenToIndex();
  jsToZip();
}
