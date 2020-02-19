import React from 'react';
import EditorList from 'rc-editor-list';
import editorEn from 'rc-editor-list/lib/locale/en_US';
import editorZh from 'rc-editor-list/lib/locale/zh_CN';
import { Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';

import { deepCopy, getTemplateDataAtPath, setTemplateDataAtPath, mergeEditDataToDefault } from '../../../../utils';
import { isZhCN } from '../../../../theme/template/utils';
import tempData from '../../../../templates/template/element/template.config';
import * as actions from '../../../../shared/redux/actions';

import EditorProps from './PropsComp';
import EditorChild from './ChildComp';
import iframeManager from '../../../../shared/iframe';
import elementRegistry from '../../../../shared/elementRegistry';

const { Panel } = Collapse;

let funcData = {};

const { ClassName, State, Layout, Font, BackGround, Border, Interface, Margin, Shadow, Transition } = EditorList;
class EditorComp extends React.Component {
  onChange = (cb) => {
    const { cssName, currentEditCssString } = cb;
    const { currentEditData, dispatch, templateData } = this.props;
    const { id } = currentEditData;
    const key = elementRegistry.getKey(id);
    const [componentId, path] = key.split('-');
    const [templateId] = componentId.split('_');
    const tempDataSource = mergeEditDataToDefault(
      templateData.data.config[componentId], tempData[templateId]);
    const currentEditTemplateData = getTemplateDataAtPath({
      sourceData: tempDataSource,
      path,
    });
    const newClassName = `${currentEditTemplateData && currentEditTemplateData.className
      ? currentEditTemplateData.className.split(' ').filter(c => c !== cssName).join(' ')
      : ''} ${cssName}`.trim();
    const newTemplateData = deepCopy(templateData);
    setTemplateDataAtPath({
      sourceData: newTemplateData.data.config,
      path: ['className', path].join('&'),
      value: newClassName,
      componentId,
      templateId,
    });
    const data = {
      // className: e.className,
      // cssValue,
      cssString: currentEditCssString,
      // parentClassName,
      id: cb.id,
      cid: componentId,
    };
    newTemplateData.data.style = (newTemplateData.data.style || []).filter(c => c.id !== cb.id);
    newTemplateData.data.style.push(data);
    dispatch(actions.setTemplateData(newTemplateData));
  }

  onPropsChange = (key, value, func, isGroup) => {
    const { dispatch, templateData, currentEditData } = this.props;
    const { id } = currentEditData;
    const eleKey = elementRegistry.getKey(id);
    const keyParts = eleKey.split('-');
    if (isGroup) {
      keyParts.splice(keyParts.length - 1, 1);
    }
    if (func) {
      const dataId = keyParts[0];
      funcData = {
        ...funcData,
        [dataId]: {
          ...funcData[dataId],
          [key]: value,
        },
      };
      const template = {
        ...templateData,
        funcData,
      };
      iframeManager.get().postMessage(template, '*');
      // this.forceUpdate();
    } else {
      const newTemplateData = deepCopy(templateData);
      const [templateId] = keyParts[0].split('_');
      setTemplateDataAtPath({
        sourceData: newTemplateData.data.config,
        path: [keyParts[1], key].join('&'),
        value,
        componentId: keyParts[0],
        templateId,
      });
      dispatch(actions.setTemplateData(newTemplateData));
    }
  }

  onChildChange = (ids, currentData) => {
    const { dispatch, templateData } = this.props;
    const newTemplateData = deepCopy(templateData);
    const [templateId] = ids[0].split('_');
    setTemplateDataAtPath({
      sourceData: newTemplateData.data.config,
      path: [ids[1], 'children'].join('&'),
      value: currentData.children,
      componentId: ids[0],
      templateId,
    });
    dispatch(actions.setTemplateData(newTemplateData));
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
    const { id, currentPopover } = currentEditData;
    const key = elementRegistry.getKey(id);
    const [componentId] = key.split('-');
    const ele = iframeManager.get().document.getElementById(id);
    const edit = ele.getAttribute('data-edit');
    const isPopover = currentPopover.some(c => c.dataId === id);
    return (
      [
        <EditorChild edit={edit} {...this.props} key="child" onChange={this.onChildChange} />,
        <EditorProps
          edit={edit}
          {...this.props}
          key="props"
          onChange={this.onPropsChange}
          funcData={funcData}
          isMobile={mediaStateSelect === 'Mobile'}
        />,
        <Collapse key="cssList" bordered={false} defaultActiveKey="css" className="collapse-style-list">
          <Panel header={<FormattedMessage id="app.edit.style.header" />} key="css">
            <EditorList
              rootSelector={!isPopover ? `#${componentId}` : null}
              editorElem={ele}
              onChange={this.onChange}
              cssToDom={false} // 避免多次样式。
              locale={!isCN ? editorEn : editorZh}
              isMobile={mediaStateSelect === 'Mobile'}
              defaultActiveKey={['EditorClassName', 'EditorState', 'EditorLayout', 'EditorFont', 'EditorInterface']}
            >
              <ClassName />
              <State />
              <Layout />
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
