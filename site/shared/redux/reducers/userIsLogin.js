import { POST_TYPE } from '../actionTypes';

export default function userIsLogin(state, action) {
  switch (action.type) {
    case POST_TYPE.SET_USER:
      return action.data || false;
    case POST_TYPE.SET_USERTEMPLATE:
      return action.data.userIsLogin || false;
    case POST_TYPE.POST_SUCCESS:
      return action.userIsLogin || false;
    default:
      return state || false;
  }
}
