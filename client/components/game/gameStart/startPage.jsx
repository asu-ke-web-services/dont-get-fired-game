import React from 'react';
import Setup from '../setup/setup.jsx';

export default React.createClass({
  handlePlay(e){
    e.prevetDefault();
    //will add the button handler to credits later
  },
  handleCredit(e){
    e.prevetDefault();
    //will add the button handler to credits later
  },

  render() {
    return (
      <div className="start-page">
        <div className="start-page_wrapper">
          <h1>Dont Get Fired</h1>
          <button onClick={this.handlePlay}>new game</button>
          <button onClick={this.handleCredit}>credits</button>
       </div>
      </div>
    );
  }
});

