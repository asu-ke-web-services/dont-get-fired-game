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
    let goal = <div>Your goal was {this.props.state.game.goal.name}.</div>;
    let Win = <div>-</div>;
    if (this.props.state.game.goalsMeet === true) {
      Win = <div>You achieved your goal!</div>;
    }
    if (this.props.state.game.goalsMeet === false) {
      Win = <div>You failed to achieve your goal...</div>;
    }

    return (
      <div className="final-report">
        <h1 className="final-report__headline"> {goal}\n {Win} </h1>
        <span className="final-report__information">
           <span>Play again? {this.props.state.game.gameOver}</span>
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
