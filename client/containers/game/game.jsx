import React from 'react';
import Reflux from 'reflux';
import { SceneStore } from '../../stores/scene-store.jsx';

export default React.createClass({
  mixins: [ Reflux.connect(SceneStore, 'scene') ],

  render() {
    return SceneStore.getScene();
  }
});
