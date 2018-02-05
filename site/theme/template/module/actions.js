
import AV from 'leancloud-storage';

export const appId = 'ldwQclJenFucBQm0R89fUg4X-gzGzoHsz';
export const appKey = 'upcXCd6NYo05YBfYFbd7Pank';
const fileName = 'List_data';
AV.init({
  appId,
  appKey,
});

/* const ListData = AV.Object.extend('List_data');
const list = new ListData();
list.set('name', 'seeconf 官网');
list.set('image', 'https://gw.alipayobjects.com/zos/rmsportal/AUIbyJxfwerASkPBwFmD.jpg');
list.set('preview', 'https://seeconf-pre.site.alipay.net/');
list.set('git', 'https://github.com/ant-motion/seeconf-landing-page');
list.save().then((obj) => {
  console.log(obj);
}, (error) => {
  console.log(error);
}); */

export const postType = {
  POST_DEFAULT: 'default',
  POST_SET: 'set',
  POST_SUCCESS: 'success',
  POST_ERROR: 'error',
  POST_RE: 'reload',
};
const getData = () => (dispatch) => {
  const query = new AV.Query(fileName);
  return query.find().then(listData => (dispatch({
    type: postType.POST_SUCCESS,
    listData,
  })),
  error => (dispatch({ type: postType.POST_ERROR, error })));
};
export const fetchListData = () => (dispatch, getState) => {
  const state = getState();
  if (state.listData.type !== postType.POST_SUCCESS) {
    return dispatch(getData());
  }
};

