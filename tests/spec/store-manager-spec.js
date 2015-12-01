var StoreManager = require( __core + 'managers/store-manager' );

describe( 'an storeManager', function() {
  var storeManager;
  beforeEach( function() {
    storeManager = new StoreManager( [ 1 ] );
  } );

  it( 'has data', function() {
    expect( storeManager.reserveStore ).toBeDefined();
    expect( storeManager.getAvailableStores ).toBeDefined();
  } );

} );
