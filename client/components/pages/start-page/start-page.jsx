import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { newGame, showCredits } from '../../../actions/actions';

const StartPage = React.createClass({
  handlePlay( e ) {
    e.preventDefault();

    dispatch( newGame() );
  },

  handleCredit( e ) {
    e.preventDefault();

    dispatch( showCredits() );
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
