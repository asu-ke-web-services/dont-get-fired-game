/**
 * Product
 */
var Product = function( options ) {
  options = options || {};
  this.productName = options.productName ? options.productName : '';
  this.setupCost = options.setupCost ? options.setupCost : '';
  this.requiredMaterials = options.requiredMaterials ? options.requiredMaterials : '';
  this.totalWastes = options.totalWastes ? options.totalWastes : '';
  this.totalOutput = options.totalOutput ? options.totalOutput : '';
};
module.exports = Product;

