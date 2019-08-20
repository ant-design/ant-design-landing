import { POST_TYPE } from '../actionTypes';

export default function currentEditData(state, action) {
  switch (action.type) {
    case POST_TYPE.SET_EDIT:
      return action.data || null;
    case POST_TYPE.SET_MEDIA:
      return null;
    default:
      return state || null;
  }
}
