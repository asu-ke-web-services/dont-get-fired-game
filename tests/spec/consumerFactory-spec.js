var Consumer = require( __core + 'entities/consumerFactory' );

describe( 'an consumer', function() {
  var consumer;
  beforeEach( function() {
    consumer = new Consumer( 'A', null, '100', '10', '25' );
  } );

  it( 'has name', function() {
    expect( consumer.name ).toBeDefined();
    expect( consumer.name ).toBe( 'A' );
  } );

  it( 'has regProduct', function() {
    expect( consumer.regProduct ).toBe( null );
  } );

  it( 'has incomePerItem', function() {
    expect( consumer.incomePerItem ).toBeDefined();
    expect( consumer.incomePerItem ).toBe( 100 );
  } );

  it( 'has wastePerItem', function() {
    expect( consumer.wastePerItem ).toBeDefined();
    expect( consumer.wastePerItem ).toBe( 110 );
  } );

  it( 'has baseBuyRate', function() {
    expect( consumer.baseBuyRate ).toBeDefined();
    expect( consumer.baseBuyRate ).toBe( 25 );
  } );

  it( 'has id', function() {
    expect( consumer.id ).toBeDefined();
    expect( consumer.id ).toBe( 'Consumer1' );
  } );

} );
