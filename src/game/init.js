var Game = require( 'core/entities/game' );

var gameStates = {};

var sustainabilityGame;
module.exports = function game() {

  // TODO Game init
  sustainabilityGame = new Game();
  sustainabilityGame.createGame();
};
