import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { showTweetPage, goHome } from '../../../actions/actions';

const FinalReportPage = React.createClass({
  handleTweet( e ) {
    e.preventDefault();

    dispatch( showTweetPage() );
  },
  handleGoHome( e ) {
    e.preventDefault();

    dispatch( goHome() );
  },

  render() {
    let Win = <div>-</div>;
    if (this.props.state.game.goalsMeet === true) {
      Win = <div>You WIN!</div>;
    }
    if (this.props.state.game.goalsMeet === false) {
      Win = <div>You Lose... :(</div>;
    }

    return (
      <div className="final-report">
        <h1 className="final-report__headline"> {Win} </h1>
        <span className="final-report__information">
           <span>Did you win? {this.props.state.game.gameOver}</span>
          <br/>
          <button className="final-report__button" onClick={this.handleTweet}>
            Tweet
          </button>
          <br/><br/>
          <button className="final-report__button" onClick={this.handleGoHome}>
            New Game
          </button>
        </span>
      </div>
    );
  }
});
export { FinalReportPage };
