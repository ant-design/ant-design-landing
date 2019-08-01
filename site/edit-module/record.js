import { objectEqual } from '../utils';

export const recordName = 'ant-design-landing-record';
export const currentDataName = 'ant-design-landing-current';

export const getRecord = () => JSON.parse(window.localStorage.getItem(recordName) || '[]');

export const setRecord = (data) => {
  const record = getRecord();
  if (record.length >= 50) {
    record.shift();
  }
  record.push(data);
  window.localStorage.setItem(recordName, JSON.stringify(record));
};

export const rmRecordAfter = (data) => {
  const record = getRecord();
  const index = record.findIndex(c => objectEqual(c, data));
  if (index !== record.length - 1 && index !== -1) {
    // 删除当前数据后面的所有数据；
    record.splice(index + 1, record.length - 1);
    window.localStorage.setItem(recordName, JSON.stringify(record));
  }
};

export const reRecord = () => {
  window.localStorage.setItem(recordName, '[]');
};

export const setCurrentDataToLocal = (data) => {
  window.localStorage.setItem(currentDataName, JSON.stringify(data));
};

export const getCurrentDataLocal = () => JSON.parse(window.localStorage.getItem(currentDataName) || '');
