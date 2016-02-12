import React from 'react';

var testList = [{
  name:"Dane",
  dialog:"Business is booming!",
},
  {
    name:"Ashley",
    dialog:"Can't we produce less waste somehow?",
  },
  {
    name:"Gary",
    dialog:"Oi! YOU'RE DRIVING US INTO THE GROUND!!"
  }
];
export default React.createClass({
  testList,
  render() {
    return (
        <div>
          <h2>Your Advisors</h2>
          <ul>
            {this.testList.map(function(listvalue){
              return <li>{listvalue.name} - {listvalue.dialog}</li>;
            })}
          </ul>
        </div>
    );
  }
});
