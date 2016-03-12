import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { showMain } from '../../../actions/actions';


const EventPage = React.createClass({
  handleOptionOne( e ) {
    e.preventDefault();
    dispatch( showMain() );

  },
  handleOptionTwo( e ) {
    e.preventDefault();
    dispatch( showMain() );
  },
  render() {
    return (
        <div className="event-page">
          <h1 className="event-page__headline">
          {this.props.name}
          </h1>
          <span className="event-page__information">
            {this.props.explain}
            <br/>
            {this.props.options}
            <button className="event-page__button" onClick={this.handleOptionOne}>option1</button>
            <button className="event-page__button" onClick={this.handleOptionTwo}>option2</button>
          </span>
        </div>
    );
  }
});
export { EventPage };
