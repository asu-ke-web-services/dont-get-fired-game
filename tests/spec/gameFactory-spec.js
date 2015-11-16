var Game = require( __core + 'entities/gameFactory' );

describe( 'an gameZ', function() {
  var game;
  beforeEach( function() {
    game = new Game( {
      quartersPast: 0,
      name: 'Maximum Income!',
      interval: 0
    } );
  } );
    it( 'has quartersPast', function() {
      expect( achievement.quartersPast ).toBeDefined();
      expect( achievement.quartersPast ).toBe( 324 );
    } );

    it( 'has interval', function() {
      expect( achievement.interval ).toBeDefined();
      expect( achievement.interval ).toBe( 0 );
    } );

    it( 'has user', function() {
      expect( achievement.quartersPast ).toBeDefined();
      expect( achievement.quartersPast ).toBe( null );
    } );

} );
