import store from 'store';

import { objectEqual } from '../utils';

export const LOCAL_STORAGE_HISTORY_KEY = 'ant-design-landing-record';
export const LOCAL_STORAGE_CURRENT_DATA_KEY = 'ant-design-landing-current';

/**
 * Auth
 */

export function getUserAuthState(userId) {
  return !!store.get(`antd-landing-login-${userId}`);
}

export function setUserAuthState(userId, state) {
  store.set(`antd-landing-login-${userId}`, state);
}

/**
 * User
 */

export function getUserTemplateIds(userId) {
  return store.get(userId, []);
}

export function unshiftToUserTemplateIds(userId, tid) {
  const ids = getUserTemplateIds(userId);
  store.set(userId, [tid, ...ids]);
}

export function removeUserTemplateIds(userId) {
  store.remove(userId);
}

export function removeUserTemplate(userId, tid) {
  const ids = getUserTemplateIds(userId);
  store.set(userId, ids.filter(id => id !== tid));
}

/**
 * Template
 */

export function getTemplate(tid) {
  return store.get(tid, undefined);
}

export function saveTemplate(template) {
  store.set(template.id, template);
}

export function removeTemplate(tid) {
  store.remove(tid);
}


/**
 * History
 */

export const getHistory = () => store.get(LOCAL_STORAGE_HISTORY_KEY, []);

// TODO: why 30?
export const pushToHistory = (data) => {
  const history = getHistory();
  if (history.length >= 30) {
    history.shift();
  }
  history.push(data);

  store.set(LOCAL_STORAGE_HISTORY_KEY, history);
};

export const removeHistoryAfter = (data) => {
  const history = getHistory();

  const index = history.findIndex(c => objectEqual(c, data));
  if (index === -1) {
    return;
  }

  store.set(LOCAL_STORAGE_HISTORY_KEY, history.slice(0, index + 1));
};

export const resetHistory = () => {
  store.set(LOCAL_STORAGE_HISTORY_KEY, []);
};

/**
 * CurrentData
 */

export const saveCurrentData = (data) => {
  store.set(LOCAL_STORAGE_CURRENT_DATA_KEY, data);
};

export const getCurrentData = () => store.get(LOCAL_STORAGE_CURRENT_DATA_KEY, {});
