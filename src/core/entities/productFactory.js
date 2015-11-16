/**
 * A Factory that makes Products
 */
var countProduct = 0;
var Product = function( name, setupCost, regMaterialTypes, totalMaterialsNeeded, totalOuput ) {
  countProduct++;
  this.name = name;
  this.setupCost =  setupCost;
  this.regMaterialTypes =  regMaterialTypes;
  this.totalMaterialsNeeded =  totalMaterialsNeeded;
  this.totalOuput =  totalOuput;
  this.id = 'Product' + countProduct;
};
module.exports = Product;
