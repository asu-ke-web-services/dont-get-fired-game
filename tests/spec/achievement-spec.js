var Achievement = require( __core + 'entities/achievement' );

describe( 'an achievement', function() {
  var achievement;

  beforeEach( function() {
    achievement = new Achievement( {
      name: 'Maximum Income!'
    } );
  } );

  it( 'has a name', function() {
    expect( achievement.name ).toBeDefined();
    expect( achievement.name ).toBe( 'Maximum Income!' );
  } );
} );

