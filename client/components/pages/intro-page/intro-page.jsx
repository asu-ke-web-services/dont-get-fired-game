import React from 'react';

var eventList = [ {
  advicer: 'The person explain everything is one of your advisors '
},
  {
    advicer: 'You are the new CEO'
  },
  {
    advicer: 'The current company state'
  },
  {
    advicer: 'End goal by the end of 4 years/16 quaters'
  }
];

const IntroPage = React.createClass({
  eventList,
  render() {
    return (
        <div>
          <h1> Welcome to {this.props.CompanyName}</h1>
          <ul>
            {this.eventList.map(function (listvalue) {
              return <li>{listvalue.advicer}</li>;
            })}
          </ul>
            <button>Back</button>
            <button>Start Your First Quater</button>
        </div>
    );
  }
});

export { IntroPage };
