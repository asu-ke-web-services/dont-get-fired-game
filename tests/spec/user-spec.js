var User = require( __core + 'entities/user' );

describe( 'an user', function() {
  var user;
  beforeEach( function() {
    user = new User( 'A', { totalIncome: 100, totalWaste: 10 } );
  } );

  it( 'has data', function() {
    expect( user.name ).toBe( 'A' );
    expect( user.quarterLog ).toBeDefined();
    expect( user.factories ).toBeDefined();
    expect( user.materials ).toBeDefined();
    expect( user.consumers ).toBeDefined();
    expect( user.totalIncome ).toBe( 100 );
    expect( user.totalWaste ).toBe( 10 );
  } );

  it( 'has data, min input vars', function () {
    expect( user.name ).toBe( 'A' );
    expect( user.quarterLog ).toBeDefined();
    expect( user.factories ).toBeDefined();
    expect( user.materials ).toBeDefined();
    expect( user.consumers ).toBeDefined();
    expect( user.totalIncome ).toBe( 0 );
    expect( user.totalWaste ).toBe( 0 );
  });


} );
