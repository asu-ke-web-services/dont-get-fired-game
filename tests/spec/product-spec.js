var Product = require( __core + 'entities/product' );

describe( 'an product', function() {
  var product;

  beforeEach( function() {
    product = new Product( 'A', 100, null, null, 50 );
  } );

  it( 'has data', function() {
    expect( product.name ).toBe( 'A' );
    expect( product.setupCost ).toBe( 100 );
    expect( product.totalOutput ).toBe( 50 );
  } );

} );

