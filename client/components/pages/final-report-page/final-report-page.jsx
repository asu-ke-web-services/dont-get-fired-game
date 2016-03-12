import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { showTweetPage } from '../../../actions/actions';

const FinalReportPage = React.createClass({
  handleTweet( e ) {
    e.preventDefault();

    dispatch( showTweetPage() );
  },
  render() {
    return (
      <div className="final-report">
        <h1 className="final-report__headline"> {this.props.quater.name} </h1>
        <span className="final-report__information">
          {this.props.accomplishments}
          <br/>
          {this.props.goal}
          <button className="final-report__button" onClick={this.handleTweet}>
            Tweet
          </button>
        </span>
      </div>
    );
  }
});
export { FinalReportPage };
