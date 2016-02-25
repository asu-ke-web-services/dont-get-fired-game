import React from 'react';

export default React.createClass({
  optionOne() {
    //
  },
  optionTwo() {
    //
  },
  render() {
    return (
        <div className="eventPage">
          <h1 className="eventPage_headline">{this.props.event.name}</h1>
          <span className="eventPage_information">
            {this.props.event.explain}
            <br/>
            {this.props.event.options}
            <button onClick={this.optionOne}>option 1</button>
            <button onClick={this.optionTwo}>option 2</button>
          </span>
        </div>
    );
  }
});
