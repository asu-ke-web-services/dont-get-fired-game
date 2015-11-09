/**
 * A Material
 */
var Material = function( options ) {
  options = options || {};
  this.costPerTick = options.costPerTick ? options.costPerTick : null;
  this.wastePerTick = options.wastePerTick ? options.wastePerTick : null;
  this.name = options.name ? options.name : null;
  this.type = options.type ? options.type : null;

  this.GetCostPerTick = function()
  {
    return this.buildingID;
  };

  this.GetWastePerTick = function()
  {
    return this.typeOfBuilding;
  };

  this.GetAmount = function()
  {
    return this.amount;
  };

  this.GetType = function() {
    return this.type;
  };

};

module.exports = Material;
