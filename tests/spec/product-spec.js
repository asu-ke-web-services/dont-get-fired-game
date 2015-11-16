var Product = require( __core + 'entities/product' );

describe( 'a product', function() {
  var product;
  beforeEach( function() {
    product = new Product( {
      productName: 'Soda Can'
    } );
  } );
  it( 'has a name', function() {
    expect( product.productName ).toBeDefined();
    expect( product.productName ).toBe( 'Soda Can' );
  } );
} );
