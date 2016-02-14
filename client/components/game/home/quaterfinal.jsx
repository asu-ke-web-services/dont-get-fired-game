import React from 'react';


var eventList = [{
  advicer:"You finished the game in 10 minutes"
},
  {
    advicer:"Your goal has been met"
  }, 
  {
    advicer:"You won the game"
  }
];
export default React.createClass({
  eventList,
  render() {
    return (
        <div>
          <h1> Soda can production is increasing by 10%</h1>
          <ul>
            {this.eventList.map(function(listvalue){
              return <li>{listvalue.advicer}</li>
            })}
          </ul>
            <button>Tweet</button>
            <button>Congratulations!</button>
        </div>
    );
  }
});