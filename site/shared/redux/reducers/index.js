import { combineReducers } from 'redux';
import templateData from './templateData';
import currentEditData from './currentEditData';
import mediaStateSelect from './mediaStateSelect';
import userIsLogin from './userIsLogin';
import historyEdit from './historyEdit';

const reducer = combineReducers({
  templateData,
  currentEditData,
  mediaStateSelect,
  userIsLogin,
  historyEdit,
});

export default reducer;
