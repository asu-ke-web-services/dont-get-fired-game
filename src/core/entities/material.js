/**
 * Materials
 */
var Material = function( options ) {
  options = options || {};
  this.materialName = options.materialName ? options.materialName : '';
  this.cost = options.cost ? options.cost : '';
  this.wastes = options.wastes ? options.wastes : '';
};
module.exports = Material;

