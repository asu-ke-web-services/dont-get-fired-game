import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { pickEventChoice } from '../../../actions/actions';


const EventPage = React.createClass({
  onClick( 1 ) {
    return (e) => {
      e.preventDefault();
      
       dispatch( pickEventChoice() );
    };
  },
  onClick( 2 ) {
    return (e) => {
      e.preventDefault();
      
       dispatch( pickEventChoice() );
    };
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
            <button className="event-page__button" onClick={this.onClick(1)}>option 1</button>
            <button className="event-page__button" onClick={this.onClick(2)}>option 2</button>
          </span>
        </div>
    );
  }
});

export { EventPage };