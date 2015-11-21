var StoreManager = require( __core + 'entities/storeManager' );

describe( 'an storeManager', function() {
  var storeManager;
  beforeEach( function() {
    storeManager = new StoreManager( [] );
  } );

  it( 'has data', function() {
    expect( storeManager.stores ).toBe( [] );
    expect( storeManager.availableStores ).toBe( [] );
  } );

} );