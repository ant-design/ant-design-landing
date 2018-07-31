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
    case postType.SET_USERTEMPLATE:
      return {
        ...aciton.data.templateData,
      };
    case postType.SET_TEMPLATE:
      return {
        type: state.type,
        uid: state.uid,
        data: aciton.data,
      };
    case postType.SET_EDIT:
    case postType.SET_MEDIA:
    case postType.SET_USER:
      return state || null;
    default:
      return {
        type: postType.POST_DEFAULT,
        data: null,
      };
  }
}

function currentEditData(state, aciton) {
  switch (aciton.type) {
    case postType.SET_EDIT:
      return aciton.data || null;
    case postType.SET_MEDIA:
      return null;
    default:
      return state || null;
  }
}

function mediaStateSelect(state, aciton) {
  switch (aciton.type) {
    case postType.SET_MEDIA:
      return aciton.data || 'Desktop';
    default:
      return state || 'Desktop';
  }
}

function userIsLogin(state, aciton) {
  switch (aciton.type) {
    case postType.SET_USER:
      return aciton.data || false;
    case postType.SET_USERTEMPLATE:
      return aciton.data.userIsLogin || false;
    case postType.POST_SUCCESS:
      return aciton.userIsLogin || false;
    default:
      return state || false;
  }
}

const reducer = combineReducers({
  templateData,
  currentEditData,
  mediaStateSelect,
  userIsLogin,
});

export default reducer;
