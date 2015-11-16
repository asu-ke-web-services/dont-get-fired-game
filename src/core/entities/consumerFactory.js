/**
 * A Factory that makes consumers
 */
var countConsumer = 0;
var Consumer = function( name, regProduct, incomePerItem, wastePerItem, baseBuyRate )
{
  countConsumer++;
  this.name = name;
  this.regProduct = regProduct;
  this.incomePerItem = incomePerItem ;
  this.wastePerItem = wastePerItem ;
  this.baseBuyRate = baseBuyRate ;
  this.id = 'Consumer' + countConsumer;
};
module.exports = Consumer;

