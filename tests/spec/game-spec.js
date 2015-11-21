var Game = require( __core + 'entities/game' );

describe( 'an game', function() {
  var game;
  beforeEach( function() {
    game = new Game( {
      quartersPast: 1,
      interval: 1
    } );
  } );

  it( 'has data', function() {
    expect( game.quartersPast ).toBe( 1 );
    expect( game.interval ).toBe( 1 );
  } );

  it( 'default - has data', function () {
    expect( game.quartersPast ).toBe( 0 );
    expect( game.interval ).toBe( 0 );
  });

} );
