import React from 'react';
import SceneStore from '/client/stores/SceneStore.jsx';

GamePlay = typeof GamePlay === 'undefined' ? {} : GamePlay;

GamePlay.Game = React.createClass({
  mixins: [Reflux.connect(SceneStore, 'scene')],

  render() {
    return this.state.scene;
  }
});