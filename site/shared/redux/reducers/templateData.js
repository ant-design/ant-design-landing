import { POST_TYPE } from '../actionTypes';

const TEMPLATE_TYPE = {
  DEFAULT: 'default',
  SET: 'set',
  SUCCESS: 'success',
  ERROR: 'error',
};

function resolveTemplateType(actionType) {
  switch (actionType) {
    case POST_TYPE.POST_SET:
      return TEMPLATE_TYPE.SET;
    case POST_TYPE.POST_SUCCESS:
      return TEMPLATE_TYPE.SUCCESS;
    case POST_TYPE.POST_ERROR:
      return TEMPLATE_TYPE.ERROR;
    default:
      return TEMPLATE_TYPE.DEFAULT;
  }
}

export default function templateData(state, action) {
  switch (action.type) {
    case POST_TYPE.POST_SUCCESS:
    case POST_TYPE.POST_SET:
    case POST_TYPE.POST_ERROR:
      return {
        type: resolveTemplateType(action.type),
        uid: action.templateData.id,
        data: action.templateData ? { ...action.templateData.attributes } : null,
      };
    case POST_TYPE.SET_USERTEMPLATE:
      return {
        ...action.data.templateData,
      };
    case POST_TYPE.SET_TEMPLATE:
      return {
        type: state.type,
        uid: state.uid,
        data: action.data,
      };
    case POST_TYPE.SET_EDIT:
    case POST_TYPE.SET_MEDIA:
    case POST_TYPE.SET_USER:
      return state || null;
    default:
      return state || {
        type: resolveTemplateType(action.type),
        data: null,
      };
  }
}
