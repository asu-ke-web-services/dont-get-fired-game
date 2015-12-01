/**
 * A product
 */
var Product = function( name, setupCost, materialDependency, totalOutput ) {
  this.name = name;
  this.setupCost = setupCost;
  this.materialDependency = materialDependency;
  this.totalOutput = totalOutput;
};

module.exports = Product;
