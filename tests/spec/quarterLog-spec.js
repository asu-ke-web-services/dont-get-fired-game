var QuarterLog = require( __core + 'entities/quarterLog' );

describe( 'an quarterLog', function() {
  var quarterLog;
  beforeEach( function() {
    quarterLog = new QuarterLog( 10, 500, 29, 250 );
  } );

  it( 'has data', function() {
    expect( quarterLog.totalItemsSold ).toBe( 10 );
    expect( quarterLog.totalConsumerPaid ).toBe( 500 );
    expect( quarterLog.totalWaste ).toBe( 29 );
    expect( quarterLog.totalIncome ).toBe( 250 );
  } );

} );
