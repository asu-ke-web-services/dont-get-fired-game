/**
 * A Product
 */
var Product = function( options ) {
  options = options || {};

  this.name = options.name ? options.name : undefined;
  this.cost = options.cost ? options.cost : undefined;

  this.GetProduct = function() {
    return this;
  };

  this.GetProductName = function() {
    return this.name;
  };

  this.GetCost = function() {
    return this.cost;
  };

};

module.exports = Product;
