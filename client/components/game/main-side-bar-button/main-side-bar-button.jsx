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
          <span className="main-side-bar-button">
            {this.props.main.actionPoint}
            <button className="bar__button" onClick={this.onClick}>Next Quater</button>
            </span>
        </div>
    );
  }
});
