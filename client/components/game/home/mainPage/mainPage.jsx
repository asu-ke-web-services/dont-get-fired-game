import React from 'react';

export default React.createClass({
  back() {
    //
  },
  startFirstQuater() {
    //
  },
  render() {
    return (
        <div>
          <h1 className="mainPage"> Welcome to {this.props.main.name}</h1>
          <span className="mainPage_information">
            {this.props.main.introduction}
            <br/>
            {this.props.main.currentCompanyState}
            <br/>
            {this.props.main.endGameGoal}
            <br/>
          </span>
            <button onClick={this.back}>Back</button>
            <button onClick={this.startFirstQuater}>Start Your First Quater</button>
        </div>
    );
  }
});
