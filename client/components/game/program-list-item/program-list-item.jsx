import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { selectProgram } from '../../../actions/actions';

export default React.createClass({
  onClick( e ) {
    e.preventDefault();
<<<<<<< HEAD
    dispatch( selectProgram(this.props.programName, this.props.credits));
    // TODO
=======
    dispatch( selectProgram(this.props.program.name) );
>>>>>>> 9226c438d10ecbdb5383384912b3518c173f9189
  },

  render() {
    // TODO
    let isPurchased = false;
    let buttonImage = <div>AVAILABLE</div>;

    if (isPurchased) {
      buttonImage = <div>PURCHASED</div>;
    }

    return (
      <div className="program-list-item">
        <div className="program-list-item__wrapper">
          <img className="program-list-item__image" />
          <span>
            {this.props.program.name}
            <br/>
            {this.props.program.shortDescription}
          </span>
          <button onClick={this.onClick}>
            {buttonImage}
          </button>
        </div>
      </div>
    );
  }
});
