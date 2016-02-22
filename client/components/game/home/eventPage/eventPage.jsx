import React from 'react';

export default React.createClass({
  onClick() {
    //
  },

  render() {
    return (
        <div className="eventPage">
          <h1 className="eventPage_headline_box">{this.props.event.name}</h1>
          <span className="eventPage__information">
            {this.props.event.explain}
            <br/>
            {this.props.event.options}
            <button onClick={this.onClick}>option 1</button>
            <button onClick={this.onClick}>option 2</button>
          </span>
        </div>
    );
  }
});
