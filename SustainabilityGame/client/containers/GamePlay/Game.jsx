GamePlay = typeof GamePlay === 'undefined' ? {} : GamePlay;

Flint(function () {
  GamePlay.Game = React.createClass({
    mixins: [Reflux.connect(SceneStore, 'scene')],

    render() {
      return this.state.scene;
    }
  });
}, 'SceneStore');
