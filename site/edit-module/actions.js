
import AV from 'leancloud-storage';
import { getURLData, setURLData } from '../theme/template/utils';

export const appId = 'ogaJShC9qJERt8LqGO80z2pO-gzGzoHsz';
export const appKey = '8e5H5xBF86hI9vItQI1pt4kP';
const fileName = 'Edit';
AV.init({
  appId,
  appKey,
});

const userName = 'antd-landings-user-name';
let t = 0;
export const postType = {
  POST_DEFAULT: 'default',
  POST_SET: 'set',
  POST_SUCCESS: 'success',
  POST_ERROR: 'error',
  SET_TEMPLATE: 'setTemplate',
  SET_EDIT: 'setEdit',
  SET_MEDIA: 'setMedia',
};
export const getUserData = () => (dispatch) => {
  // 获取 url 上是否有 user id;
  const hash = getURLData('uid');
  // 获取本地是否有数据存在 localStorage;
  const uid = hash || (window.localStorage.getItem(userName) && window.localStorage.getItem(userName).split(',')[0]);
  window.localStorage.setItem('abc-test', '');
  console.log(window.localStorage);
  if (!hash && uid) {
    setURLData('uid', uid);
  }
  let tempData;
  if (!uid) {
    // 如果没有，创建个新的；
    const TemplateObject = AV.Object.extend(fileName);
    tempData = new TemplateObject();
    tempData.set('template', [
      /* 'nav_0_0', 'content_0_0', 'content_2_0',
      'content_3_0', 'content_4_0', 'footer_0_0', */
      'Banner1_0',
      'Banner0_0',
    ]);
    tempData.set('config', {});
    tempData.set('style', []);
    tempData.set('other', {});
    tempData.save().then((obj) => {
      setURLData('uid', obj.id);
      window.localStorage.setItem(userName, obj.id);
      dispatch({
        type: postType.POST_SUCCESS,
        templateData: obj,
      });
    }, (error) => {
      console.error(error);
    });
  } else {
    tempData = new AV.Query(fileName);
    tempData.get(uid).then((obj) => {
      dispatch({
        type: postType.POST_SUCCESS,
        templateData: obj,
      });
    }, (error) => {
      console.log(JSON.stringify(error));
      if (error.code === 101) {
        window.localStorage.setItem(userName, '');
        setURLData('uid');
        return getUserData()(dispatch);
      } else if (error.code === -1) {
        t += 1;
        if (t < 3) {
          getUserData()(dispatch);
        } else {
          console.error('数据请求错误：请检查你的 uid 和网络, 再刷新网页。');
        }
      } else if (error.code === 100) {
        console.error('数据挂了，请稍后。');
      }
    });
  }
};

const getData = () => (dispatch) => {
  const query = new AV.Query(fileName);
  return query.find().then(
    tempData => (dispatch({
      type: postType.POST_SUCCESS,
      tempData,
    })),
    error => (dispatch({ type: postType.POST_ERROR, error }))
  );
};

export const fetchData = () => (dispatch, getState) => {
  const state = getState();
  if (state.templateData.type !== postType.POST_SUCCESS) {
    return dispatch(getData());
  }
};

export const setTemplateData = (data) => {
  return {
    type: postType.SET_TEMPLATE,
    data: data.data,
  };
};

export const saveData = (templateData, cb) => {
  const { uid, data } = templateData;
  const templateObject = AV.Object.createWithoutData(fileName, uid);
  Object.keys(data).forEach((key) => {
    templateObject.set(key, data[key]);
  });
  templateObject.save().then(cb, cb);
};

// 编辑 props
export const setCurrentData = (data) => {
  return {
    type: postType.SET_EDIT,
    data,
  };
};

// 编辑 media 状态
export const setCurrentMediaData = (data) => {
  return {
    type: postType.SET_MEDIA,
    data,
  };
};
