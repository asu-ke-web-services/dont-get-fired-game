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

/* Package-scope variables */
var Util;

(function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/meteorspark_util/packages/meteorspark_util.js                   //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
(function () {                                                              // 1
                                                                            // 2
////////////////////////////////////////////////////////////////////////    // 3
//                                                                    //    // 4
// packages/meteorspark:util/lib/util-client.js                       //    // 5
//                                                                    //    // 6
////////////////////////////////////////////////////////////////////////    // 7
                                                                      //    // 8
// https://github.com/isaacs/inherits/blob/master/inherits_browser.js // 1  // 9
Util = {}                                                             // 2  // 10
if (typeof Object.create === 'function') {                            // 3  // 11
  // implementation from standard node.js 'util' module               // 4  // 12
  Util.inherits = function (ctor, superCtor) {                        // 5  // 13
    ctor.super_ = superCtor                                           // 6  // 14
    ctor.prototype = Object.create(superCtor.prototype, {             // 7  // 15
      constructor: {                                                  // 8  // 16
        value: ctor,                                                  // 9  // 17
        enumerable: false,                                            // 10
        writable: true,                                               // 11
        configurable: true                                            // 12
      }                                                               // 13
    });                                                               // 14
  };                                                                  // 15
} else {                                                              // 16
  // old school shim for old browsers                                 // 17
  Util.inherits = function (ctor, superCtor) {                        // 18
    ctor.super_ = superCtor                                           // 19
    var TempCtor = function () {}                                     // 20
    TempCtor.prototype = superCtor.prototype                          // 21
    ctor.prototype = new TempCtor()                                   // 22
    ctor.prototype.constructor = ctor                                 // 23
  }                                                                   // 24
}                                                                     // 25
                                                                      // 26
////////////////////////////////////////////////////////////////////////    // 35
                                                                            // 36
}).call(this);                                                              // 37
                                                                            // 38
//////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['meteorspark:util'] = {}, {
  Util: Util
});

})();
