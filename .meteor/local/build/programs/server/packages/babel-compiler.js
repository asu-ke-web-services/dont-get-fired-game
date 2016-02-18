(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var Babel, BabelCompiler;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/babel-compiler/babel.js                                                       //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
var meteorBabel = Npm.require('meteor-babel');                                            // 1
                                                                                          // 2
function validateExtraFeatures(extraFeatures) {                                           // 3
  if (extraFeatures) {                                                                    // 4
    check(extraFeatures, {                                                                // 5
      // Modify options to enable ES2015 module syntax.                                   // 6
      modules: Match.Optional(Boolean),                                                   // 7
      // Modify options to enable async/await syntax powered by Fibers.                   // 8
      meteorAsyncAwait: Match.Optional(Boolean),                                          // 9
      // Modify options to enable async/await syntax powered by Promises and Regenerator.
      asyncAwait: Match.Optional(Boolean),                                                // 11
      // Modify options to enable React/JSX syntax.                                       // 12
      react: Match.Optional(Boolean),                                                     // 13
      // Improve compatibility in older versions of Internet Explorer.                    // 14
      jscript: Match.Optional(Boolean)                                                    // 15
    });                                                                                   // 16
  }                                                                                       // 17
}                                                                                         // 18
                                                                                          // 19
/**                                                                                       // 20
 * Returns a new object containing default options appropriate for                        // 21
 */                                                                                       // 22
function getDefaultOptions(extraFeatures) {                                               // 23
  validateExtraFeatures(extraFeatures);                                                   // 24
                                                                                          // 25
  // See https://github.com/meteor/babel/blob/master/options.js for more                  // 26
  // information about what the default options are.                                      // 27
  var options = meteorBabel.getDefaultOptions(extraFeatures);                             // 28
                                                                                          // 29
  // The sourceMap option should probably be removed from the default                     // 30
  // options returned by meteorBabel.getDefaultOptions.                                   // 31
  delete options.sourceMap;                                                               // 32
                                                                                          // 33
  return options;                                                                         // 34
}                                                                                         // 35
                                                                                          // 36
Babel = {                                                                                 // 37
  getDefaultOptions: getDefaultOptions,                                                   // 38
                                                                                          // 39
  validateExtraFeatures: validateExtraFeatures,                                           // 40
                                                                                          // 41
  compile: function (source, options) {                                                   // 42
    options = options || getDefaultOptions();                                             // 43
    return meteorBabel.compile(source, options);                                          // 44
  },                                                                                      // 45
                                                                                          // 46
  // Provided for backwards compatibility; prefer Babel.compile.                          // 47
  transformMeteor: function (source, extraOptions) {                                      // 48
    var options = getDefaultOptions();                                                    // 49
                                                                                          // 50
    if (extraOptions) {                                                                   // 51
      if (extraOptions.extraWhitelist) {                                                  // 52
        options.whitelist.push.apply(                                                     // 53
          options.whitelist,                                                              // 54
          extraOptions.extraWhitelist                                                     // 55
        );                                                                                // 56
      }                                                                                   // 57
                                                                                          // 58
      for (var key in extraOptions) {                                                     // 59
        if (key !== "extraWhitelist" &&                                                   // 60
            hasOwnProperty.call(extraOptions, key)) {                                     // 61
          options[key] = extraOptions[key];                                               // 62
        }                                                                                 // 63
      }                                                                                   // 64
    }                                                                                     // 65
                                                                                          // 66
    return meteorBabel.compile(source, options);                                          // 67
  },                                                                                      // 68
                                                                                          // 69
  setCacheDir: function (cacheDir) {                                                      // 70
    meteorBabel.setCacheDir(cacheDir);                                                    // 71
  }                                                                                       // 72
};                                                                                        // 73
                                                                                          // 74
////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages/babel-compiler/babel-compiler.js                                              //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
/**                                                                                       // 1
 * A compiler that can be instantiated with features and used inside                      // 2
 * Plugin.registerCompiler                                                                // 3
 * @param {Object} extraFeatures The same object that getDefaultOptions takes             // 4
 */                                                                                       // 5
BabelCompiler = function BabelCompiler(extraFeatures) {                                   // 6
  Babel.validateExtraFeatures(extraFeatures);                                             // 7
  this.extraFeatures = extraFeatures;                                                     // 8
};                                                                                        // 9
                                                                                          // 10
var BCp = BabelCompiler.prototype;                                                        // 11
var excludedFileExtensionPattern = /\.es5\.js$/i;                                         // 12
                                                                                          // 13
BCp.processFilesForTarget = function (inputFiles) {                                       // 14
  var self = this;                                                                        // 15
                                                                                          // 16
  inputFiles.forEach(function (inputFile) {                                               // 17
    var source = inputFile.getContentsAsString();                                         // 18
    var packageName = inputFile.getPackageName();                                         // 19
    var inputFilePath = inputFile.getPathInPackage();                                     // 20
    var outputFilePath = inputFilePath;                                                   // 21
    var fileOptions = inputFile.getFileOptions();                                         // 22
    var toBeAdded = {                                                                     // 23
      sourcePath: inputFilePath,                                                          // 24
      path: outputFilePath,                                                               // 25
      data: source,                                                                       // 26
      hash: inputFile.getSourceHash(),                                                    // 27
      sourceMap: null,                                                                    // 28
      bare: !! fileOptions.bare                                                           // 29
    };                                                                                    // 30
                                                                                          // 31
    // If you need to exclude a specific file within a package from Babel                 // 32
    // compilation, pass the { transpile: false } options to api.addFiles                 // 33
    // when you add that file.                                                            // 34
    if (fileOptions.transpile !== false &&                                                // 35
        // If you need to exclude a specific file within an app from Babel                // 36
        // compilation, give it the following file extension: .es5.js                     // 37
        ! excludedFileExtensionPattern.test(inputFilePath)) {                             // 38
                                                                                          // 39
      var targetCouldBeInternetExplorer8 =                                                // 40
        inputFile.getArch() === "web.browser";                                            // 41
                                                                                          // 42
      self.extraFeatures = self.extraFeatures || {};                                      // 43
      if (! self.extraFeatures.hasOwnProperty("jscript")) {                               // 44
        // Perform some additional transformations to improve                             // 45
        // compatibility in older browsers (e.g. wrapping named function                  // 46
        // expressions, per http://kiro.me/blog/nfe_dilemma.html).                        // 47
        self.extraFeatures.jscript = targetCouldBeInternetExplorer8;                      // 48
      }                                                                                   // 49
                                                                                          // 50
      var babelOptions = Babel.getDefaultOptions(self.extraFeatures);                     // 51
                                                                                          // 52
      babelOptions.sourceMap = true;                                                      // 53
      babelOptions.filename =                                                             // 54
      babelOptions.sourceFileName = packageName                                           // 55
        ? "/packages/" + packageName + "/" + inputFilePath                                // 56
        : "/" + inputFilePath;                                                            // 57
                                                                                          // 58
      babelOptions.sourceMapName = babelOptions.filename + ".map";                        // 59
                                                                                          // 60
      try {                                                                               // 61
        var result = Babel.compile(source, babelOptions);                                 // 62
      } catch (e) {                                                                       // 63
        if (e.loc) {                                                                      // 64
          inputFile.error({                                                               // 65
            message: e.message,                                                           // 66
            line: e.loc.line,                                                             // 67
            column: e.loc.column,                                                         // 68
          });                                                                             // 69
                                                                                          // 70
          return;                                                                         // 71
        }                                                                                 // 72
                                                                                          // 73
        throw e;                                                                          // 74
      }                                                                                   // 75
                                                                                          // 76
      toBeAdded.data = result.code;                                                       // 77
      toBeAdded.hash = result.hash;                                                       // 78
      toBeAdded.sourceMap = result.map;                                                   // 79
    }                                                                                     // 80
                                                                                          // 81
    inputFile.addJavaScript(toBeAdded);                                                   // 82
  });                                                                                     // 83
};                                                                                        // 84
                                                                                          // 85
BCp.setDiskCacheDirectory = function (cacheDir) {                                         // 86
  Babel.setCacheDir(cacheDir);                                                            // 87
};                                                                                        // 88
                                                                                          // 89
////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['babel-compiler'] = {}, {
  Babel: Babel,
  BabelCompiler: BabelCompiler
});

})();

//# sourceMappingURL=babel-compiler.js.map
