/* eslint no-param-reassign: 0 */

// This config is for building dist files
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');

const { webpack } = getWebpackConfig;

const replaceLib = require('antd-tools/lib/replaceLib');

const isDev = process.env.NODE_ENV === 'development';
const antdImport = ['import', { libraryName: 'antd', style: true }];

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better: http://stackoverflow.com/q/25384360
// bisheng webpack module set noParse: [/moment.js/],
// but at rc-picker has the same file(/node_modules/rc-picker/es/generate/moment.js).
// that means babel dont compile it. if your js files is at html,the type is not module ,will cause errors.
// fix issue: https://github.com/ant-design/ant-design-landing/issues/345
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function externalMoment(config) {
  config.externals = config.externals || {};
  config.externals['react-router-dom'] = 'ReactRouterDOM';
  /* config.externals = Object.assign({}, config.externals, {
      react: 'React',
      'react-dom': 'ReactDOM',
  }); */
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

function alertTheme(rules) {
  rules.forEach((rule) => {
    if (Array.isArray(rule.use) && (rule.use.indexOf('less-loader') >= 0
      || rule.use.some((c) => c.loader && (c.loader.indexOf('less-loader') >= 0 || c.loader === 'less-loader')))) {
      rule.use = rule.use.map((item) => {
        if (item.loader && item.loader.indexOf('less-loader') >= 0) {
          item.options = {
            sourceMap: true,
            javascriptEnabled: true,
            modifyVars: {
              '@primary-color': '#2F54EB',
              '@text-color': '#314659',
            },
          };
          return item;
        }
        if (item === 'less-loader') {
          return {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: {
                '@primary-color': '#2F54EB',
                '@text-color': '#314659',
              },
            },
          };
        }
        if (typeof item === 'object') {
          item.options = item.options || {};
          item.options.sourceMap = true;
        }
        return item;
      });
    }
  });
}
function alertBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader.indexOf('babel-loader') >= 0) {
      if (rule.options.plugins.indexOf(replaceLib) === -1) {
        rule.options.plugins.push(replaceLib);
      }
      if (rule.options.plugins.indexOf(antdImport) === -1) {
        rule.options.plugins.push(antdImport);
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
  doraConfig: {
    verbose: true,
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    alertTheme(config.module.rules);
    alertBabelConfig(config.module.rules);
    ignoreMomentLocale(config);
    externalMoment(config);
    config.resolve.alias = {
      'react-router': 'react-router/umd/ReactRouter',
    };

    if (isDev) {
      config.devtool = 'source-map';
    }
    return config;
  },
  htmlTemplateExtraData: {
    isDev,
  },
};
