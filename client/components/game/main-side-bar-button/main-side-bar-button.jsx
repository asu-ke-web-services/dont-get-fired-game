import React from 'react';

export default React.createClass({
  onClick( ) {
    return (e) => {
      e.preventDefault();
      // TODO
    };
  },
  render() {
    return (
        <div>
            <button className="main-side-bar-button" onClick={this.onClick}>Next Quater</button>
        </div>
    );
  }
});
