import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="main-header__bar">
        <div className="main-header__bar-capital">
          Capital: {this.props.capital}
        </div>
        <div className="main-header__bar-cash-flow">
          Cash Flow: {this.props.capitalPerQuarter}
        </div>
        <div className="main-header__bar-quarter">
          Quarter: {this.props.currentQuarter} of {this.props.totalQuarters}
        </div>
        <div className="main-header__bar-goal">
          goal: {this.props.goal}
        </div>

      </div>
    );
  }
});
