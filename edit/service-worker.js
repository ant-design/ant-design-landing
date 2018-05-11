/* eslint-env serviceworker */
/* global toolbox */


importScripts('lib/sw-toolbox.js');

toolbox.precache([
  // Scripts
  'lib/index.js',
  'lib/parser-babylon.js',
  'lib/parser-postcss.js',
  'lib/parser-flow.js',
  'lib/parser-glimmer.js',
  'lib/parser-graphql.js',
  'lib/sw-toolbox.js',
]);

// Default to hit the cache only if there's a network error
toolbox.router.default = toolbox.networkFirst;

// For scripts, stylesheets and images, we can use the "fastest" strategy
// This means you need to reload twice to get new changes
toolbox.router.get(/\.(js|css|png|svg)$/, toolbox.fastest);
