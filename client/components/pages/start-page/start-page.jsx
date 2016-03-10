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
          <h1 className="start-page__header">
            Dont Get Fired
          </h1>

          <div className="start-page__button-container">
            <button
                className="
                  start-page__button
                  start-page__button--first
                  button
                  button--action
                  button--block"
                onClick={this.handlePlay}>
              new game
            </button>
            <br/>
            <button
                className="start-page__button button button--white button--block"
                onClick={this.handleCredit}>
              credits
            </button>
          </div>

       </div>
      </div>
    );
  }
});

export { StartPage };
