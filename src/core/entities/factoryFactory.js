/**
 * A Factory that makes factories
 */
var count = 0;
var create = function( options )
{
    count++;
    this.name = name;
    this.product =  options.product ? options.product : null;
    this.material =  options.material ? options.material : null;
    this.consumer =  options.consumer ? options.consumer : null;
    this.totalInventory =  options.totalInventory ? options.material : 0;
    this.id = "Factory" + count;
};
module.exports = ConsumerFactory;
