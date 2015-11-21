var Factory = require( __core + 'entities/factory' );

describe( 'an factory', function() {
  var factory;
  var factoryWithMinInput;
  beforeEach( function() {
    factory = new Factory( 'A', { totalInventory: 1 } );
    factoryWithMinInput = new Factory( 'A' );
  } );

  it( 'has data', function() {
    expect( factory.name ).toBe( 'A' );

    //expect( factory.product ).toBe( null );
    //expect( factory.material ).toBe( null );
    //expect( factory.store ).toBe( null );
    expect( factory.totalInventory ).toBe( 1 );
  } );

  it( 'min input vars, has data', function() {
    expect( factoryWithMinInput.name ).toBe( 'A' );

    //expect( factory.product ).toBe( null );
    //expect( factory.material ).toBe( null );
    //expect( factory.store ).toBe( null );
    expect( factoryWithMinInput.totalInventory ).toBe( 0 );
  } );

} );
