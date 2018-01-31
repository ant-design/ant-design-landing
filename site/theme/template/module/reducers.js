import { combineReducers } from 'redux';
import { postType } from './actions';


function listData(state, aciton) {
  switch (aciton.type) {
    case postType.POST_GET:
    case postType.POST_SUCCESS:
    case postType.POST_SET:
    case postType.POST_ERROR:
      return {
        type: aciton.type,
        data: aciton.listData || [],
      };
    default:
      return {
        type: postType.POST_DEFAULT,
        data: [],
      };
  }
}

const reducer = combineReducers({
  listData,
});

export default reducer;

