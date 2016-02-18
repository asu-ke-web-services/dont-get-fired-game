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
var _ = Package.underscore._;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/webapp/webapp_client.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
WebApp = {                                                                                                           // 1
                                                                                                                     // 2
  _isCssLoaded: function () {                                                                                        // 3
    if (document.styleSheets.length === 0)                                                                           // 4
      return true;                                                                                                   // 5
                                                                                                                     // 6
    return _.find(document.styleSheets, function (sheet) {                                                           // 7
      if (sheet.cssText && !sheet.cssRules) // IE8                                                                   // 8
        return !sheet.cssText.match(/meteor-css-not-found-error/);                                                   // 9
      return !_.find(sheet.cssRules, function (rule) {                                                               // 10
        return rule.selectorText === '.meteor-css-not-found-error';                                                  // 11
      });                                                                                                            // 12
    });                                                                                                              // 13
  }                                                                                                                  // 14
};                                                                                                                   // 15
                                                                                                                     // 16
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.webapp = {}, {
  WebApp: WebApp
});

})();
