/**
 * A Factory that makes Materials
 */
var countMaterial = 0;
var Material = function( name, wastePerLb, costPerLb ) {
  countMaterial++;
  this.name = name;
  this.wastePerLb = wastePerLb;
  this.costPerLb = costPerLb ;
  this.id = 'Material' + countMaterial;
};
module.exports = Material;
