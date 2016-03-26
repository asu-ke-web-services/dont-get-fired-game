import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { selectProgram } from '../../../actions/actions';

export default React.createClass({
  onClick( e ) {
    e.preventDefault();
    dispatch( selectProgram(this.props.program));
  },

  render() {
    let buttonImage = <div>NULL</div>;

    if (this.props.program.isPurchased === false) {
      buttonImage = <button onClick={this.onClick}>
                      <div>AVAILABLE</div>
                     </button>;
    }
    if (this.props.program.isPurchased === true) {
      buttonImage = <button onClick={this.onClick}>
      <div>PURCHASED</div>
      </button>;
    }

    return (
      <div className="program-list-item">
        <div className="program-list-item__wrapper">
          <img className="program-list-item__image" src={this.props.program.image} />
          <br/><br/>
          <span>
            {this.props.program.name}
            <br/>
            {this.props.program.description}
          </span> <br/> <br/>
            {buttonImage}
        </div>
      </div>
    );
  }
});
