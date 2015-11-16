/**
 * A Factory that makes QuarterLogs
 */
var count = 0;
var QuarterLog = function( totalItemsSold, totalConsumerPaid, totalWaste, totalIncome ) {
  this.totalItemsSold = totalItemsSold;
  this.totalConsumerPaid = totalConsumerPaid;
  this.totalWaste = totalWaste;
  this.totalIncome = totalIncome;
  this.id = 'QuarterLog' + count;
};
module.exports = QuarterLogFactory;
