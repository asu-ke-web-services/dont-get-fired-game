import React from 'react';

export default React.createClass({
  Tweet() {
    //
  },
  Congratulation() {
    //
  },
  render() {
    return (
        <div className="finalReport">
          <h1 className="finalReport_headline">{this.props.report.name}</h1>
          <span className="finalReport_information">
            {this.props.report.accomplishments}
            <br/>
            {this.props.report.goal}
            <button onClick={this.Tweet}>Tweet</button>
            <button onClick={this.Congratulation}>Congratulation</button>
          </span>
        </div>
    );
  }
});
