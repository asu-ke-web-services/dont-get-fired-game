var QuarterPerceptionStrategy = require( __core + 'strategies/quarter-perception-strategy' );

describe( 'the quarter perception strategy', function() {
  it( 'produces a poor perception given a high waste to items ratio', function () {
    var quarter = {
      factoryWaste: 1000,
      itemsMade: 1,
      storeWaste: 10,
      itemsSold: 1
    };

    var strategy = new QuarterPerceptionStrategy(quarter);

    var result = strategy.execute();

    expect(result).toBeLessThan(5);
  } );

  it( 'produces a good perception given a low waste to items ratio', function () {
    var quarter = {
      factoryWaste: 1,
      itemsMade: 10,
      storeWaste: 1,
      itemsSold: 10
    };

    var strategy = new QuarterPerceptionStrategy(quarter);

    var result = strategy.execute();

    expect(result).toBeGreaterThan(5);
  } );
} );
