import React from 'react';

export default React.createClass({
  handleTweet() {
    //
  },
  handleCongratulations() {
    //
  },
  render() {
    return (
      <div className="final-report">
        <h1 className="final-report__headline">
          {this.props.report.name}
        </h1>
        <span className="final-report__information">
          {this.props.report.accomplishments}
          <br/>
          {this.props.report.goal}
          <button className="final-report__button" onClick={this.handleTweet}>
            Tweet
          </button>
          <button className="final-report__button" onClick={this.handleCongratulations}>
            Congratulations
          </button>
        </span>
      </div>
    );
  }
});
