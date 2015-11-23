var Game = require( 'core/entities/game' );

var init = function() {
  var game = new Game();
  game.createGame();
};

module.exports = init;
