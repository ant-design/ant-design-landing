import { POST_TYPE } from '../actionTypes';

export default function historyEdit(state, action) {
  switch (action.type) {
    case POST_TYPE.SET_HISTORY_NUM:
      return {
        ...state,
        num: action.data,
      };
    case POST_TYPE.UPDATE_HISTORY_RE_NUM:
      return {
        num: 0,
        history: (state.num
          ? [action.data, ...state.history.filter((c, i) => i >= state.num && c)]
          : [action.data, ...state.history]).filter((c, i) => i < 30 && c), // 只记录30步
      };
    default:
      return state || {
        num: 0,
        history: [],
      };
  }
}
