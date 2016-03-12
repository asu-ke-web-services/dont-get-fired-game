import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { showQuaterReport } from '../../../actions/actions';


const MainPage = React.createClass({
  handleClick( e ) {
    e.preventDefault();

    dispatch( showQuaterReport() );
  },
  render() {
    return (
      <div className="main-page__button">
        <button onClick={this.handleClick}>Next Quater</button>
      </div>
    );
  }
});

export { MainPage };
