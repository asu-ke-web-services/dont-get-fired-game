/**
 * A Factory that makes consumers
 */
var count = 0;
var create = function( name, regProduct, incomePerItem, wastePerItem, baseBuyRate )
{
  count++;
  this.name = name;
  this.regProduct = regProduct;
  this.incomePerItem = incomePerItem ;
  this.incomePerItem = wastePerItem ;
  this.incomePerItem = baseBuyRate ;
  this.id = "Consumer" + count;
};
module.exports = ConsumerFactory;
