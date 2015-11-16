/**
 * A Factory that makes Products
 */
var count = 0;
var create = function( name, setupCost, regMaterialTypes, totalMaterialsNeeded, totalOuput ) {
  count++;
  this.name = name;
  this.setupCost =  setupCost;
  this.regMaterialTypes =  regMaterialTypes;
  this.totalMaterialsNeeded =  totalMaterialsNeeded;
  this.totalOuput =  totalOuput;
  this.id = "Product" + count;
};
module.exports = ProductFactory;
