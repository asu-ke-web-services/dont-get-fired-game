import React from 'react';


var eventList = [ {
  advicer: 'The production of soda can is decreasing by 5%'
},
  {
    advicer: 'Option 1: Increase soda can production'
  },
  {
    advicer: 'Option 2: Ignore and continue'
  }
];
export default React.createClass({
  eventList,
  render() {
    return (
        <div>
          <h1>{this.props.eventName} needs attention!!</h1>
          <ul>
            {this.eventList.map(function (listvalue) {
              return <li>{listvalue.advicer}</li>;
            })}
          </ul>
            <button>option 1</button>
            <button>option 2</button>
        </div>
    );
  }
});
