/**
 * A Factory
 */
var Factory = function( options ) {
  options = options || {};

  this.name = options.name ? options.name : undefined;
  this.product = options.product ? options.product : undefined;
  this.material = options.material ? options.material : undefined;
  this.consumer = options.consumer ? options.consumer : undefined;
  this.costPerTick = options.costPerTick ? options.costPerTick : undefined;
  this.wastePerTick = options.wastePerTick ? options.wastePerTick : undefined;

  this.GetName = function() {
    return this.name;
  };

  this.GetProduct = function() {
    return this.product;
  };

  this.GetMaterial = function() {
    return this.material;
  };

  this.GetConsumer = function() {
    return this.consumer;
  };

  this.GetCostPerTick = function() {
    return this.costPerTick;
  };

  this.GetWastePerTick = function() {
    return this.wastePerTick;
  };
};

module.exports = Factory;
