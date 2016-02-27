import React from 'react';

export default React.createClass({
  handlePlay() {
    // TODO
  },
  handleCredit() {
   // TODO
  },

  render() {
    return (
      <div className="start-page">
        <div className="start-page__wrapper">
          <h1>Dont Get Fired</h1>
          <button onClick={this.handlePlay}>new game</button>
          <button onClick={this.handleCredit}>credits</button>
       </div>
      </div>
    );
  }
});

