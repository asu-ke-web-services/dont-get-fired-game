
var Factory = require( __core + 'entities/factory' );

describe( 'a factory', function() {
  var factory;

  beforeEach( function() {
    factory = new Factory( {
      name: 'Toy Factory'
    } );
    
    factoryNoOptions = new Factory();
  } );

  it( 'has a name', function() {
    expect( factory.name ).toBeDefined();
    expect( factory.name ).toBe( 'Toy Factory' );
  } );
  
  it( 'does not require options', function() {
    expect( factoryNoOptions ).toBeUndefined();
  } );
} );

