/**
 * GameSetup View
 */
import React from 'react';
import Reflux from 'reflux';
import {GameStore, GameActions} from '../../../stores/game-store';

export default React.createClass({
  mixins: [ Reflux.connect(GameStore, 'game') ],

  handleRandomize(e) {
    e.preventDefault();

    // TODO change view state!
    GameActions.create();
  },

  handleStart(e) {
    e.preventDefault();

    GameActions.create();
  },

  render() {
    return (
      <div>
        <h2>{this.state.game.name}</h2>
        <p>Starting Capital {this.state.game.capital}</p>
        <p>Cash Flow {this.state.game.cashFlow}</p>
        <p>Industry {this.state.game.industry.name}</p>
        <p>Number of Factories {this.state.game.numberOfFactories}</p>
        <p>Customer Satisfaction {this.state.game.customerSatisfaction}</p>
        <p>Board of Directors Satisfaction {this.state.game.companySatisfaction}</p>
        <p>Goal {this.state.game.goal.name}</p>
        <button onClick={this.handleRandomize}>Randomize</button>
        <button onClick={this.handleStart}>Start</button>
      </div>
    );
  }
});