import React from 'react';

export default React.createClass({
    handleGame(e){     
        e.preventDefault();
        //will add the button handler to new game later
    },
    handleCredit(e){
        e.prevetDefault();
        //will add the button handler to credits later
    },
  render() {
    return (
        <div>
          <h1>Dont Get Fired</h1>
            <button onClick= {this.handlePlay}>new game</button>
            <button onClick= {this.handleCredit}>credits</button>
        </div>
    );
  }
});
