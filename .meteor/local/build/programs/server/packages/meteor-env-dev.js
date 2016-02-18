(function () {

/* Package-scope variables */
var process;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteor-env-dev/env.js                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
if (typeof global === "object" && global.process) {                  // 1
  // We're on the server                                             // 2
  process = global.process;                                          // 3
} else {                                                             // 4
  if (typeof process !== "object") {                                 // 5
    process = {};                                                    // 6
  }                                                                  // 7
                                                                     // 8
  if (typeof process.env !== "object") {                             // 9
    process.env = {};                                                // 10
  }                                                                  // 11
                                                                     // 12
  if (typeof process.env.NODE_ENV !== "string") {                    // 13
    process.env.NODE_ENV = "development";                            // 14
  }                                                                  // 15
}                                                                    // 16
                                                                     // 17
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['meteor-env-dev'] = {}, {
  process: process
});

})();

//# sourceMappingURL=meteor-env-dev.js.map
