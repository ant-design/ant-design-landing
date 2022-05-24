/* eslint-disable no-console */
import xss from 'xss';
import * as r from 'ramda';

import { DEFAULT_FILE_NAME, DEFAULT_USER_AV_NAME, DEFAULT_USER_NAME, DEFAULT_TEMPLATE_DATA } from './constants';
import AV from './leancloud';
import * as url from './url';
import * as ls from './localStorage';

export const xssHref = (str) => {
  if (!(
    str.substr(0, 7) === 'http://'
    || str.substr(0, 8) === 'https://'
    || str.substr(0, 7) === 'mailto:'
    || str.substr(0, 4) === 'tel:'
    || str.substr(0, 11) === 'data:image/'
    || str.substr(0, 6) === 'ftp://'
    || str.substr(0, 2) === './'
    || str.substr(0, 3) === '../'
    || str[0] === '#'
    || str[0] === '/'
  )) {
    return '';
  }
  return xss(str);
};

export const xssFunc = (data) => {
  if (!data) {
    return;
  }
  Object.keys(data).forEach((key) => {
    const item = data[key];
    switch (typeof item) {
      case 'string':
        if (key === 'href') {
          data[key] = xssHref(item);
        } else {
          data[key] = xss(data[key]);
        }
        break;
      case 'object':
        xssFunc(item);
        break;
      default:
        break;
    }
  });
};

export const saveFile = (templateData) => {
  const { uid, data } = templateData;
  if (data.config) {
    xssFunc(data.config);
  }
  const templateObject = AV.Object.createWithoutData(DEFAULT_FILE_NAME, uid);
  Object.keys(data).forEach((key) => {
    templateObject.set(key, data[key]);
  });
  return templateObject.save();
};

export const saveData = (templateData) => {
  const { data: { user } } = templateData;
  let userData;
  if (user && !user.userId) {
    const password = user.password;
    delete user.password;
    const UserObject = AV.Object.extend(DEFAULT_USER_AV_NAME);
    userData = new UserObject();
    userData.set('username', templateData.uid);
    userData.set('password', password);
    return userData.save().then((obj) => {
      user.userId = obj.id;
      ls.setUserAuthState(obj.id, true);
      return saveFile(templateData);
    });
  }

  if (user && user.userId && user.password) {
    userData = AV.Object.createWithoutData(DEFAULT_USER_AV_NAME, user.userId);
    userData.set('password', user.password);
    delete user.password;
    return userData.save().then(() => {
      return saveFile(templateData);
    });
  }

  if (user && user.delete) {
    userData = AV.Object.createWithoutData(DEFAULT_USER_AV_NAME, user.userId);
    userData.destroy().then(() => {
      ls.setUserAuthState(user.userId, undefined);
      delete templateData.data.user;
      return saveFile(templateData);
    });
  }

  return saveFile(templateData);
};

export function getCurrentTemplateId(hash, data) {
  if (hash) return hash;
  if (data) return undefined;

  return r.compose(
    r.last,
    ls.getUserTemplateIds
  )(DEFAULT_USER_NAME);
}

export function updateHistory(template) {
  const { noHistory } = template;
  if (!noHistory || noHistory === 'handle') {
    template.date = template.date || Date.now();
    delete template.noHistory;
    if (!noHistory) {
      ls.removeHistoryAfter(ls.getCurrentData());
      ls.pushToHistory(template);
    }

    ls.saveCurrentData(template);
  }
}

export function saveTemplateToLocalStorage(uid, template) {
  const { id, attributes } = template;

  ls.saveTemplate({ id, attributes });

  const templateIdsInLocalStorage = ls.getUserTemplateIds(uid);

  if (!templateIdsInLocalStorage.some((anId) => anId === id)) {
    ls.unshiftToUserTemplateIds(uid, id);
  }
}

export function removeTemplate(key) {
  const TemplateObject = AV.Object.createWithoutData(DEFAULT_FILE_NAME, key);
  TemplateObject.destroy().then(() => {
    console.log('删除成功');
  });
}

export function newTemplate(uid, data = DEFAULT_TEMPLATE_DATA) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const ProjectObject = AV.Object.extend(DEFAULT_FILE_NAME);

    const templateRecord = new ProjectObject();
    templateRecord.set('template', data.template);
    templateRecord.set('config', data.config);
    templateRecord.set('style', data.style);
    templateRecord.set('other', data.other);
    templateRecord.set('page', data.page);

    try {
      const template = await templateRecord.save();

      url.update('uid', template.id);

      saveTemplateToLocalStorage(uid, template);

      resolve(template);
    } catch (error) {
      reject(error);
    }
  });
}

export function mapStateToProps(state) {
  return state;
}

export function logIn(password, id, cb) {
  const user = AV.Object.createWithoutData(DEFAULT_USER_AV_NAME, id);
  user.fetch().then(() => {
    if (password === user.get('password')) {
      ls.setUserAuthState(id, true);
      cb(true);
    } else {
      cb(false);
    }
  });
}
