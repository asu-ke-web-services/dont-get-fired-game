var FactoryManager = require( __core + 'entities/factoryManager' );

describe( 'an factoryManager', function() {
  var factoryManager;
  beforeEach( function() {
    factoryManager = new FactoryManager( [ 1, 2, 3 ] );
  } );

  it( 'has data', function() {

    //expect( factoryManager.factories ).toBe( [ 1, 2, 3 ] );
    //expect( factoryManager.availableFactories ).toBe( [] );
  } );

} );
