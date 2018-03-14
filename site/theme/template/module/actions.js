
import AV from 'leancloud-storage';

export const appId = 'ldwQclJenFucBQm0R89fUg4X-gzGzoHsz';
export const appKey = 'upcXCd6NYo05YBfYFbd7Pank';
const fileName = 'List_data';
AV.init({
  appId,
  appKey,
});

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

