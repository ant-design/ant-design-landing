import { GET_USER_DATA, CREATE_NEW_TEMPLATE, SET_TEMPLATE_DATA, CHANGE_CHILD, POST_TYPE, SET_USER_AND_TEMPLATE_DATA } from './actionTypes';

export const getUserData = (data) => ({
  type: GET_USER_DATA,
  data,
});

export const createNewTemplate = (data) => ({
  type: CREATE_NEW_TEMPLATE,
  data,
});

export const setTemplateData = (data) => ({
  type: SET_TEMPLATE_DATA,
  data,
});

export const changeChild = (data) => ({
  type: CHANGE_CHILD,
  data,
});

export const setUserAndTemplateData = (data) => ({
  type: SET_USER_AND_TEMPLATE_DATA,
  data,
});

// 编辑 props
export const setCurrentData = (data) => {
  return {
    type: POST_TYPE.SET_EDIT,
    data,
  };
};

// 编辑 media 状态
export const setCurrentMediaData = (data) => {
  return {
    type: POST_TYPE.SET_MEDIA,
    data,
  };
};

export const setUserData = (data) => {
  return {
    type: POST_TYPE.SET_USER,
    data,
  };
};

// 记录 history 步数;
export const setCurrentHistoryNum = (data) => {
  return {
    type: POST_TYPE.SET_HISTORY_NUM,
    data,
  };
};
// 删除之前，保存当前的
export const updateHistoryReNum = (data) => {
  return {
    type: POST_TYPE.UPDATE_HISTORY_RE_NUM,
    data,
  };
};
