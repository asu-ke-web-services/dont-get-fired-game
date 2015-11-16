var QuarterLog = require( __core + 'entities/quarterLogFactory' );

describe( 'an material', function() {
  var quarterLog;
  beforeEach( function() {
    quarterLog = new QuarterLog( 10, 500, 29, 250 );
  } );

  it( 'has totalItemsSold', function() {
    expect( quarterLog.totalItemsSold ).toBeDefined();
    expect( quarterLog.totalItemsSold ).toBe( 10 );
  } );

  it( 'has totalConsumerPaid', function() {
    expect( quarterLog.totalConsumerPaid ).toBeDefined();
    expect( quarterLog.totalConsumerPaid ).toBe( 500 );
  } );

  it( 'has totalWaste', function() {
    expect( quarterLog.totalWaste ).toBeDefined();
    expect( quarterLog.totalWaste ).toBe( 29 );
  } );

  it( 'has totalIncome', function() {
    expect( quarterLog.totalIncome ).toBeDefined();
    expect( quarterLog.totalIncome ).toBe( 250 );
  } );

  it( 'has id', function() {
    expect( quarterLog.id ).toBeDefined();
  } );

} );
