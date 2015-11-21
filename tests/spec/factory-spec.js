var Factory = require( __core + 'entities/factory' );

describe( 'an factory', function() {
  var factory;
  var factoryWithMinInput;
  beforeEach( function() {
    factory = new Factory( 'A', { totalInventory: 1 } );
    factoryWithMinInput = new Factory( 'A' );
  } );

  it( 'has data', function() {
    expect( factory.name ).toBe( 'A' );
    expect( factory.product ).toBe( null );
    expect( factory.material ).toBe( null );
    expect( factory.consumer ).toBe( null );
    expect( factory.totalInventory ).toBe( 1 );
  } );

  it( 'has data, min input vars', function () {
    expect( factory.name ).toBe( 'A' );
    expect( factory.product ).toBe( null );
    expect( factory.material ).toBe( null );
    expect( factory.consumer ).toBe( null );
    expect( factory.totalInventory ).toBe( 0 );
  });

} );


var Factory = require( __core + 'entities/factory' );

describe( 'an factory', function() {
  var factory;
  beforeEach( function() {
    store = new Store( 'A', null, 100, 10, 25 );
  } );

  it( 'has data', function() {
    expect( consumer.name ).toBe( 'A' );
    expect( consumer.product ).toBe( null );
    expect( consumer.incomePerItem ).toBe( 100 );
    expect( consumer.wastePerItem ).toBe( 10 );
    expect( consumer.baseBuyRate ).toBe( 25 );
  } );

  it( 'has data, min input', function () {
    expect( consumer.name ).toBe( 'A' );
    expect( consumer.product ).toBe( null );
    expect( consumer.incomePerItem ).toBe( 100 );
    expect( consumer.wastePerItem ).toBe( 10 );
    expect( consumer.baseBuyRate ).toBe( 25 );
  });
} );
