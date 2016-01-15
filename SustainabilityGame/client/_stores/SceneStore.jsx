Flint(function () {
  SceneActions = Reflux.createActions([
    'transition'
  ]);

  SceneStore = Reflux.createStore({
    listenables: [SceneActions],

    init: function () {
      this._scene = <GamePlay.Home />;
    },

    transition: function (scene) {
      this._scene = scene;
      this.trigger(this._scene);
    },

    getInitialState: function () {
      return this._scene;
    }
  });
}, 'GamePlay.Home');
