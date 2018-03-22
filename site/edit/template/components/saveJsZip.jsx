import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { format } from '../utils';
import { mergeEditDataToDefault } from '../../../templates/template/utils';
import webData from '../../../templates/template/element/template.config';

const replaceStr = /\/\*\s+replace-start\s+\*\/([\S\s]*?)\/\*\s+replace-end\s+\*\//g;
const replaceValueStr = /\/\*\s+replace-start-value\s+=\s+(.*)\s+\*\/([\S\s]*?)\/\*\s+replace-end-value\s+\*\//g;
const templateStrObj = {
  JS: {},
  LESS: {},
};
export default function saveJsZip(templateData) {
  const { data } = templateData;
  const { config, style, template, other } = data;
  console.log(config);
  template.forEach((key) => {
    console.log(key);
    const keys = key.split('_');
    const { templateStr, less } = webData[keys[0]];
    const dataSource = mergeEditDataToDefault(config[key], webData[keys[0]]);
    console.log(dataSource);
    templateStrObj[keys[0]] = format(templateStr.replace(replaceStr, '').replace(replaceValueStr, '$1'));
  });
}
