//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var regeneratorRuntime = Package['ecmascript-runtime'].regeneratorRuntime;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var dispatch, dispatchAsync, callback;

var require = meteorInstall({"node_modules":{"meteor":{"capsulecat:commands":{"src":{"dispatch.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/capsulecat_commands/src/dispatch.js                                                  //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
dispatch = function (commandClass) {                                                             // 1
  var args = Array.prototype.slice.call(arguments);                                              // 2
  args = args.slice(1);                                                                          // 3
  var command = new (babelHelpers.bind.apply(commandClass, [null].concat(args)))();              // 4
                                                                                                 //
  return command.handle();                                                                       // 6
};                                                                                               //
                                                                                                 //
dispatchAsync = function (commandClass) {                                                        // 9
  var args = Array.prototype.slice.call(arguments);                                              // 10
  args = args.slice(1);                                                                          // 11
  callback = null;                                                                               // 12
                                                                                                 //
  if (typeof args[args.length - 1] === 'function') callback = args.slice(args.length - 1, 1)[0];
                                                                                                 //
  setTimeout(function () {                                                                       // 17
    var command = new (babelHelpers.bind.apply(commandClass, [null].concat(args)))();            // 18
    var result = command.handle();                                                               // 19
                                                                                                 //
    if (callback) callback(result);                                                              // 21
  }, 0);                                                                                         //
};                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}});
require("./node_modules/meteor/capsulecat:commands/src/dispatch.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['capsulecat:commands'] = {}, {
  dispatch: dispatch,
  dispatchAsync: dispatchAsync
});

})();
