/**
 * A product
 */
var Product = function( name, setupCost, materialDependencies, totalOutput ) {
  this.name = name;
  this.setupCost = setupCost;
  this.materialDependencies = requiredMaterialTypes || [];
  this.totalOutput = totalOutput;
};

module.exports = Product;
