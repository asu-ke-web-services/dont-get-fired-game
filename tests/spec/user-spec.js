var User = require( __core + 'entities/user' );

describe( 'an user', function() {
  var user;
  beforeEach( function() {
    user = new User( 'A', { totalIncome: 100, totalWaste: 10 } );
    userMinInputVars = new User( 'A' );
  } );

  it( 'has data', function() {
    expect( user.name ).toBe( 'A' );
    expect( user.quarterLog ).toBeDefined();
    expect( user.factories ).toBeDefined();
    expect( user.materials ).toBeDefined();
    expect( user.stores ).toBeDefined();
    expect( user.totalIncome ).toBe( 100 );
    expect( user.totalWaste ).toBe( 10 );
  } );

  it( 'min input vars, has data', function() {
    expect( userMinInputVars.name ).toBe( 'A' );
    expect( userMinInputVars.quarterLog ).toBeDefined();
    expect( userMinInputVars.factories ).toBeDefined();
    expect( userMinInputVars.materials ).toBeDefined();
    expect( userMinInputVars.stores ).toBeDefined();
    expect( userMinInputVars.totalIncome ).toBe( 0 );
    expect( userMinInputVars.totalWaste ).toBe( 0 );
  } );

} );
