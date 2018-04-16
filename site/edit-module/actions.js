
import AV from 'leancloud-storage';
import { getURLData, setURLData } from '../theme/template/utils';

/* const firebase = window.firebase;
firebase.initializeApp({
  apiKey: 'AIzaSyD8iObwfoSImxi4Dg5hw5Y7Yy6x0VgrzTw',
  authDomain: 'landings-9971b.firebaseapp.com',
  projectId: 'landings-9971b',
});
const db = firebase.firestore();
async function dsfsdf() {
  await db.collection('landings').add({ first: 2 });
  // const tt = await db.collection('landings').doc('4BIuYEh2sIAxZv34y3LH').delete();
}

dsfsdf(); */

export const appId = 'ogaJShC9qJERt8LqGO80z2pO-gzGzoHsz';
export const appKey = '8e5H5xBF86hI9vItQI1pt4kP';
const fileName = 'Edit';
AV.init({
  appId,
  appKey,
});

export const userName = 'antd-landings-user-name';
let t = 0;
let localNum = 0;
export const postType = {
  POST_DEFAULT: 'default',
  POST_SET: 'set',
  POST_SUCCESS: 'success',
  POST_ERROR: 'error',
  SET_TEMPLATE: 'setTemplate',
  SET_EDIT: 'setEdit',
  SET_MEDIA: 'setMedia',
};

export const removeTemplate = (key) => {
  const TemplateObject = AV.Object.createWithoutData(fileName, key);
  TemplateObject.destroy().then(() => {
    console.log('删除成功');
  });
};
export const newTemplate = (cb) => {
  const TemplateObject = AV.Object.extend(fileName);
  const tempData = new TemplateObject();
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
    window.localStorage.setItem(userName, `${obj.id},${
      window.localStorage.getItem(userName) || ''}`);
    cb(obj);
  }, (error) => {
    console.error(error);
  });
};

export const switchTemplate = (key) => {
  setURLData('uid', key);
  location.reload();
};
export const getUserData = () => (dispatch) => {
  // 获取 url 上是否有 user id;
  const hash = getURLData('uid');
  /**
   * 进入页面:
   * 1. 如果 hash 里有值, 请求 hash 里的值，当值没有返回数据，依次往下取 localStorage 里的值，没有将删除再新建。
   * 2. 空 hash 进入, 依次往下取 localStorage 里的值, 没有将删除再新建。
   */
  // 获取本地是否有数据存在 localStorage;
  const localStorage = (window.localStorage.getItem(userName) &&
    window.localStorage.getItem(userName).split(',').filter(c => c)) || [];
  const uid = hash || localStorage[localNum];
  localNum += 1;
  console.log(localStorage);
  if (!hash && uid) {
    setURLData('uid', uid);
  }
  if (!uid) {
    newTemplate((obj) => {
      dispatch({
        type: postType.POST_SUCCESS,
        templateData: obj,
      });
    });
  } else {
    const tempData = new AV.Query(fileName);
    tempData.get(uid).then((obj) => {
      const inLocal = localStorage.some(key => key === uid);
      let localStr = localStorage.join(',');
      if (!inLocal) {
        localStr = `${uid},${localStr}`;
      }
      window.localStorage.setItem(userName, localStr);
      dispatch({
        type: postType.POST_SUCCESS,
        templateData: obj,
      });
    }, (error) => {
      console.log(JSON.stringify(error));
      if (error.code === 101) {
        window.localStorage.setItem(userName, localStorage.filter(key => key !== uid).join(','));
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
