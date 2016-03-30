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
            Cash Flow: {this.props.capitalPerQuarter}
          </div>
          <div className="main-header__bar-quarter">
            Quarter: {this.props.currentQuarter} of {this.props.totalQuarters}
          </div>
          <div className="main-header__bar-goal">
            <div className="main-header__bar-goal">
                goal: {this.props.goals.description} <br/>
                goal capital: {this.props.goals.capital} <br/>
                goal satisfaction: {this.props.goals.satisfaction}
            </div>

        </div>
         </div>
      </div>
    );
  }
});
