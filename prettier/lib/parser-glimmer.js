var glimmer = (function (fs) {
fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode$1 = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode$1,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode,
	decode: decode
};

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$1() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$1.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$1();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$1.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$1.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$1.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$1.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$1.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$1.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet$1;

var arraySet = {
	ArraySet: ArraySet_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList$1.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

var MappingList_1 = MappingList$1;

var mappingList = {
	MappingList: MappingList_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet = arraySet.ArraySet;
var MappingList = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator$1(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator$1.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator$1.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator$1({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator$1.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator$1.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator$1.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator$1.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator$1.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64Vlq.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64Vlq.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64Vlq.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64Vlq.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64Vlq.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator$1.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator$1.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator$1.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

var SourceMapGenerator_1 = SourceMapGenerator$1;

var sourceMapGenerator = {
	SourceMapGenerator: SourceMapGenerator_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort$1 = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$2 = arraySet.ArraySet;

var quickSort = quickSort$1.quickSort;

function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer$1.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer$1.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer$1.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer$1.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer$1.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer$1.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer$1.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer$1.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$2.fromArray(names.map(String), true);
  this._sources = ArraySet$2.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$2.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$2.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$2();
  this._names = new ArraySet$2();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer$1(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator$2 = sourceMapGenerator.SourceMapGenerator;


// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode$1(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode$1.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode$1();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode$1(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode$1.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode$1.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode$1.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode$1.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode$1.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode$1.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode$1.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode$1.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode$1.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator$2(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

var SourceNode_1 = SourceNode$1;

var sourceNode = {
	SourceNode: SourceNode_1
};

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
var SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;
var SourceNode = sourceNode.SourceNode;

var sourceMap = {
	SourceMapGenerator: SourceMapGenerator,
	SourceMapConsumer: SourceMapConsumer,
	SourceNode: SourceNode
};

var parserGlimmer_1 = createCommonjsModule(function (module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(t) {
  return t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "default" in t ? t.default : t;
}var fs$$1 = _interopDefault(fs);function createError(t, e) {
  var r = new SyntaxError(t + " (" + e.start.line + ":" + e.start.column + ")");return r.loc = e, r;
}var parserCreateError = createError;function isCall(t) {
  return "SubExpression" === t.type || "MustacheStatement" === t.type && "PathExpression" === t.path.type;
}function isLiteral(t) {
  return !("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || !t.type.match(/Literal$/));
}var nodes = Object.freeze({ isCall: isCall, isLiteral: isLiteral });function buildMustache(t, e, r, a, i) {
  return isLiteral(t) || (t = buildPath(t)), { type: "MustacheStatement", path: t, params: e || [], hash: r || buildHash([]), escaped: !a, loc: buildLoc(i || null) };
}function buildBlock(t, e, r, a, i, n) {
  return { type: "BlockStatement", path: buildPath(t), params: e || [], hash: r || buildHash([]), program: a || null, inverse: i || null, loc: buildLoc(n || null) };
}function buildElementModifier(t, e, r, a) {
  return { type: "ElementModifierStatement", path: buildPath(t), params: e || [], hash: r || buildHash([]), loc: buildLoc(a || null) };
}function buildPartial(t, e, r, a, i) {
  return { type: "PartialStatement", name: t, params: e || [], hash: r || buildHash([]), indent: a || "", strip: { open: !1, close: !1 }, loc: buildLoc(i || null) };
}function buildComment(t, e) {
  return { type: "CommentStatement", value: t, loc: buildLoc(e || null) };
}function buildMustacheComment(t, e) {
  return { type: "MustacheCommentStatement", value: t, loc: buildLoc(e || null) };
}function buildConcat(t, e) {
  return { type: "ConcatStatement", parts: t || [], loc: buildLoc(e || null) };
}function buildElement(t, e, r, a, i, n) {
  return Array.isArray(i) || (n = i, i = []), { type: "ElementNode", tag: t || "", attributes: e || [], blockParams: [], modifiers: r || [], comments: i || [], children: a || [], loc: buildLoc(n || null) };
}function buildAttr(t, e, r) {
  return { type: "AttrNode", name: t, value: e, loc: buildLoc(r || null) };
}function buildText(t, e) {
  return { type: "TextNode", chars: t || "", loc: buildLoc(e || null) };
}function buildSexpr(t, e, r, a) {
  return { type: "SubExpression", path: buildPath(t), params: e || [], hash: r || buildHash([]), loc: buildLoc(a || null) };
}function buildPath(t, e) {
  if ("string" != typeof t) return t;var r = t.split("."),
      a = !1;return "this" === r[0] && (a = !0, r = r.slice(1)), { type: "PathExpression", original: t, this: a, parts: r, data: !1, loc: buildLoc(e || null) };
}function buildLiteral(t, e, r) {
  return { type: t, value: e, original: e, loc: buildLoc(r || null) };
}function buildHash(t, e) {
  return { type: "Hash", pairs: t || [], loc: buildLoc(e || null) };
}function buildPair(t, e, r) {
  return { type: "HashPair", key: t, value: e, loc: buildLoc(r || null) };
}function buildProgram(t, e, r) {
  return { type: "Program", body: t || [], blockParams: e || [], loc: buildLoc(r || null) };
}function buildSource(t) {
  return t || null;
}function buildPosition(t, e) {
  return { line: t, column: e };
}var SYNTHETIC = { source: "(synthetic)", start: { line: 1, column: 0 }, end: { line: 1, column: 0 } };function buildLoc() {
  for (var _len = arguments.length, t = Array(_len), _key = 0; _key < _len; _key++) {
    t[_key] = arguments[_key];
  }

  if (1 === t.length) {
    var e = t[0];return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? { source: buildSource(e.source), start: buildPosition(e.start.line, e.start.column), end: buildPosition(e.end.line, e.end.column) } : SYNTHETIC;
  }{
    var _e = t[0],
        r = t[1],
        a = t[2],
        i = t[3],
        n = t[4];
    return { source: buildSource(n), start: buildPosition(_e, r), end: buildPosition(a, i) };
  }
}var b = { mustache: buildMustache, block: buildBlock, partial: buildPartial, comment: buildComment, mustacheComment: buildMustacheComment, element: buildElement, elementModifier: buildElementModifier, attr: buildAttr, text: buildText, sexpr: buildSexpr, path: buildPath, concat: buildConcat, hash: buildHash, pair: buildPair, literal: buildLiteral, program: buildProgram, loc: buildLoc, pos: buildPosition, string: literal("StringLiteral"), boolean: literal("BooleanLiteral"), number: literal("NumberLiteral"), undefined: function undefined() {
    return buildLiteral("UndefinedLiteral", void 0);
  }, null: function _null() {
    return buildLiteral("NullLiteral", null);
  } };function literal(t) {
  return function (e) {
    return buildLiteral(t, e);
  };
}var SyntaxError$1 = function () {
  function t(t, e) {
    var r = Error.call(this, t);this.message = t, this.stack = r.stack, this.location = e;
  }return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}();var ID_INVERSE_PATTERN = /[!"#%-,\.\/;->@\[-\^`\{-~]/;function parseElementBlockParams(t) {
  var e = parseBlockParams(t);e && (t.blockParams = e);
}function parseBlockParams(t) {
  var e = t.attributes.length,
      r = [];for (var _a = 0; _a < e; _a++) {
    r.push(t.attributes[_a].name);
  }var a = r.indexOf("as");if (-1 !== a && e > a && "|" === r[a + 1].charAt(0)) {
    var i = r.slice(a).join(" ");if ("|" !== i.charAt(i.length - 1) || 2 !== i.match(/\|/g).length) throw new SyntaxError$1("Invalid block parameters syntax: '" + i + "'", t.loc);var n = [];for (var s = a + 1; s < e; s++) {
      var _e2 = r[s].replace(/\|/g, "");if ("" !== _e2) {
        if (ID_INVERSE_PATTERN.test(_e2)) throw new SyntaxError$1("Invalid identifier for block parameters: '" + _e2 + "' in '" + i + "'", t.loc);n.push(_e2);
      }
    }if (0 === n.length) throw new SyntaxError$1("Cannot use zero block parameters: '" + i + "'", t.loc);return t.attributes = t.attributes.slice(0, a), n;
  }return null;
}function childrenFor(t) {
  switch (t.type) {case "Program":
      return t.body;case "ElementNode":
      return t.children;}
}function appendChild(t, e) {
  childrenFor(t).push(e);
}function isLiteral$1(t) {
  return "StringLiteral" === t.type || "BooleanLiteral" === t.type || "NumberLiteral" === t.type || "NullLiteral" === t.type || "UndefinedLiteral" === t.type;
}function printLiteral(t) {
  return "UndefinedLiteral" === t.type ? "undefined" : JSON.stringify(t.value);
}var namedCharRefs = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", AMP: "&", amp: "&", And: "⩓", and: "∧", andand: "⩕", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsd: "∡", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", ap: "≈", apacir: "⩯", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", Barwed: "⌆", barwed: "⌅", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", Because: "∵", because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxDL: "╗", boxDl: "╖", boxdL: "╕", boxdl: "┐", boxDR: "╔", boxDr: "╓", boxdR: "╒", boxdr: "┌", boxH: "═", boxh: "─", boxHD: "╦", boxHd: "╤", boxhD: "╥", boxhd: "┬", boxHU: "╩", boxHu: "╧", boxhU: "╨", boxhu: "┴", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxUL: "╝", boxUl: "╜", boxuL: "╛", boxul: "┘", boxUR: "╚", boxUr: "╙", boxuR: "╘", boxur: "└", boxV: "║", boxv: "│", boxVH: "╬", boxVh: "╫", boxvH: "╪", boxvh: "┼", boxVL: "╣", boxVl: "╢", boxvL: "╡", boxvl: "┤", boxVR: "╠", boxVr: "╟", boxvR: "╞", boxvr: "├", bprime: "‵", Breve: "˘", breve: "˘", brvbar: "¦", Bscr: "ℬ", bscr: "𝒷", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsol: "\\", bsolb: "⧅", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", Cap: "⋒", cap: "∩", capand: "⩄", capbrcup: "⩉", capcap: "⩋", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", CenterDot: "·", centerdot: "·", Cfr: "ℭ", cfr: "𝔠", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", cir: "○", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", Colon: "∷", colon: ":", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", Conint: "∯", conint: "∮", ContourIntegral: "∮", Copf: "ℂ", copf: "𝕔", coprod: "∐", Coproduct: "∐", COPY: "©", copy: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", Cross: "⨯", cross: "✗", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", Cup: "⋓", cup: "∪", cupbrcap: "⩈", CupCap: "≍", cupcap: "⩆", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", Dagger: "‡", dagger: "†", daleth: "ℸ", Darr: "↡", dArr: "⇓", darr: "↓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", DD: "ⅅ", dd: "ⅆ", ddagger: "‡", ddarr: "⇊", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", Diamond: "⋄", diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrow: "↓", Downarrow: "⇓", downarrow: "↓", DownArrowBar: "⤓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVector: "↽", DownLeftVectorBar: "⥖", DownRightTeeVector: "⥟", DownRightVector: "⇁", DownRightVectorBar: "⥗", DownTee: "⊤", DownTeeArrow: "↧", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", ecir: "≖", Ecirc: "Ê", ecirc: "ê", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", eDot: "≑", edot: "ė", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp: " ", emsp13: " ", emsp14: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", Escr: "ℰ", escr: "ℯ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", ExponentialE: "ⅇ", exponentiale: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", ForAll: "∀", forall: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", Fscr: "ℱ", fscr: "𝒻", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", gE: "≧", ge: "≥", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", ges: "⩾", gescc: "⪩", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", Gg: "⋙", gg: "≫", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gl: "≷", gla: "⪥", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gnE: "≩", gne: "⪈", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", GT: ">", Gt: "≫", gt: ">", gtcc: "⪧", gtcir: "⩺", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", hArr: "⇔", harr: "↔", harrcir: "⥈", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", Hfr: "ℌ", hfr: "𝔥", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", Hopf: "ℍ", hopf: "𝕙", horbar: "―", HorizontalLine: "─", Hscr: "ℋ", hscr: "𝒽", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", Ifr: "ℑ", ifr: "𝔦", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Im: "ℑ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", imof: "⊷", imped: "Ƶ", Implies: "⇒", in: "∈", incare: "℅", infin: "∞", infintie: "⧝", inodot: "ı", Int: "∬", int: "∫", intcal: "⊺", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", Iscr: "ℐ", iscr: "𝒾", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", Lang: "⟪", lang: "⟨", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", Larr: "↞", lArr: "⇐", larr: "←", larrb: "⇤", larrbfs: "⤟", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", lat: "⪫", lAtail: "⤛", latail: "⤙", late: "⪭", lates: "⪭︀", lBarr: "⤎", lbarr: "⤌", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", lE: "≦", le: "≤", LeftAngleBracket: "⟨", LeftArrow: "←", Leftarrow: "⇐", leftarrow: "←", LeftArrowBar: "⇤", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVector: "⇃", LeftDownVectorBar: "⥙", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrow: "↔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTee: "⊣", LeftTeeArrow: "↤", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangle: "⊲", LeftTriangleBar: "⧏", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVector: "↿", LeftUpVectorBar: "⥘", LeftVector: "↼", LeftVectorBar: "⥒", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", les: "⩽", lescc: "⪨", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", Ll: "⋘", ll: "≪", llarr: "⇇", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoust: "⎰", lmoustache: "⎰", lnap: "⪉", lnapprox: "⪉", lnE: "≨", lne: "⪇", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftarrow: "⟵", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longleftrightarrow: "⟷", longmapsto: "⟼", LongRightArrow: "⟶", Longrightarrow: "⟹", longrightarrow: "⟶", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", Lscr: "ℒ", lscr: "𝓁", Lsh: "↰", lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", LT: "<", Lt: "≪", lt: "<", ltcc: "⪦", ltcir: "⩹", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", mid: "∣", midast: "*", midcir: "⫰", middot: "·", minus: "−", minusb: "⊟", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", Mscr: "ℳ", mscr: "𝓂", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natur: "♮", natural: "♮", naturals: "ℕ", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", ne: "≠", nearhk: "⤤", neArr: "⇗", nearr: "↗", nearrow: "↗", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nhArr: "⇎", nharr: "↮", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlArr: "⇍", nlarr: "↚", nldr: "‥", nlE: "≦̸", nle: "≰", nLeftarrow: "⇍", nleftarrow: "↚", nLeftrightarrow: "⇎", nleftrightarrow: "↮", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", Nopf: "ℕ", nopf: "𝕟", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangle: "⋪", NotLeftTriangleBar: "⧏̸", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangle: "⋫", NotRightTriangleBar: "⧐̸", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", npar: "∦", nparallel: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", npre: "⪯̸", nprec: "⊀", npreceq: "⪯̸", nrArr: "⇏", nrarr: "↛", nrarrc: "⤳̸", nrarrw: "↝̸", nRightarrow: "⇏", nrightarrow: "↛", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nVDash: "⊯", nVdash: "⊮", nvDash: "⊭", nvdash: "⊬", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwArr: "⇖", nwarr: "↖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", ocir: "⊚", Ocirc: "Ô", ocirc: "ô", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", Or: "⩔", or: "∨", orarr: "↻", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", Otimes: "⨷", otimes: "⊗", otimesas: "⨶", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", par: "∥", para: "¶", parallel: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plus: "+", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", Popf: "ℙ", popf: "𝕡", pound: "£", Pr: "⪻", pr: "≺", prap: "⪷", prcue: "≼", prE: "⪳", pre: "⪯", prec: "≺", precapprox: "⪷", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", precsim: "≾", Prime: "″", prime: "′", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportion: "∷", Proportional: "∝", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", Qopf: "ℚ", qopf: "𝕢", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", QUOT: '"', quot: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", Rang: "⟫", rang: "⟩", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", Rarr: "↠", rArr: "⇒", rarr: "→", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", rAtail: "⤜", ratail: "⤚", ratio: "∶", rationals: "ℚ", RBarr: "⤐", rBarr: "⤏", rbarr: "⤍", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", Re: "ℜ", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", rect: "▭", REG: "®", reg: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", Rfr: "ℜ", rfr: "𝔯", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrow: "→", Rightarrow: "⇒", rightarrow: "→", RightArrowBar: "⇥", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVector: "⇂", RightDownVectorBar: "⥕", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTee: "⊢", RightTeeArrow: "↦", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangle: "⊳", RightTriangleBar: "⧐", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVector: "↾", RightUpVectorBar: "⥔", RightVector: "⇀", RightVectorBar: "⥓", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoust: "⎱", rmoustache: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", Ropf: "ℝ", ropf: "𝕣", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", Rscr: "ℛ", rscr: "𝓇", Rsh: "↱", rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", Sc: "⪼", sc: "≻", scap: "⪸", Scaron: "Š", scaron: "š", sccue: "≽", scE: "⪴", sce: "⪰", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdot: "⋅", sdotb: "⊡", sdote: "⩦", searhk: "⤥", seArr: "⇘", searr: "↘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", sol: "/", solb: "⧄", solbar: "⌿", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", squ: "□", Square: "□", square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", Sub: "⋐", sub: "⊂", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", Subset: "⋐", subset: "⊂", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succ: "≻", succapprox: "⪸", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", Sum: "∑", sum: "∑", sung: "♪", Sup: "⋑", sup: "⊃", sup1: "¹", sup2: "²", sup3: "³", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", Supset: "⋑", supset: "⊃", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swArr: "⇙", swarr: "↙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "\t", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", Therefore: "∴", therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", thinsp: " ", ThinSpace: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", Tilde: "∼", tilde: "˜", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", times: "×", timesb: "⊠", timesbar: "⨱", timesd: "⨰", tint: "∭", toea: "⤨", top: "⊤", topbot: "⌶", topcir: "⫱", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", TRADE: "™", trade: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", Uarr: "↟", uArr: "⇑", uarr: "↑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrow: "↑", Uparrow: "⇑", uparrow: "↑", UpArrowBar: "⤒", UpArrowDownArrow: "⇅", UpDownArrow: "↕", Updownarrow: "⇕", updownarrow: "↕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", Upsi: "ϒ", upsi: "υ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTee: "⊥", UpTeeArrow: "↥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", vArr: "⇕", varr: "↕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", Vbar: "⫫", vBar: "⫨", vBarv: "⫩", Vcy: "В", vcy: "в", VDash: "⊫", Vdash: "⊩", vDash: "⊨", vdash: "⊢", Vdashl: "⫦", Vee: "⋁", vee: "∨", veebar: "⊻", veeeq: "≚", vellip: "⋮", Verbar: "‖", verbar: "|", Vert: "‖", vert: "|", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", Wedge: "⋀", wedge: "∧", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xhArr: "⟺", xharr: "⟷", Xi: "Ξ", xi: "ξ", xlArr: "⟸", xlarr: "⟵", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrArr: "⟹", xrarr: "⟶", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", Yuml: "Ÿ", yuml: "ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", Zfr: "ℨ", zfr: "𝔷", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", Zopf: "ℤ", zopf: "𝕫", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" },
    HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/,
    CHARCODE = /^#([0-9]+)$/,
    NAMED = /^([A-Za-z0-9]+)$/,
    EntityParser = function () {
  function t(t) {
    this.named = t;
  }return t.prototype.parse = function (t) {
    if (t) {
      var e = t.match(HEXCHARCODE);return e ? String.fromCharCode(parseInt(e[1], 16)) : (e = t.match(CHARCODE)) ? String.fromCharCode(parseInt(e[1], 10)) : (e = t.match(NAMED)) ? this.named[e[1]] : void 0;
    }
  }, t;
}(),
    WSP = /[\t\n\f ]/,
    ALPHA = /[A-Za-z]/,
    CRLF = /\r\n?/g;function isSpace(t) {
  return WSP.test(t);
}function isAlpha(t) {
  return ALPHA.test(t);
}function preprocessInput(t) {
  return t.replace(CRLF, "\n");
}function unwrap(t, e) {
  if (!t) throw new Error((e || "value") + " was null");return t;
}var EventedTokenizer = function () {
  function t(t, e) {
    this.delegate = t, this.entityParser = e, this.state = null, this.input = null, this.index = -1, this.tagLine = -1, this.tagColumn = -1, this.line = -1, this.column = -1, this.states = { beforeData: function beforeData() {
        "<" === this.peek() ? (this.state = "tagOpen", this.markTagStart(), this.consume()) : (this.state = "data", this.delegate.beginData());
      }, data: function data() {
        var t = this.peek();"<" === t ? (this.delegate.finishData(), this.state = "tagOpen", this.markTagStart(), this.consume()) : "&" === t ? (this.consume(), this.delegate.appendToData(this.consumeCharRef() || "&")) : (this.consume(), this.delegate.appendToData(t));
      }, tagOpen: function tagOpen() {
        var t = this.consume();"!" === t ? this.state = "markupDeclaration" : "/" === t ? this.state = "endTagOpen" : isAlpha(t) && (this.state = "tagName", this.delegate.beginStartTag(), this.delegate.appendToTagName(t.toLowerCase()));
      }, markupDeclaration: function markupDeclaration() {
        "-" === this.consume() && "-" === this.input.charAt(this.index) && (this.consume(), this.state = "commentStart", this.delegate.beginComment());
      }, commentStart: function commentStart() {
        var t = this.consume();"-" === t ? this.state = "commentStartDash" : ">" === t ? (this.delegate.finishComment(), this.state = "beforeData") : (this.delegate.appendToCommentData(t), this.state = "comment");
      }, commentStartDash: function commentStartDash() {
        var t = this.consume();"-" === t ? this.state = "commentEnd" : ">" === t ? (this.delegate.finishComment(), this.state = "beforeData") : (this.delegate.appendToCommentData("-"), this.state = "comment");
      }, comment: function comment() {
        var t = this.consume();"-" === t ? this.state = "commentEndDash" : this.delegate.appendToCommentData(t);
      }, commentEndDash: function commentEndDash() {
        var t = this.consume();"-" === t ? this.state = "commentEnd" : (this.delegate.appendToCommentData("-" + t), this.state = "comment");
      }, commentEnd: function commentEnd() {
        var t = this.consume();">" === t ? (this.delegate.finishComment(), this.state = "beforeData") : (this.delegate.appendToCommentData("--" + t), this.state = "comment");
      }, tagName: function tagName() {
        var t = this.consume();isSpace(t) ? this.state = "beforeAttributeName" : "/" === t ? this.state = "selfClosingStartTag" : ">" === t ? (this.delegate.finishTag(), this.state = "beforeData") : this.delegate.appendToTagName(t);
      }, beforeAttributeName: function beforeAttributeName() {
        var t = this.peek();isSpace(t) ? this.consume() : "/" === t ? (this.state = "selfClosingStartTag", this.consume()) : ">" === t ? (this.consume(), this.delegate.finishTag(), this.state = "beforeData") : "=" === t ? (this.delegate.reportSyntaxError("attribute name cannot start with equals sign"), this.state = "attributeName", this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(t)) : (this.state = "attributeName", this.delegate.beginAttribute());
      }, attributeName: function attributeName() {
        var t = this.peek();isSpace(t) ? (this.state = "afterAttributeName", this.consume()) : "/" === t ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.state = "selfClosingStartTag") : "=" === t ? (this.state = "beforeAttributeValue", this.consume()) : ">" === t ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.state = "beforeData") : '"' === t || "'" === t || "<" === t ? (this.delegate.reportSyntaxError(t + " is not a valid character within attribute names"), this.consume(), this.delegate.appendToAttributeName(t)) : (this.consume(), this.delegate.appendToAttributeName(t));
      }, afterAttributeName: function afterAttributeName() {
        var t = this.peek();isSpace(t) ? this.consume() : "/" === t ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.state = "selfClosingStartTag") : "=" === t ? (this.consume(), this.state = "beforeAttributeValue") : ">" === t ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.state = "beforeData") : (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.state = "attributeName", this.delegate.beginAttribute(), this.delegate.appendToAttributeName(t));
      }, beforeAttributeValue: function beforeAttributeValue() {
        var t = this.peek();isSpace(t) ? this.consume() : '"' === t ? (this.state = "attributeValueDoubleQuoted", this.delegate.beginAttributeValue(!0), this.consume()) : "'" === t ? (this.state = "attributeValueSingleQuoted", this.delegate.beginAttributeValue(!0), this.consume()) : ">" === t ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.state = "beforeData") : (this.state = "attributeValueUnquoted", this.delegate.beginAttributeValue(!1), this.consume(), this.delegate.appendToAttributeValue(t));
      }, attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
        var t = this.consume();'"' === t ? (this.delegate.finishAttributeValue(), this.state = "afterAttributeValueQuoted") : "&" === t ? this.delegate.appendToAttributeValue(this.consumeCharRef('"') || "&") : this.delegate.appendToAttributeValue(t);
      }, attributeValueSingleQuoted: function attributeValueSingleQuoted() {
        var t = this.consume();"'" === t ? (this.delegate.finishAttributeValue(), this.state = "afterAttributeValueQuoted") : "&" === t ? this.delegate.appendToAttributeValue(this.consumeCharRef("'") || "&") : this.delegate.appendToAttributeValue(t);
      }, attributeValueUnquoted: function attributeValueUnquoted() {
        var t = this.peek();isSpace(t) ? (this.delegate.finishAttributeValue(), this.consume(), this.state = "beforeAttributeName") : "&" === t ? (this.consume(), this.delegate.appendToAttributeValue(this.consumeCharRef(">") || "&")) : ">" === t ? (this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.state = "beforeData") : (this.consume(), this.delegate.appendToAttributeValue(t));
      }, afterAttributeValueQuoted: function afterAttributeValueQuoted() {
        var t = this.peek();isSpace(t) ? (this.consume(), this.state = "beforeAttributeName") : "/" === t ? (this.consume(), this.state = "selfClosingStartTag") : ">" === t ? (this.consume(), this.delegate.finishTag(), this.state = "beforeData") : this.state = "beforeAttributeName";
      }, selfClosingStartTag: function selfClosingStartTag() {
        ">" === this.peek() ? (this.consume(), this.delegate.markTagAsSelfClosing(), this.delegate.finishTag(), this.state = "beforeData") : this.state = "beforeAttributeName";
      }, endTagOpen: function endTagOpen() {
        var t = this.consume();isAlpha(t) && (this.state = "tagName", this.delegate.beginEndTag(), this.delegate.appendToTagName(t.toLowerCase()));
      } }, this.reset();
  }return t.prototype.reset = function () {
    this.state = "beforeData", this.input = "", this.index = 0, this.line = 1, this.column = 0, this.tagLine = -1, this.tagColumn = -1, this.delegate.reset();
  }, t.prototype.tokenize = function (t) {
    this.reset(), this.tokenizePart(t), this.tokenizeEOF();
  }, t.prototype.tokenizePart = function (t) {
    for (this.input += preprocessInput(t); this.index < this.input.length;) {
      this.states[this.state].call(this);
    }
  }, t.prototype.tokenizeEOF = function () {
    this.flushData();
  }, t.prototype.flushData = function () {
    "data" === this.state && (this.delegate.finishData(), this.state = "beforeData");
  }, t.prototype.peek = function () {
    return this.input.charAt(this.index);
  }, t.prototype.consume = function () {
    var t = this.peek();return this.index++, "\n" === t ? (this.line++, this.column = 0) : this.column++, t;
  }, t.prototype.consumeCharRef = function () {
    var t = this.input.indexOf(";", this.index);if (-1 !== t) {
      var e = this.input.slice(this.index, t),
          r = this.entityParser.parse(e);if (r) {
        for (var a = e.length; a;) {
          this.consume(), a--;
        }return this.consume(), r;
      }
    }
  }, t.prototype.markTagStart = function () {
    this.tagLine = this.line, this.tagColumn = this.column, this.delegate.tagOpen && this.delegate.tagOpen();
  }, t;
}(),
    Tokenizer = function () {
  function t(t, e) {
    void 0 === e && (e = {}), this.options = e, this._token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.currentAttribute = null, this.tokenizer = new EventedTokenizer(this, t);
  }return Object.defineProperty(t.prototype, "token", { get: function get() {
      return unwrap(this._token);
    }, set: function set(t) {
      this._token = t;
    }, enumerable: !0, configurable: !0 }), t.prototype.tokenize = function (t) {
    return this.tokens = [], this.tokenizer.tokenize(t), this.tokens;
  }, t.prototype.tokenizePart = function (t) {
    return this.tokens = [], this.tokenizer.tokenizePart(t), this.tokens;
  }, t.prototype.tokenizeEOF = function () {
    return this.tokens = [], this.tokenizer.tokenizeEOF(), this.tokens[0];
  }, t.prototype.reset = function () {
    this._token = null, this.startLine = 1, this.startColumn = 0;
  }, t.prototype.addLocInfo = function () {
    this.options.loc && (this.token.loc = { start: { line: this.startLine, column: this.startColumn }, end: { line: this.tokenizer.line, column: this.tokenizer.column } }), this.startLine = this.tokenizer.line, this.startColumn = this.tokenizer.column;
  }, t.prototype.beginData = function () {
    this.token = { type: "Chars", chars: "" }, this.tokens.push(this.token);
  }, t.prototype.appendToData = function (t) {
    this.token.chars += t;
  }, t.prototype.finishData = function () {
    this.addLocInfo();
  }, t.prototype.beginComment = function () {
    this.token = { type: "Comment", chars: "" }, this.tokens.push(this.token);
  }, t.prototype.appendToCommentData = function (t) {
    this.token.chars += t;
  }, t.prototype.finishComment = function () {
    this.addLocInfo();
  }, t.prototype.beginStartTag = function () {
    this.token = { type: "StartTag", tagName: "", attributes: [], selfClosing: !1 }, this.tokens.push(this.token);
  }, t.prototype.beginEndTag = function () {
    this.token = { type: "EndTag", tagName: "" }, this.tokens.push(this.token);
  }, t.prototype.finishTag = function () {
    this.addLocInfo();
  }, t.prototype.markTagAsSelfClosing = function () {
    this.token.selfClosing = !0;
  }, t.prototype.appendToTagName = function (t) {
    this.token.tagName += t;
  }, t.prototype.beginAttribute = function () {
    var t = unwrap(this.token.attributes, "current token's attributs");this.currentAttribute = ["", "", !1], t.push(this.currentAttribute);
  }, t.prototype.appendToAttributeName = function (t) {
    unwrap(this.currentAttribute)[0] += t;
  }, t.prototype.beginAttributeValue = function (t) {
    unwrap(this.currentAttribute)[2] = t;
  }, t.prototype.appendToAttributeValue = function (t) {
    var e = unwrap(this.currentAttribute);e[1] = e[1] || "", e[1] += t;
  }, t.prototype.finishAttributeValue = function () {}, t.prototype.reportSyntaxError = function (t) {
    this.token.syntaxError = t;
  }, t;
}();var objKeys = Object.keys;
function assign(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e];if (null === r || "object" != (typeof r === "undefined" ? "undefined" : _typeof(r))) continue;var a = objKeys(r);for (var _e3 = 0; _e3 < a.length; _e3++) {
      var i = a[_e3];t[i] = r[i];
    }
  }return t;
}
var ListSlice = function () {
  function ListSlice(t, e) {
    _classCallCheck(this, ListSlice);

    this._head = t, this._tail = e;
  }

  _createClass(ListSlice, [{
    key: "forEachNode",
    value: function forEachNode(t) {
      var e = this._head;for (; null !== e;) {
        t(e), e = this.nextNode(e);
      }
    }
  }, {
    key: "head",
    value: function head() {
      return this._head;
    }
  }, {
    key: "tail",
    value: function tail() {
      return this._tail;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var t = [];return this.forEachNode(function (e) {
        return t.push(e);
      }), t;
    }
  }, {
    key: "nextNode",
    value: function nextNode(t) {
      return t === this._tail ? null : t.next;
    }
  }]);

  return ListSlice;
}();

var EMPTY_SLICE = new ListSlice(null, null),
    EMPTY_ARRAY = Object.freeze([]),
    entityParser = new EntityParser(namedCharRefs);
var Parser = function () {
  function Parser(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Parser);

    this.elementStack = [], this.currentAttribute = null, this.currentNode = null, this.tokenizer = new EventedTokenizer(this, entityParser), this.options = e, this.tokenizer.states.tagOpen = function () {
      var t = this.consume();"!" === t ? this.state = "markupDeclaration" : "/" === t ? this.state = "endTagOpen" : /[A-Za-z]/.test(t) && (this.state = "tagName", this.delegate.beginStartTag(), this.delegate.appendToTagName(t));
    }, this.tokenizer.states.endTagOpen = function () {
      var t = this.consume();/[A-Za-z]/.test(t) && (this.state = "tagName", this.delegate.beginEndTag(), this.delegate.appendToTagName(t));
    }, this.source = t.split(/(?:\r\n?|\n)/g);
  }

  _createClass(Parser, [{
    key: "acceptNode",
    value: function acceptNode(t) {
      return this[t.type](t);
    }
  }, {
    key: "currentElement",
    value: function currentElement() {
      return this.elementStack[this.elementStack.length - 1];
    }
  }, {
    key: "sourceForNode",
    value: function sourceForNode(t, e) {
      var r = void 0,
          a = void 0,
          i = void 0,
          n = t.loc.start.line - 1,
          s = n - 1,
          o = t.loc.start.column,
          l = [];for (e ? (a = e.loc.end.line - 1, i = e.loc.end.column) : (a = t.loc.end.line - 1, i = t.loc.end.column); s < a;) {
        s++, r = this.source[s], s === n ? n === a ? l.push(r.slice(o, i)) : l.push(r.slice(o)) : s === a ? l.push(r.slice(0, i)) : l.push(r);
      }return l.join("\n");
    }
  }, {
    key: "currentAttr",
    get: function get() {
      return this.currentAttribute;
    }
  }, {
    key: "currentTag",
    get: function get() {
      var t = this.currentNode;return t;
    }
  }, {
    key: "currentStartTag",
    get: function get() {
      var t = this.currentNode;return t;
    }
  }, {
    key: "currentEndTag",
    get: function get() {
      var t = this.currentNode;return t;
    }
  }, {
    key: "currentComment",
    get: function get() {
      var t = this.currentNode;return t;
    }
  }, {
    key: "currentData",
    get: function get() {
      var t = this.currentNode;return t;
    }
  }]);

  return Parser;
}();

var HandlebarsNodeVisitors = function (_Parser) {
  _inherits(HandlebarsNodeVisitors, _Parser);

  function HandlebarsNodeVisitors() {
    var _this;

    _classCallCheck(this, HandlebarsNodeVisitors);

    (_this = _possibleConstructorReturn(this, (HandlebarsNodeVisitors.__proto__ || Object.getPrototypeOf(HandlebarsNodeVisitors)).apply(this, arguments)), _this), _this.cursorCount = 0;return _this;
  }

  _createClass(HandlebarsNodeVisitors, [{
    key: "cursor",
    value: function cursor() {
      return "%cursor:" + this.cursorCount++ + "%";
    }
  }, {
    key: "Program",
    value: function Program(t) {
      this.cursorCount = 0;var e = void 0,
          r = b.program([], t.blockParams, t.loc),
          a = t.body.length;if (this.elementStack.push(r), 0 === a) return this.elementStack.pop();for (e = 0; e < a; e++) {
        this.acceptNode(t.body[e]);
      }var i = this.elementStack.pop();if (i !== r) {
        var _t = i;throw new SyntaxError$1("Unclosed element `" + _t.tag + "` (on line " + _t.loc.start.line + ").", _t.loc);
      }return r;
    }
  }, {
    key: "BlockStatement",
    value: function BlockStatement(t) {
      if ("comment" === this.tokenizer.state) return void this.appendToCommentData(this.sourceForNode(t));if ("comment" !== this.tokenizer.state && "data" !== this.tokenizer.state && "beforeData" !== this.tokenizer.state) throw new SyntaxError$1("A block may only be used inside an HTML element or another block.", t.loc);
      var _acceptCallNodes = acceptCallNodes(this, t),
          e = _acceptCallNodes.path,
          r = _acceptCallNodes.params,
          a = _acceptCallNodes.hash,
          i = this.Program(t.program),
          n = t.inverse ? this.Program(t.inverse) : null;

      "in-element" === e.original && (a = addInElementHash(this.cursor(), a, t.loc));var s = b.block(e, r, a, i, n, t.loc);appendChild(this.currentElement(), s);
    }
  }, {
    key: "MustacheStatement",
    value: function MustacheStatement(t) {
      var e = void 0,
          r = this.tokenizer;if ("comment" === r.state) return void this.appendToCommentData(this.sourceForNode(t));var a = t.escaped,
          i = t.loc;
      if (t.path.type.match(/Literal$/)) e = { type: "MustacheStatement", path: this.acceptNode(t.path), params: [], hash: b.hash(), escaped: a, loc: i };else {
        var _acceptCallNodes2 = acceptCallNodes(this, t),
            _r = _acceptCallNodes2.path,
            n = _acceptCallNodes2.params,
            s = _acceptCallNodes2.hash;

        e = b.mustache(_r, n, s, !a, i);
      }switch (r.state) {case "tagName":
          addElementModifier(this.currentStartTag, e), r.state = "beforeAttributeName";break;case "beforeAttributeName":
          addElementModifier(this.currentStartTag, e);break;case "attributeName":case "afterAttributeName":
          this.beginAttributeValue(!1), this.finishAttributeValue(), addElementModifier(this.currentStartTag, e), r.state = "beforeAttributeName";break;case "afterAttributeValueQuoted":
          addElementModifier(this.currentStartTag, e), r.state = "beforeAttributeName";break;case "beforeAttributeValue":
          this.beginAttributeValue(!1), appendDynamicAttributeValuePart(this.currentAttribute, e), r.state = "attributeValueUnquoted";break;case "attributeValueDoubleQuoted":case "attributeValueSingleQuoted":case "attributeValueUnquoted":
          appendDynamicAttributeValuePart(this.currentAttribute, e);break;default:
          appendChild(this.currentElement(), e);}return e;
    }
  }, {
    key: "ContentStatement",
    value: function ContentStatement(t) {
      updateTokenizerLocation(this.tokenizer, t), this.tokenizer.tokenizePart(t.value), this.tokenizer.flushData();
    }
  }, {
    key: "CommentStatement",
    value: function CommentStatement(t) {
      var e = this.tokenizer;
      if ("comment" === e.state) return this.appendToCommentData(this.sourceForNode(t)), null;var r = t.value,
          a = t.loc,
          i = b.mustacheComment(r, a);
      switch (e.state) {case "beforeAttributeName":
          this.currentStartTag.comments.push(i);break;case "beforeData":case "data":
          appendChild(this.currentElement(), i);break;default:
          throw new SyntaxError$1("Using a Handlebars comment when in the `" + e.state + "` state is not supported: \"" + i.value + "\" on line " + a.start.line + ":" + a.start.column, t.loc);}return i;
    }
  }, {
    key: "PartialStatement",
    value: function PartialStatement(t) {
      var e = t.loc;
      throw new SyntaxError$1("Handlebars partials are not supported: \"" + this.sourceForNode(t, t.name) + "\" at L" + e.start.line + ":C" + e.start.column, t.loc);
    }
  }, {
    key: "PartialBlockStatement",
    value: function PartialBlockStatement(t) {
      var e = t.loc;
      throw new SyntaxError$1("Handlebars partial blocks are not supported: \"" + this.sourceForNode(t, t.name) + "\" at L" + e.start.line + ":C" + e.start.column, t.loc);
    }
  }, {
    key: "Decorator",
    value: function Decorator(t) {
      var e = t.loc;
      throw new SyntaxError$1("Handlebars decorators are not supported: \"" + this.sourceForNode(t, t.path) + "\" at L" + e.start.line + ":C" + e.start.column, t.loc);
    }
  }, {
    key: "DecoratorBlock",
    value: function DecoratorBlock(t) {
      var e = t.loc;
      throw new SyntaxError$1("Handlebars decorator blocks are not supported: \"" + this.sourceForNode(t, t.path) + "\" at L" + e.start.line + ":C" + e.start.column, t.loc);
    }
  }, {
    key: "SubExpression",
    value: function SubExpression(t) {
      var _acceptCallNodes3 = acceptCallNodes(this, t),
          e = _acceptCallNodes3.path,
          r = _acceptCallNodes3.params,
          a = _acceptCallNodes3.hash;

      return b.sexpr(e, r, a, t.loc);
    }
  }, {
    key: "PathExpression",
    value: function PathExpression(t) {
      var e = void 0,
          r = t.original,
          a = t.loc;if (-1 !== r.indexOf("/")) {
        if ("./" === r.slice(0, 2)) throw new SyntaxError$1("Using \"./\" is not supported in Glimmer and unnecessary: \"" + t.original + "\" on line " + a.start.line + ".", t.loc);if ("../" === r.slice(0, 3)) throw new SyntaxError$1("Changing context using \"../\" is not supported in Glimmer: \"" + t.original + "\" on line " + a.start.line + ".", t.loc);if (-1 !== r.indexOf(".")) throw new SyntaxError$1("Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths: \"" + t.original + "\" on line " + a.start.line + ".", t.loc);e = [t.parts.join("/")];
      } else e = t.parts;var i = !1;return r.match(/^this(\..+)?$/) && (i = !0), { type: "PathExpression", original: t.original, this: i, parts: e, data: t.data, loc: t.loc };
    }
  }, {
    key: "Hash",
    value: function Hash(t) {
      var e = [];for (var r = 0; r < t.pairs.length; r++) {
        var a = t.pairs[r];e.push(b.pair(a.key, this.acceptNode(a.value), a.loc));
      }return b.hash(e, t.loc);
    }
  }, {
    key: "StringLiteral",
    value: function StringLiteral(t) {
      return b.literal("StringLiteral", t.value, t.loc);
    }
  }, {
    key: "BooleanLiteral",
    value: function BooleanLiteral(t) {
      return b.literal("BooleanLiteral", t.value, t.loc);
    }
  }, {
    key: "NumberLiteral",
    value: function NumberLiteral(t) {
      return b.literal("NumberLiteral", t.value, t.loc);
    }
  }, {
    key: "UndefinedLiteral",
    value: function UndefinedLiteral(t) {
      return b.literal("UndefinedLiteral", void 0, t.loc);
    }
  }, {
    key: "NullLiteral",
    value: function NullLiteral(t) {
      return b.literal("NullLiteral", null, t.loc);
    }
  }]);

  return HandlebarsNodeVisitors;
}(Parser);

function calculateRightStrippedOffsets(t, e) {
  if ("" === e) return { lines: t.split("\n").length - 1, columns: 0 };var r = t.split(e)[0].split(/\n/),
      a = r.length - 1;return { lines: a, columns: r[a].length };
}function updateTokenizerLocation(t, e) {
  var r = e.loc.start.line,
      a = e.loc.start.column,
      i = calculateRightStrippedOffsets(e.original, e.value);r += i.lines, i.lines ? a = i.columns : a += i.columns, t.line = r, t.column = a;
}function acceptCallNodes(t, e) {
  return { path: t.PathExpression(e.path), params: e.params ? e.params.map(function (e) {
      return t.acceptNode(e);
    }) : [], hash: e.hash ? t.Hash(e.hash) : b.hash() };
}function addElementModifier(t, e) {
  var r = e.path,
      a = e.params,
      i = e.hash,
      n = e.loc;
  if (isLiteral$1(r)) {
    var _a2 = "{{" + printLiteral(r) + "}}",
        _i = "<" + t.name + " ... " + _a2 + " ...";throw new SyntaxError$1("In " + _i + ", " + _a2 + " is not a valid modifier: \"" + r.original + "\" on line " + (n && n.start.line) + ".", e.loc);
  }var s = b.elementModifier(r, a, i, n);t.modifiers.push(s);
}function addInElementHash(t, e, r) {
  var a = !1;e.pairs.forEach(function (t) {
    if ("guid" === t.key) throw new SyntaxError$1("Cannot pass `guid` from user space", r);"nextSibling" === t.key && (a = !0);
  });var i = b.literal("StringLiteral", t),
      n = b.pair("guid", i);if (e.pairs.unshift(n), !a) {
    var _t2 = b.literal("NullLiteral", null),
        _r2 = b.pair("nextSibling", _t2);e.pairs.push(_r2);
  }return e;
}function appendDynamicAttributeValuePart(t, e) {
  t.isDynamic = !0, t.parts.push(e);
}var visitorKeys = { Program: ["body"], MustacheStatement: ["path", "params", "hash"], BlockStatement: ["path", "params", "hash", "program", "inverse"], ElementModifierStatement: ["path", "params", "hash"], PartialStatement: ["name", "params", "hash"], CommentStatement: [], MustacheCommentStatement: [], ElementNode: ["attributes", "modifiers", "children", "comments"], AttrNode: ["value"], TextNode: [], ConcatStatement: ["parts"], SubExpression: ["path", "params", "hash"], PathExpression: [], StringLiteral: [], BooleanLiteral: [], NumberLiteral: [], NullLiteral: [], UndefinedLiteral: [], Hash: ["pairs"], HashPair: ["value"] };var TraversalError = function () {
  function t(t, e, r, a) {
    var i = Error.call(this, t);this.key = a, this.message = t, this.node = e, this.parent = r, this.stack = i.stack;
  }return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}();function cannotRemoveNode(t, e, r) {
  return new TraversalError("Cannot remove a node unless it is part of an array", t, e, r);
}function cannotReplaceNode(t, e, r) {
  return new TraversalError("Cannot replace a node with multiple nodes unless it is part of an array", t, e, r);
}function cannotReplaceOrRemoveInKeyHandlerYet(t, e) {
  return new TraversalError("Replacing and removing in key handlers is not yet supported.", t, null, e);
}function visitNode(t, e) {
  var r = void 0,
      a = t[e.type] || t.All || null;if (a && a.enter && (r = a.enter.call(null, e)), void 0 !== r && null !== r) {
    if (JSON.stringify(e) !== JSON.stringify(r)) return Array.isArray(r) ? visitArray(t, r) || r : visitNode(t, r) || r;r = void 0;
  }if (void 0 === r) {
    var i = visitorKeys[e.type];for (var _r3 = 0; _r3 < i.length; _r3++) {
      visitKey(t, a, e, i[_r3]);
    }a && a.exit && (r = a.exit.call(null, e));
  }return r;
}function visitKey(t, e, r, a) {
  var i = r[a];if (!i) return;var n = void 0,
      s = e && (e.keys[a] || e.keys.All);if (s && s.enter && void 0 !== (n = s.enter.call(null, r, a))) throw cannotReplaceOrRemoveInKeyHandlerYet(r, a);if (Array.isArray(i)) visitArray(t, i);else {
    var _e4 = visitNode(t, i);void 0 !== _e4 && assignKey(r, a, _e4);
  }if (s && s.exit && void 0 !== (n = s.exit.call(null, r, a))) throw cannotReplaceOrRemoveInKeyHandlerYet(r, a);
}function visitArray(t, e) {
  for (var r = 0; r < e.length; r++) {
    var a = visitNode(t, e[r]);void 0 !== a && (r += spliceArray(e, r, a) - 1);
  }
}function assignKey(t, e, r) {
  if (null === r) throw cannotRemoveNode(t[e], t, e);if (Array.isArray(r)) {
    if (1 !== r.length) throw 0 === r.length ? cannotRemoveNode(t[e], t, e) : cannotReplaceNode(t[e], t, e);t[e] = r[0];
  } else t[e] = r;
}function spliceArray(t, e, r) {
  return null === r ? (t.splice(e, 1), 0) : Array.isArray(r) ? (t.splice.apply(t, [e, 1].concat(_toConsumableArray(r))), r.length) : (t.splice(e, 1, r), 1);
}function traverse(t, e) {
  visitNode(normalizeVisitor(e), t);
}function normalizeVisitor(t) {
  var e = {};for (var r in t) {
    var a = t[r] || t.All,
        i = {};if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
      var _t3 = a.keys;if (_t3) for (var _e5 in _t3) {
        var _r4 = _t3[_e5];"object" == (typeof _r4 === "undefined" ? "undefined" : _typeof(_r4)) ? i[_e5] = { enter: "function" == typeof _r4.enter ? _r4.enter : null, exit: "function" == typeof _r4.exit ? _r4.exit : null } : "function" == typeof _r4 && (i[_e5] = { enter: _r4, exit: null });
      }e[r] = { enter: "function" == typeof a.enter ? a.enter : null, exit: "function" == typeof a.exit ? a.exit : null, keys: i };
    } else "function" == typeof a && (e[r] = { enter: a, exit: null, keys: i });
  }return e;
}function unreachable$1() {
  throw new Error("unreachable");
}function build(t) {
  if (!t) return "";var e = [];switch (t.type) {case "Program":
      {
        var _r5 = t.chained && t.body[0];_r5 && (_r5.chained = !0);var a = buildEach(t.body).join("");e.push(a);
      }break;case "ElementNode":
      e.push("<", t.tag), t.attributes.length && e.push(" ", buildEach(t.attributes).join(" ")), t.modifiers.length && e.push(" ", buildEach(t.modifiers).join(" ")), t.comments.length && e.push(" ", buildEach(t.comments).join(" ")), e.push(">"), e.push.apply(e, buildEach(t.children)), e.push("</", t.tag, ">");break;case "AttrNode":
      e.push(t.name, "=");var r = build(t.value);"TextNode" === t.value.type ? e.push('"', r, '"') : e.push(r);break;case "ConcatStatement":
      e.push('"'), t.parts.forEach(function (t) {
        "StringLiteral" === t.type ? e.push(t.original) : e.push(build(t));
      }), e.push('"');break;case "TextNode":
      e.push(t.chars);break;case "MustacheStatement":
      e.push(compactJoin(["{{", pathParams(t), "}}"]));break;case "MustacheCommentStatement":
      e.push(compactJoin(["{{!--", t.value, "--}}"]));break;case "ElementModifierStatement":
      e.push(compactJoin(["{{", pathParams(t), "}}"]));break;case "PathExpression":
      e.push(t.original);break;case "SubExpression":
      e.push("(", pathParams(t), ")");break;case "BooleanLiteral":
      e.push(t.value ? "true" : "false");break;case "BlockStatement":
      {
        var _r6 = [];t.chained ? _r6.push(["{{else ", pathParams(t), "}}"].join("")) : _r6.push(openBlock(t)), _r6.push(build(t.program)), t.inverse && (t.inverse.chained || _r6.push("{{else}}"), _r6.push(build(t.inverse))), t.chained || _r6.push(closeBlock(t)), e.push(_r6.join(""));
      }break;case "PartialStatement":
      e.push(compactJoin(["{{>", pathParams(t), "}}"]));break;case "CommentStatement":
      e.push(compactJoin(["\x3c!--", t.value, "--\x3e"]));break;case "StringLiteral":
      e.push("\"" + t.value + "\"");break;case "NumberLiteral":
      e.push(String(t.value));break;case "UndefinedLiteral":
      e.push("undefined");break;case "NullLiteral":
      e.push("null");break;case "Hash":
      e.push(t.pairs.map(function (t) {
        return build(t);
      }).join(" "));break;case "HashPair":
      e.push(t.key + "=" + build(t.value));}return e.join("");
}function compact(t) {
  var e = [];return t.forEach(function (t) {
    void 0 !== t && null !== t && "" !== t && e.push(t);
  }), e;
}function buildEach(t) {
  return t.map(build);
}function pathParams(t) {
  var e = void 0;switch (t.type) {case "MustacheStatement":case "SubExpression":case "ElementModifierStatement":case "BlockStatement":
      if (isLiteral(t.path)) return String(t.path.value);e = build(t.path);break;case "PartialStatement":
      e = build(t.name);break;default:
      return unreachable$1();}return compactJoin([e, buildEach(t.params).join(" "), build(t.hash)], " ");
}function compactJoin(t, e) {
  return compact(t).join(e || "");
}function blockParams(t) {
  var e = t.program.blockParams;return e.length ? " as |" + e.join(" ") + "|" : null;
}function openBlock(t) {
  return ["{{#", pathParams(t), blockParams(t), "}}"].join("");
}function closeBlock(t) {
  return ["{{/", build(t.path), "}}"].join("");
}
var Walker = function () {
  function Walker(t) {
    _classCallCheck(this, Walker);

    this.order = t, this.stack = [];
  }

  _createClass(Walker, [{
    key: "visit",
    value: function visit(t, e) {
      t && (this.stack.push(t), "post" === this.order ? (this.children(t, e), e(t, this)) : (e(t, this), this.children(t, e)), this.stack.pop());
    }
  }, {
    key: "children",
    value: function children(t, e) {
      var r = visitors[t.type];r && r(this, t, e);
    }
  }]);

  return Walker;
}();

var visitors = {
  Program: function Program(t, e, r) {
    for (var a = 0; a < e.body.length; a++) {
      t.visit(e.body[a], r);
    }
  },
  ElementNode: function ElementNode(t, e, r) {
    for (var a = 0; a < e.children.length; a++) {
      t.visit(e.children[a], r);
    }
  },
  BlockStatement: function BlockStatement(t, e, r) {
    t.visit(e.program, r), t.visit(e.inverse || null, r);
  }
};var commonjsGlobal$$1 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : {};function unwrapExports$$1(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}function createCommonjsModule$$1(t, e) {
  return t(e = { exports: {} }, e.exports), e.exports;
}var utils = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.extend = s, e.indexOf = function (t, e) {
    for (var r = 0, a = t.length; r < a; r++) {
      if (t[r] === e) return r;
    }return -1;
  }, e.escapeExpression = function (t) {
    if ("string" != typeof t) {
      if (t && t.toHTML) return t.toHTML();if (null == t) return "";if (!t) return t + "";t = "" + t;
    }if (!i.test(t)) return t;return t.replace(a, n);
  }, e.isEmpty = function (t) {
    return !t && 0 !== t || !(!c(t) || 0 !== t.length);
  }, e.createFrame = function (t) {
    var e = s({}, t);return e._parent = t, e;
  }, e.blockParams = function (t, e) {
    return t.path = e, t;
  }, e.appendContextPath = function (t, e) {
    return (t ? t + "." : "") + e;
  };var r = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;", "=": "&#x3D;" },
      a = /[&<>"'`=]/g,
      i = /[&<>"'`=]/;function n(t) {
    return r[t];
  }function s(t) {
    for (var e = 1; e < arguments.length; e++) {
      for (var r in arguments[e]) {
        Object.prototype.hasOwnProperty.call(arguments[e], r) && (t[r] = arguments[e][r]);
      }
    }return t;
  }var o = Object.prototype.toString;e.toString = o;var l = function l(t) {
    return "function" == typeof t;
  };l(/x/) && (e.isFunction = l = function l(t) {
    return "function" == typeof t && "[object Function]" === o.call(t);
  }), e.isFunction = l;var c = Array.isArray || function (t) {
    return !(!t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) && "[object Array]" === o.call(t);
  };e.isArray = c;
});unwrapExports$$1(utils);var exception = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];function a(t, e) {
    var i = e && e.loc,
        n = void 0,
        s = void 0;i && (t += " - " + (n = i.start.line) + ":" + (s = i.start.column));for (var o = Error.prototype.constructor.call(this, t), l = 0; l < r.length; l++) {
      this[r[l]] = o[r[l]];
    }Error.captureStackTrace && Error.captureStackTrace(this, a);try {
      i && (this.lineNumber = n, Object.defineProperty ? Object.defineProperty(this, "column", { value: s, enumerable: !0 }) : this.column = s);
    } catch (t) {}
  }a.prototype = new Error(), e.default = a, t.exports = e.default;
});unwrapExports$$1(exception);var blockHelperMissing = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerHelper("blockHelperMissing", function (e, r) {
      var a = r.inverse,
          i = r.fn;if (!0 === e) return i(this);if (!1 === e || null == e) return a(this);if (utils.isArray(e)) return e.length > 0 ? (r.ids && (r.ids = [r.name]), t.helpers.each(e, r)) : a(this);if (r.data && r.ids) {
        var n = utils.createFrame(r.data);n.contextPath = utils.appendContextPath(r.data.contextPath, r.name), r = { data: n };
      }return i(e, r);
    });
  }, t.exports = e.default;
});unwrapExports$$1(blockHelperMissing);var each = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r,
      a = (r = exception) && r.__esModule ? r : { default: r };e.default = function (t) {
    t.registerHelper("each", function (t, e) {
      if (!e) throw new a.default("Must pass iterator to #each");var r = e.fn,
          i = e.inverse,
          n = 0,
          s = "",
          o = void 0,
          l = void 0;function c(e, a, i) {
        o && (o.key = e, o.index = a, o.first = 0 === a, o.last = !!i, l && (o.contextPath = l + e)), s += r(t[e], { data: o, blockParams: utils.blockParams([t[e], e], [l + e, null]) });
      }if (e.data && e.ids && (l = utils.appendContextPath(e.data.contextPath, e.ids[0]) + "."), utils.isFunction(t) && (t = t.call(this)), e.data && (o = utils.createFrame(e.data)), t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) if (utils.isArray(t)) for (var u = t.length; n < u; n++) {
        n in t && c(n, n, n === t.length - 1);
      } else {
        var p = void 0;for (var h in t) {
          t.hasOwnProperty(h) && (void 0 !== p && c(p, n - 1), p = h, n++);
        }void 0 !== p && c(p, n - 1, !0);
      }return 0 === n && (s = i(this)), s;
    });
  }, t.exports = e.default;
});unwrapExports$$1(each);var helperMissing = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r,
      a = (r = exception) && r.__esModule ? r : { default: r };e.default = function (t) {
    t.registerHelper("helperMissing", function () {
      if (1 !== arguments.length) throw new a.default('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    });
  }, t.exports = e.default;
});unwrapExports$$1(helperMissing);var _if = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerHelper("if", function (t, e) {
      return utils.isFunction(t) && (t = t.call(this)), !e.hash.includeZero && !t || utils.isEmpty(t) ? e.inverse(this) : e.fn(this);
    }), t.registerHelper("unless", function (e, r) {
      return t.helpers.if.call(this, e, { fn: r.inverse, inverse: r.fn, hash: r.hash });
    });
  }, t.exports = e.default;
});unwrapExports$$1(_if);var log = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerHelper("log", function () {
      for (var e = [void 0], r = arguments[arguments.length - 1], a = 0; a < arguments.length - 1; a++) {
        e.push(arguments[a]);
      }var i = 1;null != r.hash.level ? i = r.hash.level : r.data && null != r.data.level && (i = r.data.level), e[0] = i, t.log.apply(t, e);
    });
  }, t.exports = e.default;
});unwrapExports$$1(log);var lookup = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerHelper("lookup", function (t, e) {
      return t && t[e];
    });
  }, t.exports = e.default;
});unwrapExports$$1(lookup);var _with = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerHelper("with", function (t, e) {
      utils.isFunction(t) && (t = t.call(this));var r = e.fn;if (utils.isEmpty(t)) return e.inverse(this);var a = e.data;return e.data && e.ids && ((a = utils.createFrame(e.data)).contextPath = utils.appendContextPath(e.data.contextPath, e.ids[0])), r(t, { data: a, blockParams: utils.blockParams([t], [a && a.contextPath]) });
    });
  }, t.exports = e.default;
});unwrapExports$$1(_with);var helpers = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0, e.registerDefaultHelpers = function (t) {
    a.default(t), i.default(t), n.default(t), s.default(t), o.default(t), l.default(t), c.default(t);
  };var a = r(blockHelperMissing),
      i = r(each),
      n = r(helperMissing),
      s = r(_if),
      o = r(log),
      l = r(lookup),
      c = r(_with);
});unwrapExports$$1(helpers);var inline = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    t.registerDecorator("inline", function (t, e, r, a) {
      var i = t;return e.partials || (e.partials = {}, i = function i(a, _i2) {
        var n = r.partials;r.partials = utils.extend({}, n, e.partials);var s = t(a, _i2);return r.partials = n, s;
      }), e.partials[a.args[0]] = a.fn, i;
    });
  }, t.exports = e.default;
});unwrapExports$$1(inline);var decorators = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.registerDefaultDecorators = function (t) {
    a.default(t);
  };var r,
      a = (r = inline) && r.__esModule ? r : { default: r };
});unwrapExports$$1(decorators);var logger_1 = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r = { methodMap: ["debug", "info", "warn", "error"], level: "info", lookupLevel: function lookupLevel(t) {
      if ("string" == typeof t) {
        var e = utils.indexOf(r.methodMap, t.toLowerCase());t = e >= 0 ? e : parseInt(t, 10);
      }return t;
    }, log: function log(t) {
      if (t = r.lookupLevel(t), "undefined" != typeof console && r.lookupLevel(r.level) <= t) {
        var e = r.methodMap[t];console[e] || (e = "log");for (var a = arguments.length, i = Array(a > 1 ? a - 1 : 0), n = 1; n < a; n++) {
          i[n - 1] = arguments[n];
        }console[e].apply(console, i);
      }
    } };e.default = r, t.exports = e.default;
});unwrapExports$$1(logger_1);var base = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0, e.HandlebarsEnvironment = n;var a = r(exception),
      i = r(logger_1);e.VERSION = "4.0.10";e.COMPILER_REVISION = 7;e.REVISION_CHANGES = { 1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: "== 1.x.x", 5: "== 2.0.0-alpha.x", 6: ">= 2.0.0-beta.1", 7: ">= 4.0.0" };function n(t, e, r) {
    this.helpers = t || {}, this.partials = e || {}, this.decorators = r || {}, helpers.registerDefaultHelpers(this), decorators.registerDefaultDecorators(this);
  }n.prototype = { constructor: n, logger: i.default, log: i.default.log, registerHelper: function registerHelper(t, e) {
      if ("[object Object]" === utils.toString.call(t)) {
        if (e) throw new a.default("Arg not supported with multiple helpers");utils.extend(this.helpers, t);
      } else this.helpers[t] = e;
    }, unregisterHelper: function unregisterHelper(t) {
      delete this.helpers[t];
    }, registerPartial: function registerPartial(t, e) {
      if ("[object Object]" === utils.toString.call(t)) utils.extend(this.partials, t);else {
        if (void 0 === e) throw new a.default('Attempting to register a partial called "' + t + '" as undefined');this.partials[t] = e;
      }
    }, unregisterPartial: function unregisterPartial(t) {
      delete this.partials[t];
    }, registerDecorator: function registerDecorator(t, e) {
      if ("[object Object]" === utils.toString.call(t)) {
        if (e) throw new a.default("Arg not supported with multiple decorators");utils.extend(this.decorators, t);
      } else this.decorators[t] = e;
    }, unregisterDecorator: function unregisterDecorator(t) {
      delete this.decorators[t];
    } };var s = i.default.log;e.log = s, e.createFrame = utils.createFrame, e.logger = i.default;
});unwrapExports$$1(base);var safeString = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    this.string = t;
  }e.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function () {
    return "" + this.string;
  }, e.default = r, t.exports = e.default;
});unwrapExports$$1(safeString);var runtime = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.checkRevision = function (t) {
    var e = t && t[0] || 1,
        r = base.COMPILER_REVISION;if (e !== r) {
      if (e < r) {
        var a = base.REVISION_CHANGES[r],
            n = base.REVISION_CHANGES[e];throw new i.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + a + ") or downgrade your runtime to an older version (" + n + ").");
      }throw new i.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").");
    }
  }, e.template = function (t, e) {
    if (!e) throw new i.default("No environment passed to template");if (!t || !t.main) throw new i.default("Unknown template object: " + (typeof t === "undefined" ? "undefined" : _typeof(t)));t.main.decorator = t.main_d, e.VM.checkRevision(t.compiler);var r = { strict: function strict(t, e) {
        if (!(e in t)) throw new i.default('"' + e + '" not defined in ' + t);return t[e];
      }, lookup: function lookup(t, e) {
        for (var r = t.length, a = 0; a < r; a++) {
          if (t[a] && null != t[a][e]) return t[a][e];
        }
      }, lambda: function lambda(t, e) {
        return "function" == typeof t ? t.call(e) : t;
      }, escapeExpression: a.escapeExpression, invokePartial: function invokePartial(r, n, s) {
        s.hash && (n = a.extend({}, n, s.hash), s.ids && (s.ids[0] = !0));r = e.VM.resolvePartial.call(this, r, n, s);var o = e.VM.invokePartial.call(this, r, n, s);null == o && e.compile && (s.partials[s.name] = e.compile(r, t.compilerOptions, e), o = s.partials[s.name](n, s));if (null != o) {
          if (s.indent) {
            for (var l = o.split("\n"), c = 0, u = l.length; c < u && (l[c] || c + 1 !== u); c++) {
              l[c] = s.indent + l[c];
            }o = l.join("\n");
          }return o;
        }throw new i.default("The partial " + s.name + " could not be compiled when running in runtime-only mode");
      }, fn: function fn(e) {
        var r = t[e];return r.decorator = t[e + "_d"], r;
      }, programs: [], program: function program(t, e, r, a, i) {
        var s = this.programs[t],
            o = this.fn(t);return e || i || a || r ? s = n(this, t, o, e, r, a, i) : s || (s = this.programs[t] = n(this, t, o)), s;
      }, data: function data(t, e) {
        for (; t && e--;) {
          t = t._parent;
        }return t;
      }, merge: function merge(t, e) {
        var r = t || e;return t && e && t !== e && (r = a.extend({}, e, t)), r;
      }, nullContext: Object.seal({}), noop: e.VM.noop, compilerInfo: t.compiler };function s(e) {
      var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          i = a.data;s._setup(a), !a.partial && t.useData && (i = function (t, e) {
        e && "root" in e || ((e = e ? base.createFrame(e) : {}).root = t);return e;
      }(e, i));var n = void 0,
          l = t.useBlockParams ? [] : void 0;function c(e) {
        return "" + t.main(r, e, r.helpers, r.partials, i, l, n);
      }return t.useDepths && (n = a.depths ? e != a.depths[0] ? [e].concat(a.depths) : a.depths : [e]), (c = o(t.main, c, r, a.depths || [], i, l))(e, a);
    }return s.isTop = !0, s._setup = function (a) {
      a.partial ? (r.helpers = a.helpers, r.partials = a.partials, r.decorators = a.decorators) : (r.helpers = r.merge(a.helpers, e.helpers), t.usePartial && (r.partials = r.merge(a.partials, e.partials)), (t.usePartial || t.useDecorators) && (r.decorators = r.merge(a.decorators, e.decorators)));
    }, s._child = function (e, a, s, o) {
      if (t.useBlockParams && !s) throw new i.default("must pass block params");if (t.useDepths && !o) throw new i.default("must pass parent depths");return n(r, e, t[e], a, 0, s, o);
    }, s;
  }, e.wrapProgram = n, e.resolvePartial = function (t, e, r) {
    t ? t.call || r.name || (r.name = t, t = r.partials[t]) : t = "@partial-block" === r.name ? r.data["partial-block"] : r.partials[r.name];return t;
  }, e.invokePartial = function (t, e, r) {
    var n = r.data && r.data["partial-block"];r.partial = !0, r.ids && (r.data.contextPath = r.ids[0] || r.data.contextPath);var o = void 0;r.fn && r.fn !== s && function () {
      r.data = base.createFrame(r.data);var t = r.fn;o = r.data["partial-block"] = function (e) {
        var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];return r.data = base.createFrame(r.data), r.data["partial-block"] = n, t(e, r);
      }, t.partials && (r.partials = a.extend({}, r.partials, t.partials));
    }();void 0 === t && o && (t = o);if (void 0 === t) throw new i.default("The partial " + r.name + " could not be found");if (t instanceof Function) return t(e, r);
  }, e.noop = s;var r,
      a = function (t) {
    if (t && t.__esModule) return t;var e = {};if (null != t) for (var r in t) {
      Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }return e.default = t, e;
  }(utils),
      i = (r = exception) && r.__esModule ? r : { default: r };function n(t, e, r, a, i, n, s) {
    function l(e) {
      var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          o = s;return !s || e == s[0] || e === t.nullContext && null === s[0] || (o = [e].concat(s)), r(t, e, t.helpers, t.partials, i.data || a, n && [i.blockParams].concat(n), o);
    }return (l = o(r, l, t, s, a, n)).program = e, l.depth = s ? s.length : 0, l.blockParams = i || 0, l;
  }function s() {
    return "";
  }function o(t, e, r, i, n, s) {
    if (t.decorator) {
      var o = {};e = t.decorator(e, o, r, i && i[0], n, s, i), a.extend(e, o);
    }return e;
  }
});unwrapExports$$1(runtime);var noConflict = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.default = function (t) {
    var e = void 0 !== commonjsGlobal$$1 ? commonjsGlobal$$1 : window,
        r = e.Handlebars;t.noConflict = function () {
      return e.Handlebars === t && (e.Handlebars = r), t;
    };
  }, t.exports = e.default;
});unwrapExports$$1(noConflict);var handlebars_runtime = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }function a(t) {
    if (t && t.__esModule) return t;var e = {};if (null != t) for (var r in t) {
      Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }return e.default = t, e;
  }e.__esModule = !0;var i = a(base),
      n = r(safeString),
      s = r(exception),
      o = a(utils),
      l = a(runtime),
      c = r(noConflict);function u() {
    var t = new i.HandlebarsEnvironment();return o.extend(t, i), t.SafeString = n.default, t.Exception = s.default, t.Utils = o, t.escapeExpression = o.escapeExpression, t.VM = l, t.template = function (e) {
      return l.template(e, t);
    }, t;
  }var p = u();p.create = u, c.default(p), p.default = p, e.default = p, t.exports = e.default;
});unwrapExports$$1(handlebars_runtime);var ast = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r = { helpers: { helperExpression: function helperExpression(t) {
        return "SubExpression" === t.type || ("MustacheStatement" === t.type || "BlockStatement" === t.type) && !!(t.params && t.params.length || t.hash);
      }, scopedId: function scopedId(t) {
        return (/^\.|this\b/.test(t.original)
        );
      }, simpleId: function simpleId(t) {
        return 1 === t.parts.length && !r.helpers.scopedId(t) && !t.depth;
      } } };e.default = r, t.exports = e.default;
});unwrapExports$$1(ast);var parser = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r = function () {
    var t = { trace: function trace() {}, yy: {}, symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, partialBlock: 12, content: 13, COMMENT: 14, CONTENT: 15, openRawBlock: 16, rawBlock_repetition_plus0: 17, END_RAW_BLOCK: 18, OPEN_RAW_BLOCK: 19, helperName: 20, openRawBlock_repetition0: 21, openRawBlock_option0: 22, CLOSE_RAW_BLOCK: 23, openBlock: 24, block_option0: 25, closeBlock: 26, openInverse: 27, block_option1: 28, OPEN_BLOCK: 29, openBlock_repetition0: 30, openBlock_option0: 31, openBlock_option1: 32, CLOSE: 33, OPEN_INVERSE: 34, openInverse_repetition0: 35, openInverse_option0: 36, openInverse_option1: 37, openInverseChain: 38, OPEN_INVERSE_CHAIN: 39, openInverseChain_repetition0: 40, openInverseChain_option0: 41, openInverseChain_option1: 42, inverseAndProgram: 43, INVERSE: 44, inverseChain: 45, inverseChain_option0: 46, OPEN_ENDBLOCK: 47, OPEN: 48, mustache_repetition0: 49, mustache_option0: 50, OPEN_UNESCAPED: 51, mustache_repetition1: 52, mustache_option1: 53, CLOSE_UNESCAPED: 54, OPEN_PARTIAL: 55, partialName: 56, partial_repetition0: 57, partial_option0: 58, openPartialBlock: 59, OPEN_PARTIAL_BLOCK: 60, openPartialBlock_repetition0: 61, openPartialBlock_option0: 62, param: 63, sexpr: 64, OPEN_SEXPR: 65, sexpr_repetition0: 66, sexpr_option0: 67, CLOSE_SEXPR: 68, hash: 69, hash_repetition_plus0: 70, hashSegment: 71, ID: 72, EQUALS: 73, blockParams: 74, OPEN_BLOCK_PARAMS: 75, blockParams_repetition_plus0: 76, CLOSE_BLOCK_PARAMS: 77, path: 78, dataName: 79, STRING: 80, NUMBER: 81, BOOLEAN: 82, UNDEFINED: 83, NULL: 84, DATA: 85, pathSegments: 86, SEP: 87, $accept: 0, $end: 1 }, terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" }, productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]], performAction: function performAction(t, e, r, a, i, n, s) {
        var o = n.length - 1;switch (i) {case 1:
            return n[o - 1];case 2:
            this.$ = a.prepareProgram(n[o]);break;case 3:case 4:case 5:case 6:case 7:case 8:
            this.$ = n[o];break;case 9:
            this.$ = { type: "CommentStatement", value: a.stripComment(n[o]), strip: a.stripFlags(n[o], n[o]), loc: a.locInfo(this._$) };break;case 10:
            this.$ = { type: "ContentStatement", original: n[o], value: n[o], loc: a.locInfo(this._$) };break;case 11:
            this.$ = a.prepareRawBlock(n[o - 2], n[o - 1], n[o], this._$);break;case 12:
            this.$ = { path: n[o - 3], params: n[o - 2], hash: n[o - 1] };break;case 13:
            this.$ = a.prepareBlock(n[o - 3], n[o - 2], n[o - 1], n[o], !1, this._$);break;case 14:
            this.$ = a.prepareBlock(n[o - 3], n[o - 2], n[o - 1], n[o], !0, this._$);break;case 15:
            this.$ = { open: n[o - 5], path: n[o - 4], params: n[o - 3], hash: n[o - 2], blockParams: n[o - 1], strip: a.stripFlags(n[o - 5], n[o]) };break;case 16:case 17:
            this.$ = { path: n[o - 4], params: n[o - 3], hash: n[o - 2], blockParams: n[o - 1], strip: a.stripFlags(n[o - 5], n[o]) };break;case 18:
            this.$ = { strip: a.stripFlags(n[o - 1], n[o - 1]), program: n[o] };break;case 19:
            var l = a.prepareBlock(n[o - 2], n[o - 1], n[o], n[o], !1, this._$),
                c = a.prepareProgram([l], n[o - 1].loc);c.chained = !0, this.$ = { strip: n[o - 2].strip, program: c, chain: !0 };break;case 20:
            this.$ = n[o];break;case 21:
            this.$ = { path: n[o - 1], strip: a.stripFlags(n[o - 2], n[o]) };break;case 22:case 23:
            this.$ = a.prepareMustache(n[o - 3], n[o - 2], n[o - 1], n[o - 4], a.stripFlags(n[o - 4], n[o]), this._$);break;case 24:
            this.$ = { type: "PartialStatement", name: n[o - 3], params: n[o - 2], hash: n[o - 1], indent: "", strip: a.stripFlags(n[o - 4], n[o]), loc: a.locInfo(this._$) };break;case 25:
            this.$ = a.preparePartialBlock(n[o - 2], n[o - 1], n[o], this._$);break;case 26:
            this.$ = { path: n[o - 3], params: n[o - 2], hash: n[o - 1], strip: a.stripFlags(n[o - 4], n[o]) };break;case 27:case 28:
            this.$ = n[o];break;case 29:
            this.$ = { type: "SubExpression", path: n[o - 3], params: n[o - 2], hash: n[o - 1], loc: a.locInfo(this._$) };break;case 30:
            this.$ = { type: "Hash", pairs: n[o], loc: a.locInfo(this._$) };break;case 31:
            this.$ = { type: "HashPair", key: a.id(n[o - 2]), value: n[o], loc: a.locInfo(this._$) };break;case 32:
            this.$ = a.id(n[o - 1]);break;case 33:case 34:
            this.$ = n[o];break;case 35:
            this.$ = { type: "StringLiteral", value: n[o], original: n[o], loc: a.locInfo(this._$) };break;case 36:
            this.$ = { type: "NumberLiteral", value: Number(n[o]), original: Number(n[o]), loc: a.locInfo(this._$) };break;case 37:
            this.$ = { type: "BooleanLiteral", value: "true" === n[o], original: "true" === n[o], loc: a.locInfo(this._$) };break;case 38:
            this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: a.locInfo(this._$) };break;case 39:
            this.$ = { type: "NullLiteral", original: null, value: null, loc: a.locInfo(this._$) };break;case 40:case 41:
            this.$ = n[o];break;case 42:
            this.$ = a.preparePath(!0, n[o], this._$);break;case 43:
            this.$ = a.preparePath(!1, n[o], this._$);break;case 44:
            n[o - 2].push({ part: a.id(n[o]), original: n[o], separator: n[o - 1] }), this.$ = n[o - 2];break;case 45:
            this.$ = [{ part: a.id(n[o]), original: n[o] }];break;case 46:
            this.$ = [];break;case 47:
            n[o - 1].push(n[o]);break;case 48:
            this.$ = [n[o]];break;case 49:
            n[o - 1].push(n[o]);break;case 50:
            this.$ = [];break;case 51:
            n[o - 1].push(n[o]);break;case 58:
            this.$ = [];break;case 59:
            n[o - 1].push(n[o]);break;case 64:
            this.$ = [];break;case 65:
            n[o - 1].push(n[o]);break;case 70:
            this.$ = [];break;case 71:
            n[o - 1].push(n[o]);break;case 78:
            this.$ = [];break;case 79:
            n[o - 1].push(n[o]);break;case 82:
            this.$ = [];break;case 83:
            n[o - 1].push(n[o]);break;case 86:
            this.$ = [];break;case 87:
            n[o - 1].push(n[o]);break;case 90:
            this.$ = [];break;case 91:
            n[o - 1].push(n[o]);break;case 94:
            this.$ = [];break;case 95:
            n[o - 1].push(n[o]);break;case 98:
            this.$ = [n[o]];break;case 99:
            n[o - 1].push(n[o]);break;case 100:
            this.$ = [n[o]];break;case 101:
            n[o - 1].push(n[o]);}
      }, table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }], defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] }, parseError: function parseError(t, e) {
        throw new Error(t);
      }, parse: function parse(t) {
        var e = this,
            r = [0],
            a = [null],
            i = [],
            n = this.table,
            s = "",
            o = 0,
            l = 0,
            c = 0;this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});var u = this.lexer.yylloc;i.push(u);var p = this.lexer.options && this.lexer.options.ranges;"function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);for (var h, d, m, f, g, b, v, y, k, S, w = {};;) {
          if (m = r[r.length - 1], this.defaultActions[m] ? f = this.defaultActions[m] : (null !== h && void 0 !== h || (S = void 0, "number" != typeof (S = e.lexer.lex() || 1) && (S = e.symbols_[S] || S), h = S), f = n[m] && n[m][h]), void 0 === f || !f.length || !f[0]) {
            var E = "";if (!c) {
              for (b in k = [], n[m]) {
                this.terminals_[b] && b > 2 && k.push("'" + this.terminals_[b] + "'");
              }E = this.lexer.showPosition ? "Parse error on line " + (o + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[h] || h) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (1 == h ? "end of input" : "'" + (this.terminals_[h] || h) + "'"), this.parseError(E, { text: this.lexer.match, token: this.terminals_[h] || h, line: this.lexer.yylineno, loc: u, expected: k });
            }
          }if (f[0] instanceof Array && f.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + h);switch (f[0]) {case 1:
              r.push(h), a.push(this.lexer.yytext), i.push(this.lexer.yylloc), r.push(f[1]), h = null, d ? (h = d, d = null) : (l = this.lexer.yyleng, s = this.lexer.yytext, o = this.lexer.yylineno, u = this.lexer.yylloc, c > 0 && c--);break;case 2:
              if (v = this.productions_[f[1]][1], w.$ = a[a.length - v], w._$ = { first_line: i[i.length - (v || 1)].first_line, last_line: i[i.length - 1].last_line, first_column: i[i.length - (v || 1)].first_column, last_column: i[i.length - 1].last_column }, p && (w._$.range = [i[i.length - (v || 1)].range[0], i[i.length - 1].range[1]]), void 0 !== (g = this.performAction.call(w, s, l, o, this.yy, f[1], a, i))) return g;v && (r = r.slice(0, -1 * v * 2), a = a.slice(0, -1 * v), i = i.slice(0, -1 * v)), r.push(this.productions_[f[1]][0]), a.push(w.$), i.push(w._$), y = n[r[r.length - 2]][r[r.length - 1]], r.push(y);break;case 3:
              return !0;}
        }return !0;
      } },
        e = function () {
      var t = { EOF: 1, parseError: function parseError(t, e) {
          if (!this.yy.parser) throw new Error(t);this.yy.parser.parseError(t, e);
        }, setInput: function setInput(t) {
          return this._input = t, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
        }, input: function input() {
          var t = this._input[0];return this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t, t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t;
        }, unput: function unput(t) {
          var e = t.length,
              r = t.split(/(?:\r\n?|\n)/g);this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e - 1), this.offset -= e;var a = this.match.split(/(?:\r\n?|\n)/g);this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), r.length - 1 && (this.yylineno -= r.length - 1);var i = this.yylloc.range;return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: r ? (r.length === a.length ? this.yylloc.first_column : 0) + a[a.length - r.length].length - r[0].length : this.yylloc.first_column - e }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - e]), this;
        }, more: function more() {
          return this._more = !0, this;
        }, less: function less(t) {
          this.unput(this.match.slice(t));
        }, pastInput: function pastInput() {
          var t = this.matched.substr(0, this.matched.length - this.match.length);return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
        }, upcomingInput: function upcomingInput() {
          var t = this.match;return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
        }, showPosition: function showPosition() {
          var t = this.pastInput(),
              e = new Array(t.length + 1).join("-");return t + this.upcomingInput() + "\n" + e + "^";
        }, next: function next() {
          if (this.done) return this.EOF;var t, e, r, a, i;this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");for (var n = this._currentRules(), s = 0; s < n.length && (!(r = this._input.match(this.rules[n[s]])) || e && !(r[0].length > e[0].length) || (e = r, a = s, this.options.flex)); s++) {}return e ? ((i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], t = this.performAction.call(this, this.yy, this, n[a], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), t || void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
        }, lex: function lex() {
          var t = this.next();return void 0 !== t ? t : this.lex();
        }, begin: function begin(t) {
          this.conditionStack.push(t);
        }, popState: function popState() {
          return this.conditionStack.pop();
        }, _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        }, topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        }, pushState: function pushState(t) {
          this.begin(t);
        }, options: {}, performAction: function performAction(t, e, r, a) {
          function i(t, r) {
            return e.yytext = e.yytext.substr(t, e.yyleng - r);
          }switch (r) {case 0:
              if ("\\\\" === e.yytext.slice(-2) ? (i(0, 1), this.begin("mu")) : "\\" === e.yytext.slice(-1) ? (i(0, 1), this.begin("emu")) : this.begin("mu"), e.yytext) return 15;break;case 1:
              return 15;case 2:
              return this.popState(), 15;case 3:
              return this.begin("raw"), 15;case 4:
              return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (e.yytext = e.yytext.substr(5, e.yyleng - 9), "END_RAW_BLOCK");case 5:
              return 15;case 6:
              return this.popState(), 14;case 7:
              return 65;case 8:
              return 68;case 9:
              return 19;case 10:
              return this.popState(), this.begin("raw"), 23;case 11:
              return 55;case 12:
              return 60;case 13:
              return 29;case 14:
              return 47;case 15:case 16:
              return this.popState(), 44;case 17:
              return 34;case 18:
              return 39;case 19:
              return 51;case 20:
              return 48;case 21:
              this.unput(e.yytext), this.popState(), this.begin("com");break;case 22:
              return this.popState(), 14;case 23:
              return 48;case 24:
              return 73;case 25:case 26:
              return 72;case 27:
              return 87;case 28:
              break;case 29:
              return this.popState(), 54;case 30:
              return this.popState(), 33;case 31:
              return e.yytext = i(1, 2).replace(/\\"/g, '"'), 80;case 32:
              return e.yytext = i(1, 2).replace(/\\'/g, "'"), 80;case 33:
              return 85;case 34:case 35:
              return 82;case 36:
              return 83;case 37:
              return 84;case 38:
              return 81;case 39:
              return 75;case 40:
              return 77;case 41:
              return 72;case 42:
              return e.yytext = e.yytext.replace(/\\([\\\]])/g, "$1"), 72;case 43:
              return "INVALID";case 44:
              return 5;}
        }, rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], conditions: { mu: { rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], inclusive: !1 }, emu: { rules: [2], inclusive: !1 }, com: { rules: [6], inclusive: !1 }, raw: { rules: [3, 4, 5], inclusive: !1 }, INITIAL: { rules: [0, 1, 44], inclusive: !0 } } };return t;
    }();function r() {
      this.yy = {};
    }return t.lexer = e, r.prototype = t, t.Parser = r, new r();
  }();e.default = r, t.exports = e.default;
});unwrapExports$$1(parser);var visitor = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r,
      a = (r = exception) && r.__esModule ? r : { default: r };function i() {
    this.parents = [];
  }function n(t) {
    this.acceptRequired(t, "path"), this.acceptArray(t.params), this.acceptKey(t, "hash");
  }function s(t) {
    n.call(this, t), this.acceptKey(t, "program"), this.acceptKey(t, "inverse");
  }function o(t) {
    this.acceptRequired(t, "name"), this.acceptArray(t.params), this.acceptKey(t, "hash");
  }i.prototype = { constructor: i, mutating: !1, acceptKey: function acceptKey(t, e) {
      var r = this.accept(t[e]);if (this.mutating) {
        if (r && !i.prototype[r.type]) throw new a.default('Unexpected node type "' + r.type + '" found when accepting ' + e + " on " + t.type);t[e] = r;
      }
    }, acceptRequired: function acceptRequired(t, e) {
      if (this.acceptKey(t, e), !t[e]) throw new a.default(t.type + " requires " + e);
    }, acceptArray: function acceptArray(t) {
      for (var e = 0, r = t.length; e < r; e++) {
        this.acceptKey(t, e), t[e] || (t.splice(e, 1), e--, r--);
      }
    }, accept: function accept(t) {
      if (t) {
        if (!this[t.type]) throw new a.default("Unknown type: " + t.type, t);this.current && this.parents.unshift(this.current), this.current = t;var e = this[t.type](t);return this.current = this.parents.shift(), !this.mutating || e ? e : !1 !== e ? t : void 0;
      }
    }, Program: function Program(t) {
      this.acceptArray(t.body);
    }, MustacheStatement: n, Decorator: n, BlockStatement: s, DecoratorBlock: s, PartialStatement: o, PartialBlockStatement: function PartialBlockStatement(t) {
      o.call(this, t), this.acceptKey(t, "program");
    }, ContentStatement: function ContentStatement() {}, CommentStatement: function CommentStatement() {}, SubExpression: n, PathExpression: function PathExpression() {}, StringLiteral: function StringLiteral() {}, NumberLiteral: function NumberLiteral() {}, BooleanLiteral: function BooleanLiteral() {}, UndefinedLiteral: function UndefinedLiteral() {}, NullLiteral: function NullLiteral() {}, Hash: function Hash(t) {
      this.acceptArray(t.pairs);
    }, HashPair: function HashPair(t) {
      this.acceptRequired(t, "value");
    } }, e.default = i, t.exports = e.default;
});unwrapExports$$1(visitor);var whitespaceControl = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r,
      a = (r = visitor) && r.__esModule ? r : { default: r };function i() {
    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];this.options = t;
  }function n(t, e, r) {
    void 0 === e && (e = t.length);var a = t[e - 1],
        i = t[e - 2];return a ? "ContentStatement" === a.type ? (i || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(a.original) : void 0 : r;
  }function s(t, e, r) {
    void 0 === e && (e = -1);var a = t[e + 1],
        i = t[e + 2];return a ? "ContentStatement" === a.type ? (i || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(a.original) : void 0 : r;
  }function o(t, e, r) {
    var a = t[null == e ? 0 : e + 1];if (a && "ContentStatement" === a.type && (r || !a.rightStripped)) {
      var i = a.value;a.value = a.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, ""), a.rightStripped = a.value !== i;
    }
  }function l(t, e, r) {
    var a = t[null == e ? t.length - 1 : e - 1];if (a && "ContentStatement" === a.type && (r || !a.leftStripped)) {
      var i = a.value;return a.value = a.value.replace(r ? /\s+$/ : /[ \t]+$/, ""), a.leftStripped = a.value !== i, a.leftStripped;
    }
  }i.prototype = new a.default(), i.prototype.Program = function (t) {
    var e = !this.options.ignoreStandalone,
        r = !this.isRootSeen;this.isRootSeen = !0;for (var a = t.body, i = 0, c = a.length; i < c; i++) {
      var u = a[i],
          p = this.accept(u);if (p) {
        var h = n(a, i, r),
            d = s(a, i, r),
            m = p.openStandalone && h,
            f = p.closeStandalone && d,
            g = p.inlineStandalone && h && d;p.close && o(a, i, !0), p.open && l(a, i, !0), e && g && (o(a, i), l(a, i) && "PartialStatement" === u.type && (u.indent = /([ \t]+$)/.exec(a[i - 1].original)[1])), e && m && (o((u.program || u.inverse).body), l(a, i)), e && f && (o(a, i), l((u.inverse || u.program).body));
      }
    }return t;
  }, i.prototype.BlockStatement = i.prototype.DecoratorBlock = i.prototype.PartialBlockStatement = function (t) {
    this.accept(t.program), this.accept(t.inverse);var e = t.program || t.inverse,
        r = t.program && t.inverse,
        a = r,
        i = r;if (r && r.chained) for (a = r.body[0].program; i.chained;) {
      i = i.body[i.body.length - 1].program;
    }var c = { open: t.openStrip.open, close: t.closeStrip.close, openStandalone: s(e.body), closeStandalone: n((a || e).body) };if (t.openStrip.close && o(e.body, null, !0), r) {
      var u = t.inverseStrip;u.open && l(e.body, null, !0), u.close && o(a.body, null, !0), t.closeStrip.open && l(i.body, null, !0), !this.options.ignoreStandalone && n(e.body) && s(a.body) && (l(e.body), o(a.body));
    } else t.closeStrip.open && l(e.body, null, !0);return c;
  }, i.prototype.Decorator = i.prototype.MustacheStatement = function (t) {
    return t.strip;
  }, i.prototype.PartialStatement = i.prototype.CommentStatement = function (t) {
    var e = t.strip || {};return { inlineStandalone: !0, open: e.open, close: e.close };
  }, e.default = i, t.exports = e.default;
});unwrapExports$$1(whitespaceControl);var helpers$2 = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.SourceLocation = function (t, e) {
    this.source = t, this.start = { line: e.first_line, column: e.first_column }, this.end = { line: e.last_line, column: e.last_column };
  }, e.id = function (t) {
    return (/^\[.*\]$/.test(t) ? t.substr(1, t.length - 2) : t
    );
  }, e.stripFlags = function (t, e) {
    return { open: "~" === t.charAt(2), close: "~" === e.charAt(e.length - 3) };
  }, e.stripComment = function (t) {
    return t.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "");
  }, e.preparePath = function (t, e, r) {
    r = this.locInfo(r);for (var i = t ? "@" : "", n = [], s = 0, o = 0, l = e.length; o < l; o++) {
      var c = e[o].part,
          u = e[o].original !== c;if (i += (e[o].separator || "") + c, u || ".." !== c && "." !== c && "this" !== c) n.push(c);else {
        if (n.length > 0) throw new a.default("Invalid path: " + i, { loc: r });".." === c && (s++, "../");
      }
    }return { type: "PathExpression", data: t, depth: s, parts: n, original: i, loc: r };
  }, e.prepareMustache = function (t, e, r, a, i, n) {
    var s = a.charAt(3) || a.charAt(2),
        o = "{" !== s && "&" !== s;return { type: /\*/.test(a) ? "Decorator" : "MustacheStatement", path: t, params: e, hash: r, escaped: o, strip: i, loc: this.locInfo(n) };
  }, e.prepareRawBlock = function (t, e, r, a) {
    i(t, r), a = this.locInfo(a);var n = { type: "Program", body: e, strip: {}, loc: a };return { type: "BlockStatement", path: t.path, params: t.params, hash: t.hash, program: n, openStrip: {}, inverseStrip: {}, closeStrip: {}, loc: a };
  }, e.prepareBlock = function (t, e, r, n, s, o) {
    n && n.path && i(t, n);var l = /\*/.test(t.open);e.blockParams = t.blockParams;var c = void 0,
        u = void 0;if (r) {
      if (l) throw new a.default("Unexpected inverse block on decorator", r);r.chain && (r.program.body[0].closeStrip = n.strip), u = r.strip, c = r.program;
    }s && (s = c, c = e, e = s);return { type: l ? "DecoratorBlock" : "BlockStatement", path: t.path, params: t.params, hash: t.hash, program: e, inverse: c, openStrip: t.strip, inverseStrip: u, closeStrip: n && n.strip, loc: this.locInfo(o) };
  }, e.prepareProgram = function (t, e) {
    if (!e && t.length) {
      var r = t[0].loc,
          a = t[t.length - 1].loc;r && a && (e = { source: r.source, start: { line: r.start.line, column: r.start.column }, end: { line: a.end.line, column: a.end.column } });
    }return { type: "Program", body: t, strip: {}, loc: e };
  }, e.preparePartialBlock = function (t, e, r, a) {
    return i(t, r), { type: "PartialBlockStatement", name: t.path, params: t.params, hash: t.hash, program: e, openStrip: t.strip, closeStrip: r && r.strip, loc: this.locInfo(a) };
  };var r,
      a = (r = exception) && r.__esModule ? r : { default: r };function i(t, e) {
    if (e = e.path ? e.path.original : e, t.path.original !== e) {
      var r = { loc: t.path.loc };throw new a.default(t.path.original + " doesn't match " + e, r);
    }
  }
});unwrapExports$$1(helpers$2);var base$2 = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0, e.parse = function (t, e) {
    if ("Program" === t.type) return t;return a.default.yy = s, s.locInfo = function (t) {
      return new s.SourceLocation(e && e.srcName, t);
    }, new i.default(e).accept(a.default.parse(t));
  };var a = r(parser),
      i = r(whitespaceControl),
      n = function (t) {
    if (t && t.__esModule) return t;var e = {};if (null != t) for (var r in t) {
      Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }return e.default = t, e;
  }(helpers$2);e.parser = a.default;var s = {};utils.extend(s, n);
});unwrapExports$$1(base$2);var compiler = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0, e.Compiler = s, e.precompile = function (t, e, r) {
    if (null == t || "string" != typeof t && "Program" !== t.type) throw new a.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t);"data" in (e = e || {}) || (e.data = !0);e.compat && (e.useDepths = !0);var i = r.parse(t, e),
        n = new r.Compiler().compile(i, e);return new r.JavaScriptCompiler().compile(n, e);
  }, e.compile = function (t, e, r) {
    void 0 === e && (e = {});if (null == t || "string" != typeof t && "Program" !== t.type) throw new a.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + t);"data" in (e = utils.extend({}, e)) || (e.data = !0);e.compat && (e.useDepths = !0);var i = void 0;function n() {
      var a = r.parse(t, e),
          i = new r.Compiler().compile(a, e),
          n = new r.JavaScriptCompiler().compile(i, e, void 0, !0);return r.template(n);
    }function s(t, e) {
      return i || (i = n()), i.call(this, t, e);
    }return s._setup = function (t) {
      return i || (i = n()), i._setup(t);
    }, s._child = function (t, e, r, a) {
      return i || (i = n()), i._child(t, e, r, a);
    }, s;
  };var a = r(exception),
      i = r(ast),
      n = [].slice;function s() {}function o(t, e) {
    if (t === e) return !0;if (utils.isArray(t) && utils.isArray(e) && t.length === e.length) {
      for (var r = 0; r < t.length; r++) {
        if (!o(t[r], e[r])) return !1;
      }return !0;
    }
  }function l(t) {
    if (!t.path.parts) {
      var e = t.path;t.path = { type: "PathExpression", data: !1, depth: 0, parts: [e.original + ""], original: e.original + "", loc: e.loc };
    }
  }s.prototype = { compiler: s, equals: function equals(t) {
      var e = this.opcodes.length;if (t.opcodes.length !== e) return !1;for (var r = 0; r < e; r++) {
        var a = this.opcodes[r],
            i = t.opcodes[r];if (a.opcode !== i.opcode || !o(a.args, i.args)) return !1;
      }e = this.children.length;for (r = 0; r < e; r++) {
        if (!this.children[r].equals(t.children[r])) return !1;
      }return !0;
    }, guid: 0, compile: function compile(t, e) {
      this.sourceNode = [], this.opcodes = [], this.children = [], this.options = e, this.stringParams = e.stringParams, this.trackIds = e.trackIds, e.blockParams = e.blockParams || [];var r = e.knownHelpers;if (e.knownHelpers = { helperMissing: !0, blockHelperMissing: !0, each: !0, if: !0, unless: !0, with: !0, log: !0, lookup: !0 }, r) for (var a in r) {
        a in r && (this.options.knownHelpers[a] = r[a]);
      }return this.accept(t);
    }, compileProgram: function compileProgram(t) {
      var e = new this.compiler().compile(t, this.options),
          r = this.guid++;return this.usePartial = this.usePartial || e.usePartial, this.children[r] = e, this.useDepths = this.useDepths || e.useDepths, r;
    }, accept: function accept(t) {
      if (!this[t.type]) throw new a.default("Unknown type: " + t.type, t);this.sourceNode.unshift(t);var e = this[t.type](t);return this.sourceNode.shift(), e;
    }, Program: function Program(t) {
      this.options.blockParams.unshift(t.blockParams);for (var e = t.body, r = e.length, a = 0; a < r; a++) {
        this.accept(e[a]);
      }return this.options.blockParams.shift(), this.isSimple = 1 === r, this.blockParams = t.blockParams ? t.blockParams.length : 0, this;
    }, BlockStatement: function BlockStatement(t) {
      l(t);var e = t.program,
          r = t.inverse;e = e && this.compileProgram(e), r = r && this.compileProgram(r);var a = this.classifySexpr(t);"helper" === a ? this.helperSexpr(t, e, r) : "simple" === a ? (this.simpleSexpr(t), this.opcode("pushProgram", e), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue", t.path.original)) : (this.ambiguousSexpr(t, e, r), this.opcode("pushProgram", e), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append");
    }, DecoratorBlock: function DecoratorBlock(t) {
      var e = t.program && this.compileProgram(t.program),
          r = this.setupFullMustacheParams(t, e, void 0),
          a = t.path;this.useDecorators = !0, this.opcode("registerDecorator", r.length, a.original);
    }, PartialStatement: function PartialStatement(t) {
      this.usePartial = !0;var e = t.program;e && (e = this.compileProgram(t.program));var r = t.params;if (r.length > 1) throw new a.default("Unsupported number of partial arguments: " + r.length, t);r.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : r.push({ type: "PathExpression", parts: [], depth: 0 }));var i = t.name.original,
          n = "SubExpression" === t.name.type;n && this.accept(t.name), this.setupFullMustacheParams(t, e, void 0, !0);var s = t.indent || "";this.options.preventIndent && s && (this.opcode("appendContent", s), s = ""), this.opcode("invokePartial", n, i, s), this.opcode("append");
    }, PartialBlockStatement: function PartialBlockStatement(t) {
      this.PartialStatement(t);
    }, MustacheStatement: function MustacheStatement(t) {
      this.SubExpression(t), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
    }, Decorator: function Decorator(t) {
      this.DecoratorBlock(t);
    }, ContentStatement: function ContentStatement(t) {
      t.value && this.opcode("appendContent", t.value);
    }, CommentStatement: function CommentStatement() {}, SubExpression: function SubExpression(t) {
      l(t);var e = this.classifySexpr(t);"simple" === e ? this.simpleSexpr(t) : "helper" === e ? this.helperSexpr(t) : this.ambiguousSexpr(t);
    }, ambiguousSexpr: function ambiguousSexpr(t, e, r) {
      var a = t.path,
          i = a.parts[0],
          n = null != e || null != r;this.opcode("getContext", a.depth), this.opcode("pushProgram", e), this.opcode("pushProgram", r), a.strict = !0, this.accept(a), this.opcode("invokeAmbiguous", i, n);
    }, simpleSexpr: function simpleSexpr(t) {
      var e = t.path;e.strict = !0, this.accept(e), this.opcode("resolvePossibleLambda");
    }, helperSexpr: function helperSexpr(t, e, r) {
      var n = this.setupFullMustacheParams(t, e, r),
          s = t.path,
          o = s.parts[0];if (this.options.knownHelpers[o]) this.opcode("invokeKnownHelper", n.length, o);else {
        if (this.options.knownHelpersOnly) throw new a.default("You specified knownHelpersOnly, but used the unknown helper " + o, t);s.strict = !0, s.falsy = !0, this.accept(s), this.opcode("invokeHelper", n.length, s.original, i.default.helpers.simpleId(s));
      }
    }, PathExpression: function PathExpression(t) {
      this.addDepth(t.depth), this.opcode("getContext", t.depth);var e = t.parts[0],
          r = i.default.helpers.scopedId(t),
          a = !t.depth && !r && this.blockParamIndex(e);a ? this.opcode("lookupBlockParam", a, t.parts) : e ? t.data ? (this.options.data = !0, this.opcode("lookupData", t.depth, t.parts, t.strict)) : this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, r) : this.opcode("pushContext");
    }, StringLiteral: function StringLiteral(t) {
      this.opcode("pushString", t.value);
    }, NumberLiteral: function NumberLiteral(t) {
      this.opcode("pushLiteral", t.value);
    }, BooleanLiteral: function BooleanLiteral(t) {
      this.opcode("pushLiteral", t.value);
    }, UndefinedLiteral: function UndefinedLiteral() {
      this.opcode("pushLiteral", "undefined");
    }, NullLiteral: function NullLiteral() {
      this.opcode("pushLiteral", "null");
    }, Hash: function Hash(t) {
      var e = t.pairs,
          r = 0,
          a = e.length;for (this.opcode("pushHash"); r < a; r++) {
        this.pushParam(e[r].value);
      }for (; r--;) {
        this.opcode("assignToHash", e[r].key);
      }this.opcode("popHash");
    }, opcode: function opcode(t) {
      this.opcodes.push({ opcode: t, args: n.call(arguments, 1), loc: this.sourceNode[0].loc });
    }, addDepth: function addDepth(t) {
      t && (this.useDepths = !0);
    }, classifySexpr: function classifySexpr(t) {
      var e = i.default.helpers.simpleId(t.path),
          r = e && !!this.blockParamIndex(t.path.parts[0]),
          a = !r && i.default.helpers.helperExpression(t),
          n = !r && (a || e);if (n && !a) {
        var s = t.path.parts[0],
            o = this.options;o.knownHelpers[s] ? a = !0 : o.knownHelpersOnly && (n = !1);
      }return a ? "helper" : n ? "ambiguous" : "simple";
    }, pushParams: function pushParams(t) {
      for (var e = 0, r = t.length; e < r; e++) {
        this.pushParam(t[e]);
      }
    }, pushParam: function pushParam(t) {
      var e = null != t.value ? t.value : t.original || "";if (this.stringParams) e.replace && (e = e.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", e, t.type), "SubExpression" === t.type && this.accept(t);else {
        if (this.trackIds) {
          var r = void 0;if (!t.parts || i.default.helpers.scopedId(t) || t.depth || (r = this.blockParamIndex(t.parts[0])), r) {
            var a = t.parts.slice(1).join(".");this.opcode("pushId", "BlockParam", r, a);
          } else (e = t.original || e).replace && (e = e.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", t.type, e);
        }this.accept(t);
      }
    }, setupFullMustacheParams: function setupFullMustacheParams(t, e, r, a) {
      var i = t.params;return this.pushParams(i), this.opcode("pushProgram", e), this.opcode("pushProgram", r), t.hash ? this.accept(t.hash) : this.opcode("emptyHash", a), i;
    }, blockParamIndex: function blockParamIndex(t) {
      for (var e = 0, r = this.options.blockParams.length; e < r; e++) {
        var a = this.options.blockParams[e],
            i = a && utils.indexOf(a, t);if (a && i >= 0) return [e, i];
      }
    } };
});unwrapExports$$1(compiler);var codeGen = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0;var r = void 0;try {
    var a = sourceMap;r = a.SourceNode;
  } catch (t) {}function i(t, e, r) {
    if (utils.isArray(t)) {
      for (var a = [], i = 0, n = t.length; i < n; i++) {
        a.push(e.wrap(t[i], r));
      }return a;
    }return "boolean" == typeof t || "number" == typeof t ? t + "" : t;
  }function n(t) {
    this.srcFile = t, this.source = [];
  }r || ((r = function r(t, e, _r7, a) {
    this.src = "", a && this.add(a);
  }).prototype = { add: function add(t) {
      utils.isArray(t) && (t = t.join("")), this.src += t;
    }, prepend: function prepend(t) {
      utils.isArray(t) && (t = t.join("")), this.src = t + this.src;
    }, toStringWithSourceMap: function toStringWithSourceMap() {
      return { code: this.toString() };
    }, toString: function toString() {
      return this.src;
    } }), n.prototype = { isEmpty: function isEmpty() {
      return !this.source.length;
    }, prepend: function prepend(t, e) {
      this.source.unshift(this.wrap(t, e));
    }, push: function push(t, e) {
      this.source.push(this.wrap(t, e));
    }, merge: function merge() {
      var t = this.empty();return this.each(function (e) {
        t.add(["  ", e, "\n"]);
      }), t;
    }, each: function each(t) {
      for (var e = 0, r = this.source.length; e < r; e++) {
        t(this.source[e]);
      }
    }, empty: function empty() {
      var t = this.currentLocation || { start: {} };return new r(t.start.line, t.start.column, this.srcFile);
    }, wrap: function wrap(t) {
      var e = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || { start: {} } : arguments[1];return t instanceof r ? t : (t = i(t, this, e), new r(e.start.line, e.start.column, this.srcFile, t));
    }, functionCall: function functionCall(t, e, r) {
      return r = this.generateList(r), this.wrap([t, e ? "." + e + "(" : "(", r, ")"]);
    }, quotedString: function quotedString(t) {
      return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
    }, objectLiteral: function objectLiteral(t) {
      var e = [];for (var r in t) {
        if (t.hasOwnProperty(r)) {
          var a = i(t[r], this);"undefined" !== a && e.push([this.quotedString(r), ":", a]);
        }
      }var n = this.generateList(e);return n.prepend("{"), n.add("}"), n;
    }, generateList: function generateList(t) {
      for (var e = this.empty(), r = 0, a = t.length; r < a; r++) {
        r && e.add(","), e.add(i(t[r], this));
      }return e;
    }, generateArray: function generateArray(t) {
      var e = this.generateList(t);return e.prepend("["), e.add("]"), e;
    } }, e.default = n, t.exports = e.default;
});unwrapExports$$1(codeGen);var javascriptCompiler = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0;var a = r(exception),
      i = r(codeGen);function n(t) {
    this.value = t;
  }function s() {}s.prototype = { nameLookup: function nameLookup(t, e) {
      return s.isValidJavaScriptVariableName(e) ? [t, ".", e] : [t, "[", JSON.stringify(e), "]"];
    }, depthedLookup: function depthedLookup(t) {
      return [this.aliasable("container.lookup"), '(depths, "', t, '")'];
    }, compilerInfo: function compilerInfo() {
      var t = base.COMPILER_REVISION;return [t, base.REVISION_CHANGES[t]];
    }, appendToBuffer: function appendToBuffer(t, e, r) {
      return utils.isArray(t) || (t = [t]), t = this.source.wrap(t, e), this.environment.isSimple ? ["return ", t, ";"] : r ? ["buffer += ", t, ";"] : (t.appendToBuffer = !0, t);
    }, initializeBuffer: function initializeBuffer() {
      return this.quotedString("");
    }, compile: function compile(t, e, r, i) {
      this.environment = t, this.options = e, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !i, this.name = this.environment.name, this.isChild = !!r, this.context = r || { decorators: [], programs: [], environments: [] }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = { list: [] }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(t, e), this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || t.useBlockParams;var n = t.opcodes,
          s = void 0,
          o = void 0,
          l = void 0,
          c = void 0;for (l = 0, c = n.length; l < c; l++) {
        s = n[l], this.source.currentLocation = s.loc, o = o || s.loc, this[s.opcode].apply(this, s.args);
      }if (this.source.currentLocation = o, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new a.default("Compile completed with content left on stack");this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), i ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));var u = this.createFunctionContext(i);if (this.isChild) return u;var p = { compiler: this.compilerInfo(), main: u };this.decorators && (p.main_d = this.decorators, p.useDecorators = !0);var h = this.context,
          d = h.programs,
          m = h.decorators;for (l = 0, c = d.length; l < c; l++) {
        d[l] && (p[l] = d[l], m[l] && (p[l + "_d"] = m[l], p.useDecorators = !0));
      }return this.environment.usePartial && (p.usePartial = !0), this.options.data && (p.useData = !0), this.useDepths && (p.useDepths = !0), this.useBlockParams && (p.useBlockParams = !0), this.options.compat && (p.compat = !0), i ? p.compilerOptions = this.options : (p.compiler = JSON.stringify(p.compiler), this.source.currentLocation = { start: { line: 1, column: 0 } }, p = this.objectLiteral(p), e.srcName ? (p = p.toStringWithSourceMap({ file: e.destName })).map = p.map && p.map.toString() : p = p.toString()), p;
    }, preamble: function preamble() {
      this.lastContext = 0, this.source = new i.default(this.options.srcName), this.decorators = new i.default(this.options.srcName);
    }, createFunctionContext: function createFunctionContext(t) {
      var e = "",
          r = this.stackVars.concat(this.registers.list);r.length > 0 && (e += ", " + r.join(", "));var a = 0;for (var i in this.aliases) {
        var n = this.aliases[i];this.aliases.hasOwnProperty(i) && n.children && n.referenceCount > 1 && (e += ", alias" + ++a + "=" + i, n.children[0] = "alias" + a);
      }var s = ["container", "depth0", "helpers", "partials", "data"];(this.useBlockParams || this.useDepths) && s.push("blockParams"), this.useDepths && s.push("depths");var o = this.mergeSource(e);return t ? (s.push(o), Function.apply(this, s)) : this.source.wrap(["function(", s.join(","), ") {\n  ", o, "}"]);
    }, mergeSource: function mergeSource(t) {
      var e = this.environment.isSimple,
          r = !this.forceBuffer,
          a = void 0,
          i = void 0,
          n = void 0,
          s = void 0;return this.source.each(function (t) {
        t.appendToBuffer ? (n ? t.prepend("  + ") : n = t, s = t) : (n && (i ? n.prepend("buffer += ") : a = !0, s.add(";"), n = s = void 0), i = !0, e || (r = !1));
      }), r ? n ? (n.prepend("return "), s.add(";")) : i || this.source.push('return "";') : (t += ", buffer = " + (a ? "" : this.initializeBuffer()), n ? (n.prepend("return buffer + "), s.add(";")) : this.source.push("return buffer;")), t && this.source.prepend("var " + t.substring(2) + (a ? "" : ";\n")), this.source.merge();
    }, blockValue: function blockValue(t) {
      var e = this.aliasable("helpers.blockHelperMissing"),
          r = [this.contextName(0)];this.setupHelperArgs(t, 0, r);var a = this.popStack();r.splice(1, 0, a), this.push(this.source.functionCall(e, "call", r));
    }, ambiguousBlockValue: function ambiguousBlockValue() {
      var t = this.aliasable("helpers.blockHelperMissing"),
          e = [this.contextName(0)];this.setupHelperArgs("", 0, e, !0), this.flushInline();var r = this.topStack();e.splice(1, 0, r), this.pushSource(["if (!", this.lastHelper, ") { ", r, " = ", this.source.functionCall(t, "call", e), "}"]);
    }, appendContent: function appendContent(t) {
      this.pendingContent ? t = this.pendingContent + t : this.pendingLocation = this.source.currentLocation, this.pendingContent = t;
    }, append: function append() {
      if (this.isInline()) this.replaceStack(function (t) {
        return [" != null ? ", t, ' : ""'];
      }), this.pushSource(this.appendToBuffer(this.popStack()));else {
        var t = this.popStack();this.pushSource(["if (", t, " != null) { ", this.appendToBuffer(t, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"]);
      }
    }, appendEscaped: function appendEscaped() {
      this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
    }, getContext: function getContext(t) {
      this.lastContext = t;
    }, pushContext: function pushContext() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    }, lookupOnContext: function lookupOnContext(t, e, r, a) {
      var i = 0;a || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(t[i++])), this.resolvePath("context", t, i, e, r);
    }, lookupBlockParam: function lookupBlockParam(t, e) {
      this.useBlockParams = !0, this.push(["blockParams[", t[0], "][", t[1], "]"]), this.resolvePath("context", e, 1);
    }, lookupData: function lookupData(t, e, r) {
      t ? this.pushStackLiteral("container.data(data, " + t + ")") : this.pushStackLiteral("data"), this.resolvePath("data", e, 0, !0, r);
    }, resolvePath: function resolvePath(t, e, r, a, i) {
      var n = this;if (this.options.strict || this.options.assumeObjects) this.push(function (t, e, r, a) {
        var i = e.popStack(),
            n = 0,
            s = r.length;t && s--;for (; n < s; n++) {
          i = e.nameLookup(i, r[n], a);
        }return t ? [e.aliasable("container.strict"), "(", i, ", ", e.quotedString(r[n]), ")"] : i;
      }(this.options.strict && i, this, e, t));else for (var s = e.length; r < s; r++) {
        this.replaceStack(function (i) {
          var s = n.nameLookup(i, e[r], t);return a ? [" && ", s] : [" != null ? ", s, " : ", i];
        });
      }
    }, resolvePossibleLambda: function resolvePossibleLambda() {
      this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
    }, pushStringParam: function pushStringParam(t, e) {
      this.pushContext(), this.pushString(e), "SubExpression" !== e && ("string" == typeof t ? this.pushString(t) : this.pushStackLiteral(t));
    }, emptyHash: function emptyHash(t) {
      this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(t ? "undefined" : "{}");
    }, pushHash: function pushHash() {
      this.hash && this.hashes.push(this.hash), this.hash = { values: [], types: [], contexts: [], ids: [] };
    }, popHash: function popHash() {
      var t = this.hash;this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(t.ids)), this.stringParams && (this.push(this.objectLiteral(t.contexts)), this.push(this.objectLiteral(t.types))), this.push(this.objectLiteral(t.values));
    }, pushString: function pushString(t) {
      this.pushStackLiteral(this.quotedString(t));
    }, pushLiteral: function pushLiteral(t) {
      this.pushStackLiteral(t);
    }, pushProgram: function pushProgram(t) {
      null != t ? this.pushStackLiteral(this.programExpression(t)) : this.pushStackLiteral(null);
    }, registerDecorator: function registerDecorator(t, e) {
      var r = this.nameLookup("decorators", e, "decorator"),
          a = this.setupHelperArgs(e, t);this.decorators.push(["fn = ", this.decorators.functionCall(r, "", ["fn", "props", "container", a]), " || fn;"]);
    }, invokeHelper: function invokeHelper(t, e, r) {
      var a = this.popStack(),
          i = this.setupHelper(t, e),
          n = r ? [i.name, " || "] : "",
          s = ["("].concat(n, a);this.options.strict || s.push(" || ", this.aliasable("helpers.helperMissing")), s.push(")"), this.push(this.source.functionCall(s, "call", i.callParams));
    }, invokeKnownHelper: function invokeKnownHelper(t, e) {
      var r = this.setupHelper(t, e);this.push(this.source.functionCall(r.name, "call", r.callParams));
    }, invokeAmbiguous: function invokeAmbiguous(t, e) {
      this.useRegister("helper");var r = this.popStack();this.emptyHash();var a = this.setupHelper(0, t, e),
          i = ["(", "(helper = ", this.lastHelper = this.nameLookup("helpers", t, "helper"), " || ", r, ")"];this.options.strict || (i[0] = "(helper = ", i.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), this.push(["(", i, a.paramsInit ? ["),(", a.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", a.callParams), " : helper))"]);
    }, invokePartial: function invokePartial(t, e, r) {
      var a = [],
          i = this.setupParams(e, 1, a);t && (e = this.popStack(), delete i.name), r && (i.indent = JSON.stringify(r)), i.helpers = "helpers", i.partials = "partials", i.decorators = "container.decorators", t ? a.unshift(e) : a.unshift(this.nameLookup("partials", e, "partial")), this.options.compat && (i.depths = "depths"), i = this.objectLiteral(i), a.push(i), this.push(this.source.functionCall("container.invokePartial", "", a));
    }, assignToHash: function assignToHash(t) {
      var e = this.popStack(),
          r = void 0,
          a = void 0,
          i = void 0;this.trackIds && (i = this.popStack()), this.stringParams && (a = this.popStack(), r = this.popStack());var n = this.hash;r && (n.contexts[t] = r), a && (n.types[t] = a), i && (n.ids[t] = i), n.values[t] = e;
    }, pushId: function pushId(t, e, r) {
      "BlockParam" === t ? this.pushStackLiteral("blockParams[" + e[0] + "].path[" + e[1] + "]" + (r ? " + " + JSON.stringify("." + r) : "")) : "PathExpression" === t ? this.pushString(e) : "SubExpression" === t ? this.pushStackLiteral("true") : this.pushStackLiteral("null");
    }, compiler: s, compileChildren: function compileChildren(t, e) {
      for (var r = t.children, a = void 0, i = void 0, n = 0, s = r.length; n < s; n++) {
        a = r[n], i = new this.compiler();var o = this.matchExistingProgram(a);if (null == o) {
          this.context.programs.push("");var l = this.context.programs.length;a.index = l, a.name = "program" + l, this.context.programs[l] = i.compile(a, e, this.context, !this.precompile), this.context.decorators[l] = i.decorators, this.context.environments[l] = a, this.useDepths = this.useDepths || i.useDepths, this.useBlockParams = this.useBlockParams || i.useBlockParams, a.useDepths = this.useDepths, a.useBlockParams = this.useBlockParams;
        } else a.index = o.index, a.name = "program" + o.index, this.useDepths = this.useDepths || o.useDepths, this.useBlockParams = this.useBlockParams || o.useBlockParams;
      }
    }, matchExistingProgram: function matchExistingProgram(t) {
      for (var e = 0, r = this.context.environments.length; e < r; e++) {
        var a = this.context.environments[e];if (a && a.equals(t)) return a;
      }
    }, programExpression: function programExpression(t) {
      var e = this.environment.children[t],
          r = [e.index, "data", e.blockParams];return (this.useBlockParams || this.useDepths) && r.push("blockParams"), this.useDepths && r.push("depths"), "container.program(" + r.join(", ") + ")";
    }, useRegister: function useRegister(t) {
      this.registers[t] || (this.registers[t] = !0, this.registers.list.push(t));
    }, push: function push(t) {
      return t instanceof n || (t = this.source.wrap(t)), this.inlineStack.push(t), t;
    }, pushStackLiteral: function pushStackLiteral(t) {
      this.push(new n(t));
    }, pushSource: function pushSource(t) {
      this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), t && this.source.push(t);
    }, replaceStack: function replaceStack(t) {
      var e = ["("],
          r = void 0,
          i = void 0,
          s = void 0;if (!this.isInline()) throw new a.default("replaceStack on non-inline");var o = this.popStack(!0);if (o instanceof n) e = ["(", r = [o.value]], s = !0;else {
        i = !0;var l = this.incrStack();e = ["((", this.push(l), " = ", o, ")"], r = this.topStack();
      }var c = t.call(this, r);s || this.popStack(), i && this.stackSlot--, this.push(e.concat(c, ")"));
    }, incrStack: function incrStack() {
      return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName();
    }, topStackName: function topStackName() {
      return "stack" + this.stackSlot;
    }, flushInline: function flushInline() {
      var t = this.inlineStack;this.inlineStack = [];for (var e = 0, r = t.length; e < r; e++) {
        var a = t[e];if (a instanceof n) this.compileStack.push(a);else {
          var i = this.incrStack();this.pushSource([i, " = ", a, ";"]), this.compileStack.push(i);
        }
      }
    }, isInline: function isInline() {
      return this.inlineStack.length;
    }, popStack: function popStack(t) {
      var e = this.isInline(),
          r = (e ? this.inlineStack : this.compileStack).pop();if (!t && r instanceof n) return r.value;if (!e) {
        if (!this.stackSlot) throw new a.default("Invalid stack pop");this.stackSlot--;
      }return r;
    }, topStack: function topStack() {
      var t = this.isInline() ? this.inlineStack : this.compileStack,
          e = t[t.length - 1];return e instanceof n ? e.value : e;
    }, contextName: function contextName(t) {
      return this.useDepths && t ? "depths[" + t + "]" : "depth" + t;
    }, quotedString: function quotedString(t) {
      return this.source.quotedString(t);
    }, objectLiteral: function objectLiteral(t) {
      return this.source.objectLiteral(t);
    }, aliasable: function aliasable(t) {
      var e = this.aliases[t];return e ? (e.referenceCount++, e) : ((e = this.aliases[t] = this.source.wrap(t)).aliasable = !0, e.referenceCount = 1, e);
    }, setupHelper: function setupHelper(t, e, r) {
      var a = [];return { params: a, paramsInit: this.setupHelperArgs(e, t, a, r), name: this.nameLookup("helpers", e, "helper"), callParams: [this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})")].concat(a) };
    }, setupParams: function setupParams(t, e, r) {
      var a = {},
          i = [],
          n = [],
          s = [],
          o = !r,
          l = void 0;o && (r = []), a.name = this.quotedString(t), a.hash = this.popStack(), this.trackIds && (a.hashIds = this.popStack()), this.stringParams && (a.hashTypes = this.popStack(), a.hashContexts = this.popStack());var c = this.popStack(),
          u = this.popStack();(u || c) && (a.fn = u || "container.noop", a.inverse = c || "container.noop");for (var p = e; p--;) {
        l = this.popStack(), r[p] = l, this.trackIds && (s[p] = this.popStack()), this.stringParams && (n[p] = this.popStack(), i[p] = this.popStack());
      }return o && (a.args = this.source.generateArray(r)), this.trackIds && (a.ids = this.source.generateArray(s)), this.stringParams && (a.types = this.source.generateArray(n), a.contexts = this.source.generateArray(i)), this.options.data && (a.data = "data"), this.useBlockParams && (a.blockParams = "blockParams"), a;
    }, setupHelperArgs: function setupHelperArgs(t, e, r, a) {
      var i = this.setupParams(t, e, r);return i = this.objectLiteral(i), a ? (this.useRegister("options"), r.push("options"), ["options=", i]) : r ? (r.push(i), "") : i;
    } }, function () {
    for (var t = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), e = s.RESERVED_WORDS = {}, r = 0, a = t.length; r < a; r++) {
      e[t[r]] = !0;
    }
  }(), s.isValidJavaScriptVariableName = function (t) {
    return !s.RESERVED_WORDS[t] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t);
  }, e.default = s, t.exports = e.default;
});unwrapExports$$1(javascriptCompiler);var handlebars$1 = createCommonjsModule$$1(function (t, e) {
  function r(t) {
    return t && t.__esModule ? t : { default: t };
  }e.__esModule = !0;var a = r(handlebars_runtime),
      i = r(ast),
      n = r(javascriptCompiler),
      s = r(visitor),
      o = r(noConflict),
      l = a.default.create;function c() {
    var t = l();return t.compile = function (e, r) {
      return compiler.compile(e, r, t);
    }, t.precompile = function (e, r) {
      return compiler.precompile(e, r, t);
    }, t.AST = i.default, t.Compiler = compiler.Compiler, t.JavaScriptCompiler = n.default, t.Parser = base$2.parser, t.parse = base$2.parse, t;
  }var u = c();u.create = c, o.default(u), u.Visitor = s.default, u.default = u, e.default = u, t.exports = e.default;
});unwrapExports$$1(handlebars$1);var printer = createCommonjsModule$$1(function (t, e) {
  e.__esModule = !0, e.print = function (t) {
    return new i().accept(t);
  }, e.PrintVisitor = i;var r,
      a = (r = visitor) && r.__esModule ? r : { default: r };function i() {
    this.padding = 0;
  }i.prototype = new a.default(), i.prototype.pad = function (t) {
    for (var e = "", r = 0, a = this.padding; r < a; r++) {
      e += "  ";
    }return e += t + "\n";
  }, i.prototype.Program = function (t) {
    var e = "",
        r = t.body,
        a = void 0,
        i = void 0;if (t.blockParams) {
      var n = "BLOCK PARAMS: [";for (a = 0, i = t.blockParams.length; a < i; a++) {
        n += " " + t.blockParams[a];
      }n += " ]", e += this.pad(n);
    }for (a = 0, i = r.length; a < i; a++) {
      e += this.accept(r[a]);
    }return this.padding--, e;
  }, i.prototype.MustacheStatement = function (t) {
    return this.pad("{{ " + this.SubExpression(t) + " }}");
  }, i.prototype.Decorator = function (t) {
    return this.pad("{{ DIRECTIVE " + this.SubExpression(t) + " }}");
  }, i.prototype.BlockStatement = i.prototype.DecoratorBlock = function (t) {
    var e = "";return e += this.pad(("DecoratorBlock" === t.type ? "DIRECTIVE " : "") + "BLOCK:"), this.padding++, e += this.pad(this.SubExpression(t)), t.program && (e += this.pad("PROGRAM:"), this.padding++, e += this.accept(t.program), this.padding--), t.inverse && (t.program && this.padding++, e += this.pad("{{^}}"), this.padding++, e += this.accept(t.inverse), this.padding--, t.program && this.padding--), this.padding--, e;
  }, i.prototype.PartialStatement = function (t) {
    var e = "PARTIAL:" + t.name.original;return t.params[0] && (e += " " + this.accept(t.params[0])), t.hash && (e += " " + this.accept(t.hash)), this.pad("{{> " + e + " }}");
  }, i.prototype.PartialBlockStatement = function (t) {
    var e = "PARTIAL BLOCK:" + t.name.original;return t.params[0] && (e += " " + this.accept(t.params[0])), t.hash && (e += " " + this.accept(t.hash)), e += " " + this.pad("PROGRAM:"), this.padding++, e += this.accept(t.program), this.padding--, this.pad("{{> " + e + " }}");
  }, i.prototype.ContentStatement = function (t) {
    return this.pad("CONTENT[ '" + t.value + "' ]");
  }, i.prototype.CommentStatement = function (t) {
    return this.pad("{{! '" + t.value + "' }}");
  }, i.prototype.SubExpression = function (t) {
    for (var e, r = t.params, a = [], i = 0, n = r.length; i < n; i++) {
      a.push(this.accept(r[i]));
    }return r = "[" + a.join(", ") + "]", e = t.hash ? " " + this.accept(t.hash) : "", this.accept(t.path) + " " + r + e;
  }, i.prototype.PathExpression = function (t) {
    var e = t.parts.join("/");return (t.data ? "@" : "") + "PATH:" + e;
  }, i.prototype.StringLiteral = function (t) {
    return '"' + t.value + '"';
  }, i.prototype.NumberLiteral = function (t) {
    return "NUMBER{" + t.value + "}";
  }, i.prototype.BooleanLiteral = function (t) {
    return "BOOLEAN{" + t.value + "}";
  }, i.prototype.UndefinedLiteral = function () {
    return "UNDEFINED";
  }, i.prototype.NullLiteral = function () {
    return "NULL";
  }, i.prototype.Hash = function (t) {
    for (var e = t.pairs, r = [], a = 0, i = e.length; a < i; a++) {
      r.push(this.accept(e[a]));
    }return "HASH{" + r.join(", ") + "}";
  }, i.prototype.HashPair = function (t) {
    return t.key + "=" + this.accept(t.value);
  };
});unwrapExports$$1(printer);var handlebars = handlebars$1.default;handlebars.PrintVisitor = printer.PrintVisitor, handlebars.print = printer.print;var lib = handlebars;function extension(t, e) {
  var r = fs$$1.readFileSync(e, "utf8");t.exports = handlebars.compile(r);
}"undefined" != typeof commonjsRequire && commonjsRequire.extensions && (commonjsRequire.extensions[".handlebars"] = extension, commonjsRequire.extensions[".hbs"] = extension);var lib_1 = lib.parse;var voidMap = Object.create(null);var voidTagNames = "area base br col command embed hr img input keygen link meta param source track wbr";voidTagNames.split(" ").forEach(function (t) {
  voidMap[t] = !0;
});
var TokenizerEventHandlers = function (_HandlebarsNodeVisito) {
  _inherits(TokenizerEventHandlers, _HandlebarsNodeVisito);

  function TokenizerEventHandlers() {
    var _this2;

    _classCallCheck(this, TokenizerEventHandlers);

    (_this2 = _possibleConstructorReturn(this, (TokenizerEventHandlers.__proto__ || Object.getPrototypeOf(TokenizerEventHandlers)).apply(this, arguments)), _this2), _this2.tagOpenLine = 0, _this2.tagOpenColumn = 0;return _this2;
  }

  _createClass(TokenizerEventHandlers, [{
    key: "reset",
    value: function reset() {
      this.currentNode = null;
    }
  }, {
    key: "beginComment",
    value: function beginComment() {
      this.currentNode = b.comment(""), this.currentNode.loc = { source: null, start: b.pos(this.tagOpenLine, this.tagOpenColumn), end: null };
    }
  }, {
    key: "appendToCommentData",
    value: function appendToCommentData(t) {
      this.currentComment.value += t;
    }
  }, {
    key: "finishComment",
    value: function finishComment() {
      this.currentComment.loc.end = b.pos(this.tokenizer.line, this.tokenizer.column), appendChild(this.currentElement(), this.currentComment);
    }
  }, {
    key: "beginData",
    value: function beginData() {
      this.currentNode = b.text(), this.currentNode.loc = { source: null, start: b.pos(this.tokenizer.line, this.tokenizer.column), end: null };
    }
  }, {
    key: "appendToData",
    value: function appendToData(t) {
      this.currentData.chars += t;
    }
  }, {
    key: "finishData",
    value: function finishData() {
      this.currentData.loc.end = b.pos(this.tokenizer.line, this.tokenizer.column), appendChild(this.currentElement(), this.currentData);
    }
  }, {
    key: "tagOpen",
    value: function tagOpen() {
      this.tagOpenLine = this.tokenizer.line, this.tagOpenColumn = this.tokenizer.column;
    }
  }, {
    key: "beginStartTag",
    value: function beginStartTag() {
      this.currentNode = { type: "StartTag", name: "", attributes: [], modifiers: [], comments: [], selfClosing: !1, loc: SYNTHETIC };
    }
  }, {
    key: "beginEndTag",
    value: function beginEndTag() {
      this.currentNode = { type: "EndTag", name: "", attributes: [], modifiers: [], comments: [], selfClosing: !1, loc: SYNTHETIC };
    }
  }, {
    key: "finishTag",
    value: function finishTag() {
      var _tokenizer = this.tokenizer,
          t = _tokenizer.line,
          e = _tokenizer.column,
          r = this.currentTag;
      r.loc = b.loc(this.tagOpenLine, this.tagOpenColumn, t, e), "StartTag" === r.type ? (this.finishStartTag(), (voidMap[r.name] || r.selfClosing) && this.finishEndTag(!0)) : "EndTag" === r.type && this.finishEndTag(!1);
    }
  }, {
    key: "finishStartTag",
    value: function finishStartTag() {
      var _currentStartTag = this.currentStartTag,
          t = _currentStartTag.name,
          e = _currentStartTag.attributes,
          r = _currentStartTag.modifiers,
          a = _currentStartTag.comments,
          i = b.loc(this.tagOpenLine, this.tagOpenColumn),
          n = b.element(t, e, r, [], a, i);
      this.elementStack.push(n);
    }
  }, {
    key: "finishEndTag",
    value: function finishEndTag(t) {
      var e = this.currentTag,
          r = this.elementStack.pop(),
          a = this.currentElement();validateEndTag(e, r, t), r.loc.end.line = this.tokenizer.line, r.loc.end.column = this.tokenizer.column, parseElementBlockParams(r), appendChild(a, r);
    }
  }, {
    key: "markTagAsSelfClosing",
    value: function markTagAsSelfClosing() {
      this.currentTag.selfClosing = !0;
    }
  }, {
    key: "appendToTagName",
    value: function appendToTagName(t) {
      this.currentTag.name += t;
    }
  }, {
    key: "beginAttribute",
    value: function beginAttribute() {
      var t = this.currentTag;if ("EndTag" === t.type) throw new SyntaxError$1("Invalid end tag: closing tag must not have attributes, " + ("in `" + t.name + "` (on line " + this.tokenizer.line + ")."), t.loc);this.currentAttribute = { name: "", parts: [], isQuoted: !1, isDynamic: !1, start: b.pos(this.tokenizer.line, this.tokenizer.column), valueStartLine: 0, valueStartColumn: 0 };
    }
  }, {
    key: "appendToAttributeName",
    value: function appendToAttributeName(t) {
      this.currentAttr.name += t;
    }
  }, {
    key: "beginAttributeValue",
    value: function beginAttributeValue(t) {
      this.currentAttr.isQuoted = t, this.currentAttr.valueStartLine = this.tokenizer.line, this.currentAttr.valueStartColumn = this.tokenizer.column;
    }
  }, {
    key: "appendToAttributeValue",
    value: function appendToAttributeValue(t) {
      var e = this.currentAttr.parts,
          r = e[e.length - 1];if (r && "TextNode" === r.type) r.chars += t, r.loc.end.line = this.tokenizer.line, r.loc.end.column = this.tokenizer.column;else {
        var a = b.loc(this.tokenizer.line, this.tokenizer.column, this.tokenizer.line, this.tokenizer.column);"\n" === t && (a.start.line -= 1, a.start.column = r ? r.loc.end.column : this.currentAttr.valueStartColumn);var i = b.text(t, a);e.push(i);
      }
    }
  }, {
    key: "finishAttributeValue",
    value: function finishAttributeValue() {
      var _currentAttr = this.currentAttr,
          t = _currentAttr.name,
          e = _currentAttr.parts,
          r = _currentAttr.isQuoted,
          a = _currentAttr.isDynamic,
          i = _currentAttr.valueStartLine,
          n = _currentAttr.valueStartColumn,
          s = assembleAttributeValue(e, r, a, this.tokenizer.line);
      s.loc = b.loc(i, n, this.tokenizer.line, this.tokenizer.column);var o = b.loc(this.currentAttr.start.line, this.currentAttr.start.column, this.tokenizer.line, this.tokenizer.column),
          l = b.attr(t, s, o);this.currentStartTag.attributes.push(l);
    }
  }, {
    key: "reportSyntaxError",
    value: function reportSyntaxError(t) {
      throw new SyntaxError$1("Syntax error at line " + this.tokenizer.line + " col " + this.tokenizer.column + ": " + t, b.loc(this.tokenizer.line, this.tokenizer.column));
    }
  }]);

  return TokenizerEventHandlers;
}(HandlebarsNodeVisitors);

function assembleAttributeValue(t, e, r, a) {
  if (r) {
    if (e) return assembleConcatenatedValue(t);if (1 === t.length || 2 === t.length && "TextNode" === t[1].type && "/" === t[1].chars) return t[0];throw new SyntaxError$1("An unquoted attribute value must be a string or a mustache, preceeded by whitespace or a '=' character, and " + ("followed by whitespace, a '>' character, or '/>' (on line " + a + ")"), b.loc(a, 0));
  }return t.length > 0 ? t[0] : b.text("");
}function assembleConcatenatedValue(t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e];if ("MustacheStatement" !== r.type && "TextNode" !== r.type) throw new SyntaxError$1("Unsupported node in quoted attribute value: " + r.type, r.loc);
  }return b.concat(t);
}function validateEndTag(t, e, r) {
  var a = void 0;if (voidMap[t.name] && !r ? a = "Invalid end tag " + formatEndTagInfo(t) + " (void elements cannot have end tags)." : void 0 === e.tag ? a = "Closing tag " + formatEndTagInfo(t) + " without an open tag." : e.tag !== t.name && (a = "Closing tag " + formatEndTagInfo(t) + " did not match last open tag `" + e.tag + "` (on line " + e.loc.start.line + ")."), a) throw new SyntaxError$1(a, e.loc);
}function formatEndTagInfo(t) {
  return "`" + t.name + "` (on line " + t.loc.end.line + ")";
}var syntax = { parse: preprocess, builders: b, print: build, traverse: traverse, Walker: Walker };function preprocess(t, e) {
  var r = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : lib_1(t),
      a = new TokenizerEventHandlers(t, e).acceptNode(r);if (e && e.plugins && e.plugins.ast) for (var _t4 = 0, _r8 = e.plugins.ast.length; _t4 < _r8; _t4++) {
    traverse(a, (0, e.plugins.ast[_t4])(assign({}, e, { syntax: syntax }, { plugins: void 0 })).visitor);
  }return a;
}var es2017 = Object.freeze({ AST: nodes, preprocess: preprocess, builders: b, TraversalError: TraversalError, cannotRemoveNode: cannotRemoveNode, cannotReplaceNode: cannotReplaceNode, cannotReplaceOrRemoveInKeyHandlerYet: cannotReplaceOrRemoveInKeyHandlerYet, traverse: traverse, Walker: Walker, print: build, SyntaxError: SyntaxError$1, isLiteral: isLiteral$1, printLiteral: printLiteral });function removeEmptyNodes(t) {
  return "TextNode" !== t.type || "TextNode" === t.type && "" !== t.chars.replace(/^\s+/, "").replace(/\s+$/, "");
}function removeWhiteSpace() {
  return { visitor: {
      Program: function Program(t) {
        t.body = t.body.filter(removeEmptyNodes);
      },
      ElementNode: function ElementNode(t) {
        t.children = t.children.filter(removeEmptyNodes);
      }
    } };
}function parse(t) {
  try {
    return (0, es2017.preprocess)(t, { plugins: { ast: [removeWhiteSpace] } });
  } catch (t) {
    var e = t.message.match(/on line (\d+)/);throw e ? parserCreateError(t.message, { start: { line: +e[1], column: 0 }, end: { line: +e[1], column: 80 } }) : t;
  }
}var parserGlimmer = parse;module.exports = parserGlimmer;
});

var parserGlimmer = unwrapExports(parserGlimmer_1);

return parserGlimmer;

}(fs));
