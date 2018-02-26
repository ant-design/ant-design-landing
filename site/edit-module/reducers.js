import { combineReducers } from 'redux';
import { postType } from './actions';


function templateData(state, aciton) {
  switch (aciton.type) {
    case postType.POST_GET:
    case postType.POST_SUCCESS:
    case postType.POST_SET:
    case postType.POST_ERROR:
      return {
        type: aciton.type,
        uid: aciton.templateData.id,
        data: aciton.templateData ? { ...aciton.templateData.attributes } : null,
      };
    case postType.SET_TEMPLATE:
      return {
        type: state.type,
        uid: state.uid,
        data: aciton.data,
      };
    default:
      return {
        type: postType.POST_DEFAULT,
        data: null,
      };
  }
}

const reducer = combineReducers({
  templateData,
});

export default reducer;

