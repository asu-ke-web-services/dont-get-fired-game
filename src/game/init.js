var Game = require( 'core/entities/game' );

var init = function () {
  var game = new Game();
  console.log(game);
  game.createGame();
}

module.exports = init;
