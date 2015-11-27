/**
 * A Factory
 */
var Factory = function( name, options ) {
  options = options || {};

  this.name = name;
  this.product = options.product || null;
  this.material = options.material || null;
  this.store = options.store || null;
  this.totalInventory = options.totalInventory || 0;

  this.getCostOfProduct()
  {
    if(this.material != null && this.product != null){
      return this.material.costPerPound * this.product.materialDependency.amount;
    }
    else {
      return false;
    }

  };

};

module.exports = Factory;
