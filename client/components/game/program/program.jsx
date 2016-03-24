import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { addProgram } from '../../../actions/actions';
import { unselectProgram } from '../../../actions/actions';

export default React.createClass({
  onClick() {
    dispatch( addProgram(this.props.program.name) );
  },
  onClickBack() {
    dispatch( unselectProgram() );
  },

  render() {
    return (
      <div className="program">
        <div className="program__wrapper">
          <img className="program__image" src={this.props.program.image} />
          <span className="program__information">
             {this.props.program.name}
             <br/>
             {this.props.program.shortDescription}
             <br/>
             {this.props.program.cost}
             <br/>
             {this.props.program.additional}
          </span>
          <button onClick={this.onClick}>
            Setup Program ({this.props.program.actionPointValue} Action Points)
          </button>
          <button onClick={this.onClickBack}>
          Back ({this.props.program.actionPointValue} Action Points)
          </button>
        </div>
      </div>
    );
  }
});
