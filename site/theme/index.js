const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';

function pickerGenerator() {
  const tester = new RegExp('^docs/');
  return (markdownData) => {
    const filename = markdownData.meta.filename;
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
  };
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    docs: pickerGenerator(),
    'docs/guide': pickerGenerator('guide'),
    'docs/use': pickerGenerator('use'),
    'docs/edit': pickerGenerator('edit'),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [
      {
        path: 'index-cn',
        component: homeTmpl,
      },
      {
        path: '/docs/:children',
        component: contentTmpl,
      },
      {
        path: '/docs/:file/:children',
        component: contentTmpl,
      },
    ],
  },
};
