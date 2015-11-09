/**
 * A Consumer
 */
var Consumer = function( options ) {
  options = options || {};

  this.name = options.name ? options.name : undefined;
  this.itemsPerTick = options.itemsPerTick ? options.itemsPerTick : undefined;
  this.incomePerItem = options.incomePerItem ? options.incomePerItem : undefined;
  this.wastePerItem = options.wastePerItem ? options.wastePerItem : undefined;
  this.type = options.type ? options.type : undefined;

  this.GetName = function() {
    return this.name;
  };

  this.GetItemsPerTick = function() {
    return this.itemsPerTick;
  };

  this.GetIncomePerItem = function() {
    return this.incomePerItem;
  };

  this.GetWastePerItem = function() {
    return this.wastePerItem;
  };

  this.GetType = function() {
    return this.type;
  };

};

module.exports = Consumer;
