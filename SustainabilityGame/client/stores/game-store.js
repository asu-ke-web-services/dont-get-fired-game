import Reflux from 'reflux';
import _ from 'underscore';
import { default as Game } from '../models/game';

var GameActions = Reflux.createActions([
  'create'
]);

var GameStore = Reflux.createStore({
  listenables: [ GameActions ],

  init() {
    this._create();
  },

  _create() {
    this._game = new Game();
    this._game.init();
  },

  create() {
    this._create();
    this.trigger(this.getInitialState());
  },

  getInitialState() {
    let game = this._game;

    let state = _.extend(
        {},
        game.company,
        game.company.getCalculatedMetrics()
    );
    // TODO wrap in a debug utility
    // console.log(state);
    return state;
  }
});

export {GameActions, GameStore};
