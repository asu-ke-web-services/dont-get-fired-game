(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;

/* Package-scope variables */
var NpmModuleMongodb, NpmModuleMongodbVersion;

(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// packages/npm-mongo/wrapper.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
NpmModuleMongodb = Npm.require('mongodb');                             // 1
NpmModuleMongodbVersion = Npm.require('mongodb/package.json').version;
                                                                       // 3
/////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['npm-mongo'] = {}, {
  NpmModuleMongodb: NpmModuleMongodb,
  NpmModuleMongodbVersion: NpmModuleMongodbVersion
});

})();

//# sourceMappingURL=npm-mongo.js.map
