import React from 'react';
import Setup from '../setup/setup.jsx';
import {SceneActions} from '../../../stores/scene-store.jsx';

export default React.createClass({
  handlePlay(e) {
    e.preventDefault();

    SceneActions.transition(<Setup />);
  },

  render() {
    return (
      <div bem_element="">
        <h1>Game Name Here</h1>
        <button onClick={this.handlePlay}>Play</button>
      </div>
    );
  }
});
