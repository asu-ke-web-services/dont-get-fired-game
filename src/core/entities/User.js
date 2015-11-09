/**
 * A User
 */
var User = function( options ) {
  options = options || {};

  this.name = options.name ? options.name : '';
  this.wastes = options.waste ? options.waste : null;
  this.factorys = options.factorys ? options.factorys : null;
  this.productions = options.production ? options.production : null;
  this.time = options.time ? options.time : 0;

  this.GetName = function() {
    return this.name;
  };

  this.GetWaste = function() {
    return this.waste;
  };

  this.GetFactorys = function() {
    return this.factorys;
  };

  this.GetProduction = function() {
    return this.production;
  };

  this.GetTime = function() {
    return this.time;
  };

};

module.exports = User;
