import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { quaterReport } from '../../../actions/actions';


const MainPage = React.createClass({
  handleClick( e ) {
    e.preventDefault();
    dispatch( quaterReport() );

  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Next Quater</button>
      </div>
    );
  }
});

export { MainPage };
