var Store = require( __core + 'entities/store' );

describe( 'store', function() {
  var store;
  beforeEach( function() {
    store = new Store( 'A', null, 100, 10, 25 );
  } );

  it( 'has data', function() {
    expect( store.name ).toBe( 'A' );
    expect( store.product ).toBe( null );
    expect( store.incomePerItem ).toBe( 100 );
    expect( store.wastePerItem ).toBe( 10 );
    expect( store.baseBuyRate ).toBe( 25 );
  } );
  
  it( 'does not allow no default values', function () {
    // TODO
  });
} );
