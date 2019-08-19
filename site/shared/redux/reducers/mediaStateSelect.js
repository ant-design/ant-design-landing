import { POST_TYPE } from '../actionTypes';

export default function mediaStateSelect(state, action) {
  switch (action.type) {
    case POST_TYPE.SET_MEDIA:
      return action.data || 'Desktop';
    default:
      return state || 'Desktop';
  }
}
