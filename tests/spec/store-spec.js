var Store = require( __core + 'entities/store' );

describe( 'store', function() {
  var store;
  beforeEach( function() {
    store = new Store( 'A', null, 100, 10, 25 );
  } );

  it( 'has data', function() {
    expect( consumer.name ).toBe( 'A' );
    expect( consumer.product ).toBe( null );
    expect( consumer.incomePerItem ).toBe( 100 );
    expect( consumer.wastePerItem ).toBe( 10 );
    expect( consumer.baseBuyRate ).toBe( 25 );
  } );
  
  it( 'does not allow no default values', function () {
    // TODO
  });
} );
