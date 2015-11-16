/**
 * A Factory that makes Users
 */
var User = function( name, options ) {
  this.name = name;
  this.quarterLog = options.quarterLog ? options.quarterLog : [];
  this.factories = options.factories ? options.factories : [];
  this.materials = options.materials ? options.materials : [];
  this.consumers = options.consumers ? options.consumers : [];
  this.totalIncome = options.totalIncome ? options.totalIncome : 0;
  this.totalWaste = options.totalWaste ? options.totalWaste : 0;
};
module.exports = User;
