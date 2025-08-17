/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
const { webpack } = getWebpackConfig;

// Add PostCSS support
const addPostCssLoader = (config) => {
  // Find CSS rule and modify it
  config.module.rules.forEach(rule => {
    if (rule.test && rule.test.toString().includes('css')) {
      // Add postcss-loader to existing CSS loaders
      rule.use.push({
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      });
    }
  });
};

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better: http://stackoverflow.com/q/25384360
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach((config) => {
    ignoreMomentLocale(config);
    externalMoment(config);
  });
}

// Add Tailwind/PostCSS support to ALL configurations
webpackConfig.forEach(addPostCssLoader);

module.exports = webpackConfig;
