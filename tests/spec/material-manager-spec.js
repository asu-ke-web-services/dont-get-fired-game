var MaterialManager = require( __core + 'managers/material-manager' );

describe( 'an materialManager', function() {
  var materialManager;
  beforeEach( function() {
    materialManager = new MaterialManager( [ 'Aluminium' ] );
  } );

  it( 'has data', function() {
    expect( materialManager.reserveMaterial ).toBeDefined();
    expect( materialManager.getAvailableMaterials ).toBeDefined();
  } );
} );
