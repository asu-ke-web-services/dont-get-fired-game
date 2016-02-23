import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <div style={{display: "inline-block", marginRight: "30px"}}>
          Capital: {this.props.capital}
        </div>
        <div style={{display: "inline-block", marginRight: "30px"}}>
          Cash Flow: {this.props.cashFlow}
        </div>
        <div style={{display: "inline-block"}}>
          Quarter: {this.props.quarter} of {this.props.totalQuarterCount}
        </div>
      </div>
    );
  }
});
