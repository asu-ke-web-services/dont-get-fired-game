(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var Babel = Package['babel-compiler'].Babel;
var BabelCompiler = Package['babel-compiler'].BabelCompiler;

/* Package-scope variables */
var ECMAScript;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ecmascript/ecmascript.js                                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
ECMAScript = {                                                                                      // 1
  compileForShell: function (command) {                                                             // 2
    var babelOptions = Babel.getDefaultOptions({ asyncAwait: true });                               // 3
    babelOptions.sourceMap = false;                                                                 // 4
    babelOptions.ast = false;                                                                       // 5
    babelOptions.externalHelpers = true;                                                            // 6
    return Babel.compile(command, babelOptions).code;                                               // 7
  }                                                                                                 //
};                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.ecmascript = {}, {
  ECMAScript: ECMAScript
});

})();

//# sourceMappingURL=ecmascript.js.map
