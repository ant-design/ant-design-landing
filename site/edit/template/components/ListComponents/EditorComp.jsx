import React from 'react';
import EditorList from 'rc-editor-list';
import EditorProps from './PropsComp';
import { getDataSourceValue } from '../../utils';
import { setTemplateData } from '../../../../edit-module/actions';
import { deepCopy } from '../../../../utils';
import tempData from '../../../../templates/template/element/template.config';

class EditorComp extends React.Component {
  setValue = (key, value, newData) => {
    const { currentEditData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const data = getDataSourceValue(ids[1], newData, [ids[0], 'dataSource'], {
      [ids[0]]: {
        dataSource: tempData[cid].dataSource,
      },
    });
    data[key] = value;
  }
  onChange = (e) => {
    const cssName = e.cssName;
    const { currentEditData, dispatch, templateData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const tempDataSource = tempData[cid].dataSource;
    const currentEditTemplateData = getDataSourceValue(ids[1], tempDataSource);
    const inDomClass = !!currentEditTemplateData.className.split(' ').filter(c => c === cssName).length;
    const newTemplateData = deepCopy(templateData);
    this.setValue('className', inDomClass ?
      currentEditTemplateData.className : `${currentEditTemplateData.className} ${cssName}`,
    newTemplateData.data.config);
    const data = {
      className: e.className,
      css: e.css,
      mobileCss: e.mobileCss,
      id,
    };
    newTemplateData.data.style = (newTemplateData.data.style || []).filter(c => c.id !== id);
    newTemplateData.data.style.push(data);
    dispatch(setTemplateData(newTemplateData));
  }
  onPropsChange = (key, value) => {
    const { dispatch, templateData } = this.props;
    const newTemplateData = deepCopy(templateData);
    this.setValue(key, value, newTemplateData.data.config);
    dispatch(setTemplateData(newTemplateData));
  }
  render() {
    const { currentEditData, mediaStateSelect } = this.props;
    if (!currentEditData) {
      return <p className="props-explain">请选择左侧进行编辑...</p>;
    }
    const edit = currentEditData.dom.getAttribute('data-edit');
    return (
      [
        <EditorProps edit={edit} {...this.props} key="props" onChange={this.onPropsChange} />,
        <EditorList
          key="css"
          editorElem={currentEditData.dom}
          onChange={this.onChange}
          cssToDom={false} // 避免多次样式。
          isMobile={mediaStateSelect === 'Mobile'}
          defaultActiveKey={['EditorClassName', 'EditorState', 'EditorFont', 'EditorInterface']}
        />,
      ]
    );
  }
}
export default EditorComp;
