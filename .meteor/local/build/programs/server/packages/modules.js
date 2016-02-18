(function () {

/* Package-scope variables */
var makeInstaller, meteorInstall;

(function(){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/modules/.npm/package/node_modules/install/install.js               //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
makeInstaller = function (options) {                                           // 1
  options = options || {};                                                     // 2
                                                                               // 3
  // These file extensions will be appended to required module identifiers     // 4
  // if they do not exactly match an installed module.                         // 5
  var extensions = options.extensions || [".js", ".json"];                     // 6
                                                                               // 7
  // This constructor will be used to instantiate the module objects           // 8
  // passed to module factory functions (i.e. the third argument after         // 9
  // require and exports).                                                     // 10
  var Module = options.Module || function Module(id, parent) {                 // 11
    this.id = id;                                                              // 12
    this.parent = parent;                                                      // 13
  };                                                                           // 14
                                                                               // 15
  // If defined, the options.onInstall function will be called any time        // 16
  // new modules are installed.                                                // 17
  var onInstall = options.onInstall;                                           // 18
                                                                               // 19
  // If defined, the options.fallback function will be called when no          // 20
  // installed module is found for a required module identifier. Often         // 21
  // options.fallback will be implemented in terms of the native Node          // 22
  // require function, which has the ability to load binary modules.           // 23
  var fallback = options.fallback;                                             // 24
                                                                               // 25
  // Whenever a new require function is created in the makeRequire             // 26
  // function below, any methods contained by options.requireMethods will      // 27
  // be bound and attached as methods to that function object. This option     // 28
  // is intended to support user-defined require.* extensions like             // 29
  // require.ensure and require.promise.                                       // 30
  var requireMethods = options.requireMethods;                                 // 31
                                                                               // 32
  // Sentinel returned by fileEvaluate when module resolution fails.           // 33
  var MISSING = {};                                                            // 34
                                                                               // 35
  // Nothing special about MISSING.hasOwnProperty, except that it's fewer      // 36
  // characters than Object.prototype.hasOwnProperty after minification.       // 37
  var hasOwn = MISSING.hasOwnProperty;                                         // 38
                                                                               // 39
  // The file object representing the root directory of the installed          // 40
  // module tree.                                                              // 41
  var root = new File({});                                                     // 42
                                                                               // 43
  // Merges the given tree of directories and module factory functions         // 44
  // into the tree of installed modules and returns a require function         // 45
  // that behaves as if called from a module in the root directory.            // 46
  function install(tree) {                                                     // 47
    if (isObject(tree)) {                                                      // 48
      fileMergeContents(root, tree);                                           // 49
      if (isFunction(onInstall)) {                                             // 50
        onInstall(root.r);                                                     // 51
      }                                                                        // 52
    }                                                                          // 53
    return root.r;                                                             // 54
  }                                                                            // 55
                                                                               // 56
  function getOwn(obj, key) {                                                  // 57
    return hasOwn.call(obj, key) && obj[key];                                  // 58
  }                                                                            // 59
                                                                               // 60
  function isObject(value) {                                                   // 61
    return value && typeof value === "object";                                 // 62
  }                                                                            // 63
                                                                               // 64
  function isFunction(value) {                                                 // 65
    return typeof value === "function";                                        // 66
  }                                                                            // 67
                                                                               // 68
  function isString(value) {                                                   // 69
    return typeof value === "string";                                          // 70
  }                                                                            // 71
                                                                               // 72
  function makeRequire(file) {                                                 // 73
    function require(id) {                                                     // 74
      var result = fileEvaluate(fileResolve(file, id));                        // 75
      if (result === MISSING) {                                                // 76
        var error = new Error("Cannot find module '" + id + "'");              // 77
        if (isFunction(fallback)) {                                            // 78
          result = fallback(                                                   // 79
            id, // The missing module identifier.                              // 80
            file.m.id, // The path of the enclosing directory.                 // 81
            error // The error we would have thrown.                           // 82
          );                                                                   // 83
        } else throw error;                                                    // 84
      }                                                                        // 85
      return result;                                                           // 86
    }                                                                          // 87
                                                                               // 88
    // A function that immediately returns true iff all the transitive         // 89
    // dependencies of the module identified by id have been installed.        // 90
    // This function can be used with options.onInstall to implement           // 91
    // asynchronous module loading APIs like require.ensure.                   // 92
    require.ready = function (id) {                                            // 93
      return fileReady(fileResolve(file, id));                                 // 94
    };                                                                         // 95
                                                                               // 96
    if (requireMethods) {                                                      // 97
      Object.keys(requireMethods).forEach(function (name) {                    // 98
        if (isFunction(requireMethods[name])) {                                // 99
          require[name] = requireMethods[name].bind(require);                  // 100
        }                                                                      // 101
      });                                                                      // 102
    }                                                                          // 103
                                                                               // 104
    return require;                                                            // 105
  }                                                                            // 106
                                                                               // 107
  // File objects represent either directories or modules that have been       // 108
  // installed. When a `File` respresents a directory, its `.c` (contents)     // 109
  // property is an object containing the names of the files (or               // 110
  // directories) that it contains. When a `File` represents a module, its     // 111
  // `.c` property is a function that can be invoked with the appropriate      // 112
  // `(require, exports, module)` arguments to evaluate the module. The        // 113
  // `.p` (parent) property of a File is either a directory `File` or          // 114
  // `null`. Note that a child may claim another `File` as its parent even     // 115
  // if the parent does not have an entry for that child in its `.c`           // 116
  // object.  This is important for implementing anonymous files, and          // 117
  // preventing child modules from using `../relative/identifier` syntax       // 118
  // to examine unrelated modules.                                             // 119
  function File(contents, /*optional:*/ parent, name) {                        // 120
    var file = this;                                                           // 121
                                                                               // 122
    // Link to the parent file.                                                // 123
    file.p = parent = parent || null;                                          // 124
                                                                               // 125
    // The module object for this File, which will eventually boast an         // 126
    // .exports property when/if the file is evaluated.                        // 127
    file.m = new Module(                                                       // 128
      // If this file was created with `name`, join it with `parent.m.id`      // 129
      // to generate a module identifier.                                      // 130
      name ? (parent && parent.m.id || "") + "/" + name : null,                // 131
      parent && parent.m                                                       // 132
    );                                                                         // 133
                                                                               // 134
    // Queue for tracking required modules with unmet dependencies,            // 135
    // inherited from the `parent`.                                            // 136
    file.q = parent && parent.q;                                               // 137
                                                                               // 138
    // Each directory has its own bound version of the `require` function      // 139
    // that can resolve relative identifiers. Non-directory Files inherit      // 140
    // the require function of their parent directories, so we don't have      // 141
    // to create a new require function every time we evaluate a module.       // 142
    file.r = isObject(contents)                                                // 143
      ? makeRequire(file)                                                      // 144
      : parent && parent.r;                                                    // 145
                                                                               // 146
    // Set the initial value of `file.c` (the "contents" of the File).         // 147
    fileMergeContents(file, contents);                                         // 148
                                                                               // 149
    // When the file is a directory, `file.ready` is an object mapping         // 150
    // module identifiers to boolean ready statuses. This information can      // 151
    // be shared by all files in the directory, because module resolution      // 152
    // always has the same results for all files in a given directory.         // 153
    file.ready = fileIsDirectory(file) && {};                                  // 154
  }                                                                            // 155
                                                                               // 156
  // A file is ready if all of its dependencies are installed and ready.       // 157
  function fileReady(file) {                                                   // 158
    var result = !! file;                                                      // 159
    var factory = file && file.c;                                              // 160
    var deps = isFunction(factory) && factory.d;                               // 161
    if (deps && ! getOwn(factory, "seen")) {                                   // 162
      factory.seen = true;                                                     // 163
      var parentReadyCache = file.p.ready;                                     // 164
      result = deps.every(function (dep) {                                     // 165
        // By storing the results of these lookups in `parentReadyCache`,      // 166
        // we benefit when any other file in the same directory resolves       // 167
        // the same identifier.                                                // 168
        return parentReadyCache[dep] =                                         // 169
          parentReadyCache[dep] ||                                             // 170
          fileReady(fileResolve(file.p, dep));                                 // 171
      });                                                                      // 172
      factory.seen = false;                                                    // 173
    }                                                                          // 174
    return result;                                                             // 175
  }                                                                            // 176
                                                                               // 177
  function fileEvaluate(file) {                                                // 178
    var factory = file && file.c;                                              // 179
    if (isFunction(factory)) {                                                 // 180
      var module = file.m;                                                     // 181
      if (! hasOwn.call(module, "exports")) {                                  // 182
        factory(file.r, module.exports = {}, module);                          // 183
      }                                                                        // 184
      return module.exports;                                                   // 185
    }                                                                          // 186
    return MISSING;                                                            // 187
  }                                                                            // 188
                                                                               // 189
  function fileIsDirectory(file) {                                             // 190
    return isObject(file.c);                                                   // 191
  }                                                                            // 192
                                                                               // 193
  function fileMergeContents(file, contents) {                                 // 194
    // If contents is an array of strings and functions, return the last       // 195
    // function with a `.d` property containing all the strings.               // 196
    if (Array.isArray(contents)) {                                             // 197
      var deps = [];                                                           // 198
                                                                               // 199
      contents.forEach(function (item) {                                       // 200
        if (isString(item)) {                                                  // 201
          deps.push(item);                                                     // 202
        } else if (isFunction(item)) {                                         // 203
          contents = item;                                                     // 204
        }                                                                      // 205
      });                                                                      // 206
                                                                               // 207
      if (isFunction(contents)) {                                              // 208
        contents.d = deps;                                                     // 209
      } else {                                                                 // 210
        // If the array did not contain a function, merge nothing.             // 211
        contents = null;                                                       // 212
      }                                                                        // 213
                                                                               // 214
    } else if (isFunction(contents)) {                                         // 215
      // If contents is already a function, make sure it has `.d`.             // 216
      contents.d = contents.d || [];                                           // 217
                                                                               // 218
    } else if (! isObject(contents)) {                                         // 219
      // If contents is neither an array nor a function nor an object,         // 220
      // just give up and merge nothing.                                       // 221
      contents = null;                                                         // 222
    }                                                                          // 223
                                                                               // 224
    if (contents) {                                                            // 225
      var fileContents = file.c = file.c || (                                  // 226
        isFunction(contents) ? contents : {}                                   // 227
      );                                                                       // 228
                                                                               // 229
      if (isObject(contents) && fileIsDirectory(file)) {                       // 230
        Object.keys(contents).forEach(function (key) {                         // 231
          var child = getOwn(fileContents, key);                               // 232
          if (child) {                                                         // 233
            fileMergeContents(child, contents[key]);                           // 234
          } else {                                                             // 235
            fileContents[key] = new File(contents[key], file, key);            // 236
          }                                                                    // 237
        });                                                                    // 238
      }                                                                        // 239
    }                                                                          // 240
  }                                                                            // 241
                                                                               // 242
  function fileAppendIdPart(file, part, isLastPart) {                          // 243
    // Always append relative to a directory.                                  // 244
    while (file && ! fileIsDirectory(file)) {                                  // 245
      file = file.p;                                                           // 246
    }                                                                          // 247
                                                                               // 248
    if (! file || ! part || part === ".") {                                    // 249
      return file;                                                             // 250
    }                                                                          // 251
                                                                               // 252
    if (part === "..") {                                                       // 253
      return file.p;                                                           // 254
    }                                                                          // 255
                                                                               // 256
    var exactChild = getOwn(file.c, part);                                     // 257
                                                                               // 258
    // Only consider multiple file extensions if this part is the last         // 259
    // part of a module identifier and not equal to `.` or `..`, and there     // 260
    // was no exact match or the exact match was a directory.                  // 261
    if (isLastPart && (! exactChild || fileIsDirectory(exactChild))) {         // 262
      for (var e = 0; e < extensions.length; ++e) {                            // 263
        var child = getOwn(file.c, part + extensions[e]);                      // 264
        if (child) {                                                           // 265
          return child;                                                        // 266
        }                                                                      // 267
      }                                                                        // 268
    }                                                                          // 269
                                                                               // 270
    return exactChild;                                                         // 271
  }                                                                            // 272
                                                                               // 273
  function fileAppendId(file, id) {                                            // 274
    var parts = id.split("/");                                                 // 275
    // Use `Array.prototype.every` to terminate iteration early if             // 276
    // `fileAppendIdPart` returns a falsy value.                               // 277
    parts.every(function (part, i) {                                           // 278
      return file = fileAppendIdPart(file, part, i === parts.length - 1);      // 279
    });                                                                        // 280
    return file;                                                               // 281
  }                                                                            // 282
                                                                               // 283
  function fileResolve(file, id) {                                             // 284
    file =                                                                     // 285
      // Absolute module identifiers (i.e. those that begin with a `/`         // 286
      // character) are interpreted relative to the root directory, which      // 287
      // is a slight deviation from Node, which has access to the entire       // 288
      // file system.                                                          // 289
      id.charAt(0) === "/" ? fileAppendId(root, id) :                          // 290
      // Relative module identifiers are interpreted relative to the           // 291
      // current file, naturally.                                              // 292
      id.charAt(0) === "." ? fileAppendId(file, id) :                          // 293
      // Top-level module identifiers are interpreted as referring to          // 294
      // packages in `node_modules` directories.                               // 295
      nodeModulesLookup(file, id);                                             // 296
                                                                               // 297
    // If the identifier resolves to a directory, we use the same logic as     // 298
    // Node to find an `index.js` or `package.json` file to evaluate.          // 299
    while (file && fileIsDirectory(file)) {                                    // 300
      // If `package.json` does not exist, `fileEvaluate` will return the      // 301
      // `MISSING` object, which has no `.main` property.                      // 302
      var pkg = fileEvaluate(fileAppendIdPart(file, "package.json"));          // 303
      file = pkg && isString(pkg.main) &&                                      // 304
        fileAppendId(file, pkg.main) || // Might resolve to another directory!
        fileAppendIdPart(file, "index.js");                                    // 306
    }                                                                          // 307
                                                                               // 308
    return file;                                                               // 309
  };                                                                           // 310
                                                                               // 311
  function nodeModulesLookup(file, id) {                                       // 312
    return fileIsDirectory(file) &&                                            // 313
      fileAppendId(file, "node_modules/" + id) ||                              // 314
      (file.p && nodeModulesLookup(file.p, id));                               // 315
  }                                                                            // 316
                                                                               // 317
  return install;                                                              // 318
};                                                                             // 319
                                                                               // 320
if (typeof exports === "object") {                                             // 321
  exports.makeInstaller = makeInstaller;                                       // 322
}                                                                              // 323
                                                                               // 324
/////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/modules/modules.js                                                 //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
var options = {};                                                              // 1
var hasOwn = options.hasOwnProperty;                                           // 2
                                                                               // 3
// RegExp matching strings that don't start with a `.` or a `/`.               // 4
var topLevelIdPattern = /^[^./]/;                                              // 5
                                                                               // 6
// This function will be called whenever a module identifier that hasn't       // 7
// been installed is required. For backwards compatibility, and so that we     // 8
// can require binary dependencies on the server, we implement the             // 9
// fallback in terms of Npm.require.                                           // 10
options.fallback = function (id, dir, error) {                                 // 11
  // For simplicity, we honor only top-level module identifiers here.          // 12
  // We could try to honor relative and absolute module identifiers by         // 13
  // somehow combining `id` with `dir`, but we'd have to be really careful     // 14
  // that the resulting modules were located in a known directory (not         // 15
  // some arbitrary location on the file system), and we only really need      // 16
  // the fallback for dependencies installed in node_modules directories.      // 17
  if (topLevelIdPattern.test(id)) {                                            // 18
    var parts = id.split("/");                                                 // 19
    if (parts.length === 2 &&                                                  // 20
        parts[0] === "meteor" &&                                               // 21
        hasOwn.call(Package, parts[1])) {                                      // 22
      return Package[parts[1]];                                                // 23
    }                                                                          // 24
                                                                               // 25
    if (typeof Npm === "object" &&                                             // 26
        typeof Npm.require === "function") {                                   // 27
      return Npm.require(id);                                                  // 28
    }                                                                          // 29
  }                                                                            // 30
                                                                               // 31
  throw error;                                                                 // 32
};                                                                             // 33
                                                                               // 34
meteorInstall = makeInstaller(options);                                        // 35
                                                                               // 36
/////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.modules = {}, {
  meteorInstall: meteorInstall
});

})();

//# sourceMappingURL=modules.js.map
