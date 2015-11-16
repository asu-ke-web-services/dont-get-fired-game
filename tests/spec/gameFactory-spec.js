var Game = require( __core + 'entities/gameFactory' );

describe( 'an game', function() {
  var game;
  beforeEach( function() {
    game = new Game( {
      quartersPast: 1,
      interval: 1
    } );
  } );

  it( 'has quartersPast', function() {
    expect( game.quartersPast ).toBeDefined();
    expect( game.quartersPast ).toBe( 1 );
  } );

  it( 'has interval', function() {
    expect( game.interval ).toBeDefined();
    expect( game.interval ).toBe( 1 );
  } );

} );
