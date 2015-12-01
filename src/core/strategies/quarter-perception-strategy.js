var QuarterPerceptionStrategy = function (lastQuarterLog) {
  var _wasteRate = .5;
  var _factoryRate = 0;
  var _storeRate = 0;
  var _totalRates = 0;

  var _between = function( wasteRate, min, max ) {
    return wasteRate >= min && wasteRate <= max;
  };

  var execute = function () {
    if ( lastQuarterLog.itemsMade != 0 ) {
      _factoryRate = ( lastQuarterLog.factoryWaste /  lastQuarterLog.itemsMade );
      _totalRates++;
    }

    if ( lastQuarterLog.itemsSold != 0 ) {
      _storeRate = ( lastQuarterLog.storeWaste /  lastQuarterLog.itemsSold );
      _totalRates++;
    }

    if ( _totalRates != 0 ) {
      _wasteRate = ( _factoryRate + _storeRate ) / 2;
    }

    console.log( 'Waste Rate:' +  _wasteRate );

    if ( _wasteRate === 0 )
    {
      return 10;
    } else if ( _between( _wasteRate, 0.00001, 0.1 ) ) {
      return 9;
    } else if ( _between( _wasteRate, 0.1, 0.2 ) ) {
      return 8;
    } else if ( _between( _wasteRate, 0.2, 0.3 ) ) {
      return 7;
    } else if ( _between( _wasteRate, 0.3, 0.4 ) ) {
      return 6;
    } else if ( _between( _wasteRate, 0.4, 0.5 ) ) {
      return 5;
    } else if ( _between( _wasteRate, 0.5, 0.6 ) ) {
      return 4;
    } else if ( _between( _wasteRate, 0.6, 0.8 ) ) {
      return 3;
    } else if ( _between( _wasteRate, 0.8, 1 ) ) {
      return 2;
    } else {
      return 1;
    }
  }

  return {
    execute: execute
  }
}

module.exports = QuarterPerceptionStrategy;