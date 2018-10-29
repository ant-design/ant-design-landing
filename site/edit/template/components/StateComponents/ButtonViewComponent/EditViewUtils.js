import { mergeEditDataToDefault, deepCopy, getDataSourceValue, setDataSourceValue } from '../../../../../utils';
import tempData from '../../../../../templates/template/element/template.config';
import { setTemplateData } from '../../../../../edit-module/actions';

export const getIdsAndCurrentData = (currentEditData, templateData, key) => {
  const { id } = currentEditData;
  const ids = id.split('-');
  ids[1] = key;
  const cid = ids[0].split('_')[0];
  const tempDataSource = tempData[cid];
  const newTempDataSource = mergeEditDataToDefault(templateData.data.config[ids[0]],
    tempDataSource);
  const currentEditTemplateData = getDataSourceValue(key, newTempDataSource);
  return { ids, currentEditTemplateData };
};

export const onChildChange = (dispatch, templateData, ids, currentData) => {
  const newTemplateData = deepCopy(templateData);
  setDataSourceValue(ids, 'children', currentData.children, newTemplateData.data.config);
  dispatch(setTemplateData(newTemplateData));
};
