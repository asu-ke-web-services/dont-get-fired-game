/**
 * A Factory that makes Materials
 */
var count = 0;
var create = function( name, wastePerLb, costPerLb) {
  count++;
  this.name = name;
  this.wastePerLb = wastePerLb;
  this.costPerLb = costPerLb ;
  this.id = "Material" + count;
};
module.exports = MaterialFactory;
