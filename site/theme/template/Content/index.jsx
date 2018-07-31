import collect from 'bisheng/collect';
import MainContent from './MainContent';
import * as utils from '../utils';

export default collect(async (nextProps) => {
  const pathname = nextProps.location.pathname;

  const path = pathname.replace('-cn', '');

  const pageDataPath = path.split('/');

  if (/\/components/.test(path) && pageDataPath[1]) {
    const str = pageDataPath[1];
    pageDataPath[1] = str.charAt(0).toUpperCase() + str.slice(1);
  }

  const pageData = nextProps.utils.get(nextProps.data, pageDataPath);

  // 路由跳转统一处理
  if (pathname === 'components') {
    location.href = '/components/AvatarList';
    return;
  }

  if (!pageData) {
    throw 404; // eslint-disable-line no-throw-literal
  }
  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const pageDataPromise = typeof pageData === 'function'
    ? pageData() : (pageData[locale] || pageData.index[locale] || pageData.index)();
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo']);
  if (demosFetcher) {
    const [localizedPageData, demos] = await Promise.all([pageDataPromise, demosFetcher()]);
    return { localizedPageData, demos };
  }
  return { localizedPageData: await pageDataPromise };
})(MainContent);
