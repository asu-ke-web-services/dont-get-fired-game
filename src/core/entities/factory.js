var Factory = function( name, options )
{
  options = options || {};
  this.name = name;
  this.product =  options.product ? options.product : null;
  this.material =  options.material ? options.material : null;
  this.consumer =  options.consumer ? options.consumer : null;
  this.totalInventory =  options.totalInventory ? options.totalInventory : 0;
};
module.exports = Factory;
