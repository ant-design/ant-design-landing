/* eslint-env worker */
/* eslint no-var: off, strict: off */

var parsersLoaded = {};

// "Polyfills" in order for all the code to run
/* eslint-disable */
self.global = self;
self.util = {};
self.path = {};
self.path.resolve = self.path.join = self.path.dirname = function () {
  return "";
};
self.path.parse = function () {
  return { root: "" };
};
self.Buffer = {
  isBuffer: function () {
    return false;
  }
};
self.constants = {};
module$1 = module = os = crypto = {};
self.fs = { readFile: function () { } };
os.homedir = function () {
  return "/home/prettier";
};
os.EOL = '\n';
self.process = {
  argv: [],
  env: { PRETTIER_DEBUG: true },
  version: "v8.5.0",
  binding: function () {
    return {};
  },
  cwd: function () {
    return "";
  }
};
self.assert = { ok: function () { }, strictEqual: function () { } };
self.require = function require(path) {
  if (path === "stream") {
    return { PassThrough() { } };
  }
  if (path === "./third-party") {
    return {};
  }

  if (~path.indexOf("parser-")) {
    var parser = path.replace(/.+-/, "");
    if (!parsersLoaded[parser]) {
      importScripts("./lib/parser-" + parser + ".js");
      parsersLoaded[parser] = true;
    }
    return self[parser];
  }

  return self[path];
};

/* eslint-enable */

let prettier;
importScripts('./lib/index.js');
if (typeof prettier === 'undefined') {
  prettier = module.exports; // eslint-disable-line
}
if (typeof prettier === 'undefined') {
  prettier = index; // eslint-disable-line
}

function formatCode(text, options) {
  try {
    return prettier.format(text, options);
  } catch (e) {
    if (e.constructor && e.constructor.name === 'SyntaxError') {
      // Likely something wrong with the user's code
      return String(e);
    }
    // Likely a bug in Prettier
    // Provide the whole stack for debugging
    return e.stack || String(e);
  }
}

self.onmessage = function (message) {
  var options = message.data.options || {};
  options.parser = options.parser || 'babylon';
  const formatted = formatCode(message.data.text, options);


  self.postMessage({
    formatted,
    key: message.data.key,
    version: prettier.version,
  });
};

