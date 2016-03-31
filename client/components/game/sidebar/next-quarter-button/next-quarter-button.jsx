import React from 'react';


import { dispatch } from '../../../../stores/game-store';
import { showQuaterReport } from '../../../../actions/actions';
export default React.createClass({
  onClick( ) {
    dispatch( showQuaterReport() );
  },
  render() {
    return (
        <div>
          <span className="main-side-bar-button">


            <button className="button" onClick={this.onClick}>Next Quater</button>
            <div className="remainingActions">Actions: {this.props.actions}</div>
          </span>
        </div>
    );
  }
});
