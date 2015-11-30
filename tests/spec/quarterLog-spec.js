var QuarterLog = require( __core + 'entities/quarterLog' );

describe( 'an quarterLog', function() {
  var quarterLog;
  beforeEach( function() {
    quarterLog = new QuarterLog( 10, 500, 29, 250, 125, 72 );
  } );

  it( 'has data', function() {

    expect( quarterLog.paid ).toBe( 10 );
    expect( quarterLog.itemsMade ).toBe( 500 );
    expect( quarterLog.itemsSold ).toBe( 29 );
    expect( quarterLog.storePaid ).toBe( 250 );
    expect( quarterLog.storeWaste ).toBe( 125 );
    expect( quarterLog.factoryWaste ).toBe( 72 );
  } );

} );
