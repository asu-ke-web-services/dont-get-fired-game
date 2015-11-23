/**
 * A product
 */
var Product = function( name, setupCost, regMaterialTypes, totalMaterialsNeeded, totalOutput ) {
  this.name = name;
  this.setupCost = setupCost;
  this.regMaterialTypes =  regMaterialTypes;
  this.totalMaterialsNeeded =  totalMaterialsNeeded;
  this.totalOutput =  totalOutput;
};
module.exports = Product;
