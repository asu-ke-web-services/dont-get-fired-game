var Material = require( __core + 'entities/material' );

describe( 'a material', function() {
  var material;
  beforeEach( function() {
    material = new Material( {
      name: 'Aluminium'
    } );
  } );
  it( 'has a name', function() {
    expect( material.name ).toBeDefined();
    expect( material.name ).toBe( 'Aluminium' );
  } );
} );



