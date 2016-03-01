import React from 'react';
import Reflux from 'reflux';
import {default as Quater} from '../../quater-report/quater-report.jsx';

var SceneActions = Reflux.createActions([
  'transition'
]);

var SceneEvent = Reflux.createStore({
  listenables: [ SceneActions ],

  init() {
    this._sceneId = null;
    this._scene = null;
  },

  transition(scene) {
    this._scene = scene;
    this._sceneId = scene._rootNodeId;
    this.trigger(this._sceneId);
  },

  getInitialState() {
    if (this._scene === null) {
      let quater = <Quater />;
      this._sceneId = quater._rootNodeID;
      this._scene = quater;
    }

    return {
      sceneId: this._sceneId
    };
  },

  getScene() {
    return this._scene;
  }
});

export {SceneActions, SceneEvent};
