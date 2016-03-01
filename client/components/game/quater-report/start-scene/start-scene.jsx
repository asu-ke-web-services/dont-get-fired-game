import React from 'react';
import Reflux from 'reflux';
import { SceneEvent } from '../next-scene/next-scene.jsx';

export default React.createClass({
  mixins: [ Reflux.connect(SceneEvent, 'scene') ],

  render() {
    return SceneEvent.getScene();
  }
});
