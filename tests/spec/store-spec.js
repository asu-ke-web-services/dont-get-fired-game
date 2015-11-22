var Store = require( __core + 'entities/store' );

describe( 'store', function() {
  var store;
  beforeEach( function() {
    store = new Store( 'A', null, 100, 10, 25 );
  } );

  it( 'has data', function() {
    expect( store.name ).toBe( 'A' );

    //expect( store.product ).toBe( null );
    expect( store.pricePerProduct ).toBe( 100 );
    expect( store.wastePerProduct ).toBe( 10 );
    expect( store.baseBuyRateForProducts ).toBe( 25 );
  } );

  it( 'does not allow no default values', function() {

    // TODO
  } );

} );
