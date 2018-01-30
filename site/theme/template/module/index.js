import { combineReducers } from 'redux';

function todos(state = []) {
  console.log(state);
  return [
    { list: 1 },
  ];
}

const module = combineReducers({
  todos,
});

export default module;

