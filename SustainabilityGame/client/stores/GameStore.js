import Game from '/client/game/Game';

GameActions = Reflux.createActions([
  'create'
]);

export default GameStore = Reflux.createStore({
  listenables: [GameActions],

  init: function () {
    this._create();
  },

  _create: function () {
    this._game = new Game();
    this._game.init();
  },

  create: function () {
    this._create();
    this.trigger(this.getInitialState());
  },

  getInitialState: function () {
    let game = this._game;

    let state = _.extend(
        {},
        game.company,
        game.company.getCalculatedMetrics()
    );
    // TODO wrap in a debug utility
    console.log(state);
    return state;
  }
});
