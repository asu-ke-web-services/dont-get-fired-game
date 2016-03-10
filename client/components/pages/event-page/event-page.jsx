import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { pickEventChoice } from '../../../actions/actions';


const EventPage = React.createClass({
  handleOptionOne( e ) {
    e.preventDefault();
    dispatch( pickEventChoice() );

  },
  handleOptionTwo( e ) {
    e.preventDefault();
    dispatch( pickEventChoice() );
  },
  render() {
    return (
        <div className="event-page">
          <h1 className="event-page__headline">
            {this.props.event.name}
          </h1>
          <span className="event-page__information">
            {this.props.event.explain}
            <br/>
            {this.props.event.options}
            <button className="event-page__button" onClick={this.handleOptionOne}>option 1</button>
            <button className="event-page__button" onClick={this.handleOptionTwo}>option 2</button>
          </span>
        </div>
    );
  }
});

export { EventPage };
