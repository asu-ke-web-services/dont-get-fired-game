var Material = require( __core + 'entities/materialFactory' );

describe( 'an material', function() {
  var material;
  beforeEach( function() {
    material = new Material( 'A', 2, 1 );
  } );

  it( 'has name', function() {
    expect( material.name ).toBeDefined();
    expect( material.name ).toBe( 'A' );
  } );

  it( 'has wastePerLb', function() {
    expect( material.wastePerLb ).toBeDefined();
    expect( material.wastePerLb ).toBe( 2 );
  } );

  it( 'has costPerLb', function() {
    expect( material.costPerLb ).toBeDefined();
    expect( material.costPerLb ).toBe( 1 );
  } );

  it( 'has id', function() {
    expect( material.id ).toBeDefined();
  } );

} );
