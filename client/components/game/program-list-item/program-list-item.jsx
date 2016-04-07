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
    let purchased = '';
    if (this.props.program.isPurchased === false) {
      buttonImage = <button className="button" onClick={this.onClick}>
                      <div>AVAILABLE</div>
                     </button>;
    }
    if (this.props.program.isPurchased === true) {
      purchased = 'purchased';
      buttonImage = <div>
      <div>PURCHASED</div>
      </div>;
    }

    return (
      <div className='program-list-item '>
        <div className={"program-list-item__wrapper "+ purchased}>
          <img className="program-list-item__image" src={this.props.program.programImage} />
          <br/>
            <h3>{this.props.program.name}</h3>

            {this.props.program.description}
           <br/> <br/>
            {buttonImage}
        </div>
      </div>
    );
  }
});
