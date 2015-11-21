var Game = require( __core + 'entities/game' );

var gameStates = {};

var sustainabilityGame;
module.exports = function game() {
  sustainabilityGame = new Game( );
  sustainabilityGame.createGame();
  sustainabilityGame.createGame();
};
