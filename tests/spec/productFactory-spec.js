var Product = require( __core + 'entities/productFactory' );

describe( 'an material', function() {
  var product;
  beforeEach( function() {
    product = new Product( 'A', 100, null, null, 50 );
  } );

  it( 'has name', function() {
    expect( product.name ).toBeDefined();
    expect( product.name ).toBe( 'A' );
  } );

  it( 'has setupCost', function() {
    expect( product.setupCost ).toBeDefined();
    expect( product.setupCost ).toBe( 100 );
  } );

  it( 'has regMaterialTypes', function() {
    expect( product.regMaterialTypes ).toBe( null );
  } );

  it( 'has totalMaterialsNeeded', function() {
    expect( product.totalMaterialsNeeded ).toBe( null );
  } );

  it( 'has totalOuput', function() {
    expect( product.totalOuput ).toBeDefined();
    expect( product.totalOuput ).toBe( 50 );
  } );

  it( 'has id', function() {
    expect( product.id ).toBeDefined();
  } );

} );
