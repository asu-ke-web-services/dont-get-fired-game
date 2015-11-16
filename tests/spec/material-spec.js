var Material = require( __core + 'entities/material' );

describe( 'a material', function() {
  var material;
  beforeEach( function() {
    material = new Material( {
      materialName: 'Aluminium'
    } );
  } );
  it( 'has a name', function() {
    expect( material.materialName ).toBeDefined();
    expect( material.materialName ).toBe( 'Aluminium' );
  } );
} );
