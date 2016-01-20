import React from 'react';
import { default as GamePlayHome } from '../components/GamePlay/Home/Home.jsx';

SceneActions = Reflux.createActions([
  'transition'
]);

export default SceneStore = Reflux.createStore({
  listenables: [SceneActions],

  init: function () {
    this._scene = <GamePlayHome />;
  },

  transition: function (scene) {
    this._scene = scene;
    this.trigger(this._scene);
  },

  getInitialState: function () {
    return this._scene;
  }
});
