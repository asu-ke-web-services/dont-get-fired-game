var Factory = require( __core + 'entities/factoryFactory' );

describe( 'an factory', function() {
  var factory;
  beforeEach( function() {
    factory = new Factory( 'A', { totalInventory: 0 } );
  } );

  it( 'has user', function() {
    expect( factory.name ).toBeDefined();
    expect( factory.name ).toBe( 'A' );
  } );

  it( 'has product', function() {
    expect( factory.product ).toBe( null );
  } );

  it( 'has material', function() {
    expect( factory.material ).toBe( null );
  } );

  it( 'has consumer', function() {
    expect( factory.consumer ).toBe( null );
  } );

  it( 'has totalInventory', function() {
    expect( factory.totalInventory ).toBeDefined();
    expect( factory.totalInventory ).toBe( 0 );
  } );

  it( 'has id', function() {
    expect( factory.id ).toBeDefined();
  } );

} );
