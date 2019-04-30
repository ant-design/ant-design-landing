import React from 'react';
import EditorList from 'rc-editor-list';
import editorEn from 'rc-editor-list/lib/locale/en_US';
import editorZh from 'rc-editor-list/lib/locale/zh_CN';
import { Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';
import EditorProps from './PropsComp';
import EditorChild from './ChildComp';
import { setTemplateData } from '../../../../edit-module/actions';
import { deepCopy, getDataSourceValue, setDataSourceValue } from '../../../../utils';
import { isZhCN } from '../../../../theme/template/utils';
import tempData from '../../../../templates/template/element/template.config';

const { Panel } = Collapse;

const { ClassName, State, Font, BackGround, Border, Interface, Margin, Shadow, Transition } = EditorList;
class EditorComp extends React.Component {
  onChange = (cb) => {
    const { cssName, currentEditCssString } = cb;
    const { currentEditData, dispatch, templateData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    let tempDataSource = tempData[cid].dataSource;
    tempDataSource = tempDataSource.isScrollLink && ids[1].match('Menu') ? templateData.data.config[ids[0]].dataSource : tempDataSource;
    const currentEditTemplateData = getDataSourceValue(ids[1], tempDataSource);
    const newClassName = `${currentEditTemplateData && currentEditTemplateData.className
      ? currentEditTemplateData.className.split(' ').filter(c => c !== cssName).join(' ')
      : ''} ${cssName}`.trim();
    const newTemplateData = deepCopy(templateData);
    setDataSourceValue(ids, 'className', newClassName, newTemplateData.data.config);
    const data = {
      // className: e.className,
      // cssValue,
      cssString: currentEditCssString,
      // parentClassName,
      id: cb.id,
    };
    newTemplateData.data.style = (newTemplateData.data.style || []).filter(c => c.id !== cb.id);
    newTemplateData.data.style.push(data);
    dispatch(setTemplateData(newTemplateData));
  }

  onPropsChange = (key, value, func, isGroup) => {
    const { dispatch, templateData, currentEditData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    if (isGroup) {
      ids.splice(ids.length - 1, 1);
    }
    if (func) {
      const dataId = currentEditData.id.split('-')[0];
      const template = {
        ...templateData,
        funcData: {
          [dataId]: {
            [key]: value,
          },
        },
      };
      currentEditData.iframe.postMessage(template, '*');
    } else {
      const newTemplateData = deepCopy(templateData);
      setDataSourceValue(ids, key, value, newTemplateData.data.config);
      dispatch(setTemplateData(newTemplateData));
    }
  }

  onChildChange = (ids, currentData) => {
    const { dispatch, templateData } = this.props;
    const newTemplateData = deepCopy(templateData);
    setDataSourceValue(ids, 'children', currentData.children, newTemplateData.data.config);
    dispatch(setTemplateData(newTemplateData));
  }

  render() {
    const { currentEditData, mediaStateSelect, location } = this.props;
    const isCN = isZhCN(location.pathname);
    if (!currentEditData) {
      return (
        <p className="props-explain">
          <FormattedMessage id="app.edit.default" />
        </p>
      );
    }
    const edit = currentEditData.dom.getAttribute('data-edit');
    return (
      [
        <EditorChild edit={edit} {...this.props} key="child" onChange={this.onChildChange} />,
        <EditorProps edit={edit} {...this.props} key="props" onChange={this.onPropsChange} />,
        <Collapse key="csslist" bordered={false} defaultActiveKey="css" className="collapes-style-list">
          <Panel header={<FormattedMessage id="app.edit.style.header" />} key="css">
            <EditorList
              editorElem={currentEditData.dom}
              onChange={this.onChange}
              cssToDom={false} // 避免多次样式。
              locale={!isCN ? editorEn : editorZh}
              isMobile={mediaStateSelect === 'Mobile'}
              defaultActiveKey={['EditorClassName', 'EditorState', 'EditorFont', 'EditorInterface']}
            >
              <ClassName />
              <State />
              <Font />
              <Interface />
              <BackGround />
              <Border />
              <Margin />
              <Shadow />
              <Transition />
            </EditorList>
          </Panel>
        </Collapse>,
      ]
    );
  }
}
export default EditorComp;
