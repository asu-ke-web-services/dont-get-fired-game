/**
 * GameSetup View
 */
import React from 'react';
import GameStore from '/client/stores/GameStore';

GameSetup = typeof GameSetup === 'undefined' ? {} : GameSetup;

GameSetup.View = React.createClass({
  mixins: [Reflux.connect(GameStore, 'game')],

  handleRandomize(e) {
    e.preventDefault();

    GameActions.create();
  },

  handleStart(e) {
    e.preventDefault();

    // TODO change view state!
  },

  // bem_blocks: ['view'],
  // bem_block_modifiers: ['game-setup'],
  // bem_render() {
  render() {
    return (
      <div bem_element="">
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
