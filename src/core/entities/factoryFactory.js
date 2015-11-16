/**
 * A Factory that makes Factories
 */
var countFactory = 0;
var Factory = function( name, options )
{
  countFactory++;
  this.name = name;
  this.product =  options.product ? options.product : null;
  this.material =  options.material ? options.material : null;
  this.consumer =  options.consumer ? options.consumer : null;
  this.totalInventory =  options.totalInventory ? options.material : 0;
  this.id = 'Factory' + countFactory;
};
module.exports = Factory;
