import React from 'react';
import EditorList from 'rc-editor-list';
import editorEn from 'rc-editor-list/lib/locale/en_US';
import editorZh from 'rc-editor-list/lib/locale/zh_CN';
import { Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';

import { deepCopy, getDataSourceValue, setDataSourceValue, mergeEditDataToDefault } from '../../../../utils';
import { isZhCN } from '../../../../theme/template/utils';
import tempData from '../../../../templates/template/element/template.config';
import * as actions from '../../../../shared/redux/actions';

import EditorProps from './PropsComp';
import EditorChild from './ChildComp';

const { Panel } = Collapse;

let funcData = {};

const { ClassName, State, Layout, Font, BackGround, Border, Interface, Margin, Shadow, Transition } = EditorList;
class EditorComp extends React.Component {
  onChange = (cb) => {
    const { cssName, currentEditCssString, isDrag } = cb;
    const { currentEditData, dispatch, templateData } = this.props;
    const { id } = currentEditData;
    const ids = id.split('-');
    const cid = ids[0].split('_')[0];
    const tempDataSource = mergeEditDataToDefault(
      templateData.data.config[ids[0]], tempData[cid]);
    const currentEditTemplateData = getDataSourceValue(ids[1], tempDataSource);
    const newClassName = `${currentEditTemplateData && currentEditTemplateData.className
      ? currentEditTemplateData.className.split(' ').filter((c) => c !== cssName).join(' ')
      : ''} ${cssName}`.trim();
    const newTemplateData = deepCopy(templateData);
    setDataSourceValue(ids, 'className', newClassName, newTemplateData.data.config);
    const data = {
      // className: e.className,
      // cssValue,
      cssString: currentEditCssString,
      // parentClassName,
      id: cb.id,
      cid: ids[0],
    };
    newTemplateData.data.style = (newTemplateData.data.style || []).filter((c) => c.id !== cb.id);
    newTemplateData.data.style.push(data);
    newTemplateData.noHistory = isDrag;
    dispatch(actions.setTemplateData(newTemplateData));
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
      currentEditData.iframe.postMessage(template, '*');
      // this.forceUpdate();
    } else {
      const newTemplateData = deepCopy(templateData);
      setDataSourceValue(ids, key, value, newTemplateData.data.config);
      dispatch(actions.setTemplateData(newTemplateData));
    }
  }

  onChildChange = (ids, currentData) => {
    const { dispatch, templateData } = this.props;
    const newTemplateData = deepCopy(templateData);
    setDataSourceValue(ids, 'children', currentData.children, newTemplateData.data.config);
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
    const ids = id.split('-');
    const edit = currentEditData.dom.getAttribute('data-edit');
    const isPopover = currentPopover.some((c) => c.dataId === id);
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
              rootSelector={!isPopover ? `#${ids[0]}` : null}
              editorElem={currentEditData.dom}
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
