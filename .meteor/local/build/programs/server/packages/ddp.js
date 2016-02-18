(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;

/* Package-scope variables */
var DDP, DDPServer;



/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.ddp = {}, {
  DDP: DDP,
  DDPServer: DDPServer
});

})();

//# sourceMappingURL=ddp.js.map
