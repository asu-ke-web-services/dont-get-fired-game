var User = require( __core + 'entities/userFactory' );

describe( 'an user', function() {
  var user;
  beforeEach( function() {
    user = new User( 'A', { totalIncome: 100, totalWaste: 10 } );
  } );

  it( 'has name', function() {
    expect( user.name ).toBeDefined();
    expect( user.name ).toBe( 'A' );
  } );

  it( 'has quarterLog', function() {
    expect( user.quarterLog ).toBeDefined();
  } );

  it( 'has factories', function() {
    expect( user.factories ).toBeDefined();
  } );

  it( 'has materials', function() {
    expect( user.materials ).toBeDefined();
  } );

  it( 'has consumers', function() {
    expect( user.consumers ).toBeDefined();
  } );

  it( 'has totalIncome', function() {
    expect( user.totalIncome ).toBeDefined();
    expect( user.totalIncome ).toBe( 100 );
  } );

  it( 'has totalWaste', function() {
    expect( user.totalWaste ).toBeDefined();
    expect( user.totalWaste ).toBe( 10 );
  } );

} );
