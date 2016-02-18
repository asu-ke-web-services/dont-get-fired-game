(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var _ = Package.underscore._;

/* Package-scope variables */
var EventEmitter;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/raix_eventemitter/packages/raix_eventemitter.js               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {                                                            // 1
                                                                          // 2
///////////////////////////////////////////////////////////////////////   // 3
//                                                                   //   // 4
// packages/raix:eventemitter/eventemitter.server.js                 //   // 5
//                                                                   //   // 6
///////////////////////////////////////////////////////////////////////   // 7
                                                                     //   // 8
/* global EventEmitter: true */                                      // 1
EventEmitter = Npm.require('events').EventEmitter;                   // 2
                                                                     // 3
///////////////////////////////////////////////////////////////////////   // 12
                                                                          // 13
}).call(this);                                                            // 14
                                                                          // 15
////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['raix:eventemitter'] = {}, {
  EventEmitter: EventEmitter
});

})();

//# sourceMappingURL=raix_eventemitter.js.map
