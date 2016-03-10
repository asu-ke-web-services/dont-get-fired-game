import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="main-header__bar">
        <div className="main-header__bar-capital">
          Capital: {this.props.capital}
        </div>
        <div className="main-header__bar-cash-flow">
          Cash Flow: {this.props.cashFlow}
        </div>
        <div className="main-header__bar-quarter">
          Quarter: {this.props.quarter} of {this.props.totalQuarterCount}
        </div>
      </div>
    );
  }
});
