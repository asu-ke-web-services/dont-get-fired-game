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
            {this.props.actionPoints}
            <button className="button" onClick={this.onClick}>Next Quater</button>
            </span>
        </div>
    );
  }
});
