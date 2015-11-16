/**
 * A Factory that makes QuarterLogs
 */
var countQuarterLog = 0;
var QuarterLog = function( totalItemsSold, totalConsumerPaid, totalWaste, totalIncome ) {
  countQuarterLog++;
  this.totalItemsSold = totalItemsSold;
  this.totalConsumerPaid = totalConsumerPaid;
  this.totalWaste = totalWaste;
  this.totalIncome = totalIncome;
  this.id = 'QuarterLog' + countQuarterLog;
};
module.exports = QuarterLog;
