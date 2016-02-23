import React from 'react';

export default React.createClass({
  render() {
    return (
        <div>
          <h2>Your Advisors</h2>
          <ul>
            {this.props.advisorList.map(function (advisor) {
              return <li>{advisor.name} - {advisor.dialog}</li>;
            })}
          </ul>
        </div>
    );
  }
});
