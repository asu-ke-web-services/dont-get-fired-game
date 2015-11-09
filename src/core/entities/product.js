/**
 * Product
 */
var Product = function( options ) {
  options = options || {};
  this.name = options.name ? options.name : '';
};
module.exports = Product;
