/* eslint no-param-reassign: 0 */
const theme = require('../theme.js')();

const replaceLib = require('antd-tools/lib/replaceLib');

const isDev = process.env.NODE_ENV === 'development';

const pluginAntdConfig = {
  babelConfig: JSON.stringify({
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
    ],
  }),
};

function alertBabelConfig(rules) {
  rules.forEach((rule) => {
    if (Array.isArray(rule.use) && rule.use.indexOf('less-loader') >= 0) {
      rule.use = rule.use.map((item) => {
        if (item === 'less-loader') {
          return {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: theme,
            },
          };
        }
        if (typeof item === 'object') {
          item.options.sourceMap = true;
        }
        return item;
      });
      console.log(rule, rule.test, typeof rule.test === 'function' ? rule.test('dsdsf.less') : null);
    }
    if (rule.loader && rule.loader === 'babel-loader') {
      if (rule.options.plugins.indexOf(replaceLib) === -1) {
        rule.options.plugins.push(replaceLib);
      }
      /* rule.options.plugins = rule.options.plugins.filter(plugin =>
        !plugin.indexOf || plugin.indexOf('babel-plugin-add-module-exports') === -1
      ); */
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {},
  plugins: [
    `bisheng-plugin-react?${JSON.stringify(pluginAntdConfig)}`,
  ],
  webpackConfig(config) {
    config.resolve.alias = {
      'react-router': 'react-router/umd/ReactRouter',
    };

    alertBabelConfig(config.module.rules);
    config.externals = config.externals || {};
    config.externals['react-router-dom'] = 'ReactRouterDOM';
    config.externals = Object.assign({}, config.externals, {
      react: 'React',
      'react-dom': 'ReactDOM',
    });
    return config;
  },
  htmlTemplateExtraData: {
    isDev,
  },
};
