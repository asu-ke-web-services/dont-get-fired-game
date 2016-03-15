import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { goHome } from '../../../actions/actions';

const ShowTweetPage = React.createClass({
  handleBack( e ) {
    e.preventDefault();

    dispatch( goHome() );
  },

  render() {
    return (
      <div className="tweet-page">
        <h1 className="final-report__headline">
        TWEET!!!
        </h1>
        <span className="final-report__information">
          <button className="tweet-page__button-container" onClick={this.handleBack}>
            Back
          </button>
        </span>
      </div>
    );
  }
});
export { ShowTweetPage };
