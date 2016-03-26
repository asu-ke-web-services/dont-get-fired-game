import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { selectEvent } from '../../../actions/actions';


const EventPage = React.createClass({
  handleOptionOne( e ) {
    e.preventDefault();
    dispatch( selectEvent('A') );

  },
  handleOptionTwo( e ) {
    e.preventDefault();
    dispatch( selectEvent('B') );
  },
  render() {
    return (
        <div className="event-page">
          <h1 className="event-page__headline">
          {this.props.state.game.currentEvent.name}
          </h1>
          <span className="event-page__information">
            {this.props.state.game.currentEvent.description}
            <br/>
            <button className="event-page__button" onClick={this.handleOptionOne}>
                {this.props.state.game.currentEvent.optionALabel}</button>
            <button className="event-page__button" onClick={this.handleOptionTwo}>
                {this.props.state.game.currentEvent.optionBLabel}</button>
          </span>
        </div>
    );
  }
});
export { EventPage };
