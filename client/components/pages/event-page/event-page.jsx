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
          <div className="event-page__popup">
          <h1 className="event-page__headline">
          {this.props.state.game.currentEvent.name}
          </h1>

          <div className="event-page__information">
            {this.props.state.game.currentEvent.description}
            <br/>
          </div>
            <button className="button event-page__buttonLeft" onClick={this.handleOptionOne}>
              {this.props.state.game.currentEvent.optionALabel}</button>
            <button className="button event-page__buttonRight" onClick={this.handleOptionTwo}>
              {this.props.state.game.currentEvent.optionBLabel}</button>
            </div>
        </div>
    );
  }
});
export { EventPage };
