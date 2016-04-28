import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="main-header__bar">
          <h1>{this.props.name} - Status</h1>

         <div className="main-header__wrapper">
          <div className="main-header__bar-capital">
            Capital: {this.props.capital}
          </div>
          <div className="main-header__bar-cash-flow">
            Satisfaction Points: {this.props.totalSatisfaction}
          </div>
          <br/>
          <div className="main-header__bar-quarter">
            Quarter: {this.props.currentQuarter} of {this.props.totalQuarters}
          </div>
          <div className="main-header__bar-goal">
            <div className="main-header__bar-goal">
                Goal Minimum Required Capital: {this.props.goals.capital} <br/>
                Goal Minimum Required Satisfaction Points: {this.props.goals.satisfaction}
            </div>

        </div>
         </div>
      </div>
    );
  }
});
