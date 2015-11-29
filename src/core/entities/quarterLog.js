var QuarterLog = function( paid, itemsMade, itemsSold,
                           storePaid, storeWaste, factoryWaste ) {
  this.paid = paid;
  this.itemsMade = itemsMade;
  this.itemsSold = itemsSold;
  this.storePaid = storePaid;
  this.storeWaste = storeWaste;
  this.factoryWaste = factoryWaste;

};
module.exports = QuarterLog;
