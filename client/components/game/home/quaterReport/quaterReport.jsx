
import React from 'react';

var quaterList = [ {
  items: 'Production: 20% increase'
},
  {
    items: 'Wastes: 10% increase'
  }
];
export default React.createClass({
  quaterList,
  render() {
    return (
        <div>
          <h1>End Of Quater {this.props.quater}</h1>
          <ul>
            <p>The result of this quater:</p>
            {this.quaterList.map(function (listvalue) {
              return <li>{listvalue.items}</li>;
            })}
          </ul>
            <button>Start Your Next Quater</button>
        </div>
    );
  }
});
