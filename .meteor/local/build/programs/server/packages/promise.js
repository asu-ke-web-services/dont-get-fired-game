(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;

/* Package-scope variables */
var Promise;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/promise/promise_server.js                                     //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
var MeteorPromise = Npm.require("meteor-promise");                        // 1
// Define MeteorPromise.Fiber so that every Promise callback can run in a
// Fiber drawn from a pool of reusable Fibers.                            // 3
MeteorPromise.Fiber = Npm.require("fibers");                              // 4
Promise = MeteorPromise;                                                  // 5
                                                                          // 6
////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.promise = {}, {
  Promise: Promise
});

})();

//# sourceMappingURL=promise.js.map
