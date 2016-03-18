import React from 'react';

export default React.createClass({
  onClick( ) {
    return ( e ) => {
      e.preventDefault();
      // TODO
    };
  },
  render() {
    return (
        <div>
          <span className="main-side-bar-button">
            {this.props.actionPoints}
            <button className="button" onClick={this.onClick}>Next Quater</button>
            </span>
        </div>
    );
  }
});
