import React from 'react';

import { store } from '../../../stores/game-store';
import { ACTION_ENUM } from '../../../enums/action-enum';

const StartPage = React.createClass({
  handlePlay( e ) {
    e.preventDefault();

    store.dispatch({
      type: ACTION_ENUM.NEW_GAME
    });
  },

  handleCredit() {
    // TODO
  },

  render() {
    return (
      <div className="start-page">
        <div className="start-page__wrapper">
          <h1>Dont Get Fired</h1>
          <button onClick={this.handlePlay}>new game</button>
          <button onClick={this.handleCredit}>credits</button>
       </div>
      </div>
    );
  }
});

export { StartPage };
