var Material = require( __core + 'entities/material' );

describe( 'an material', function() {
  var material;
  beforeEach( function() {
    material = new Material( 'A', 2, 1 );
  } );

  it( 'has data', function() {
    expect( material.name ).toBe( 'A' );
    expect( material.wastePerLb ).toBe( 2 );
    expect( material.costPerLb ).toBe( 1 );
  } );


} );
