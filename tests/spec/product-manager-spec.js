var ProductManager = require( __core + 'managers/product-manager' );

describe( 'an productManager', function() {
  var productManager;
  beforeEach( function() {
    productManager = new ProductManager( [ 'soda can' ] );
  } );

  it( 'has data', function() {
    expect( productManager.reserveProduct ).toBeDefined();
    expect( productManager.getAvailableProducts ).toBeDefined();
  } );

} );
