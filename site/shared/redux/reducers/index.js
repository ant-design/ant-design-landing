import { combineReducers } from 'redux';
import templateData from './templateData';
import currentEditData from './currentEditData';
import mediaStateSelect from './mediaStateSelect';
import userIsLogin from './userIsLogin';

const reducer = combineReducers({
  templateData,
  currentEditData,
  mediaStateSelect,
  userIsLogin,
});

export default reducer;
