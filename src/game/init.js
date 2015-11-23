var Game = require( 'core/entities/game' );

var gameStates = {};

var sustainabilityGame;
module.exports = function game() {
  sustainabilityGame = new Game( );
  sustainabilityGame.createGame();
  sustainabilityGame.createGame();
};
