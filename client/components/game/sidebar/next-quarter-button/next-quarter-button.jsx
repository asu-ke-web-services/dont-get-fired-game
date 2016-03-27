import React from 'react';


import { dispatch } from '../../../../stores/game-store';
import { showQuarterReport } from '../../../../actions/actions';
export default React.createClass({
  onClick( ) {
    dispatch( showQuarterReport() );
  },
  render() {
    return (
        <div>
          <span className="main-side-bar-button">
            Actions: {this.props.actions} <br/> <br/>
            <button className="button" onClick={this.onClick}>Next Quarter</button>
            </span>
        </div>
    );
  }
});
