var Product = require( __core + 'entities/product' );

describe( 'a product', function() {
  var product;
  beforeEach( function() {
    product = new Product( {
      name: 'Soda Can'
    } );
  } );
  it( 'has a name', function() {
    expect( product.name ).toBeDefined();
    expect( product.name ).toBe( 'Soda Can' );
  } );
} );
