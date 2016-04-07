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
      Win = <div><p>Congrats!</p>
      <p>You achieved company's goal!</p>
      <p>{this.props.state.game.companyName} achieved
      ${this.props.state.game.capital} capital!</p>
      <p>{this.props.state.game.companyName} had satisfaction:
      {this.props.state.game.totalSatisfaction}!</p>
      <p>You did so well! In fact, the company wants you be CEO again.</p>
      <p>Come back to us!</p></div>;
    }
    if (this.props.state.game.goalsMeet === false) {
      Win = <div><p> Sorry! You failed your company!</p>
      <p> You are fired </p>
      <p>The Company should achieve ${this.props.state.game.goals.captial}!</p>
      <p>Satisfaction should be {this.props.state.game.goals.satisfaction}!</p>
      <p>You only got ${this.props.state.game.capital} capital
         and {this.props.state.game.totalSatisfaction} satisfaction points!</p>
      <p>Sorry, you lost the game!</p>
      <p>You can do better next time </p></div>;
    }

    return (
      <div className="final-report">
        <h1 className="final-report__headline"> {Win} </h1>
        <div className="final-report__information">
          <div className="playAgainWrapper">
            <h2>Play Again? {this.props.state.game.gameOver}</h2>
            <br/>
            <button className="button" onClick={this.handleTweet}>
              Tweet
            </button>
            <br/><br/>
            <button className="button" onClick={this.handleGoHome}>
              New Game
            </button>
            </div>
        </div>
      </div>
    );
  }
});
export { FinalReportPage };
