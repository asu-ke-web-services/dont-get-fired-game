var User = function( name, options ) {
  options = options || {};

  this.name = name;
  this.quarterLog = options.quarterLog || [];
  this.factories = options.factories || [];
  this.materials = options.materials || [];
  this.consumers = options.consumers || [];
  this.totalIncome = options.totalIncome || 0;
  this.totalWaste = options.totalWaste || 0;
};

module.exports = User;
