import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { goHome, showMain } from '../../../actions/actions';

const IntroPage = React.createClass({
  handleBack( e ) {
    e.preventDefault();

    dispatch( goHome() );
  },

  handleStart( e ) {
    e.preventDefault();

    dispatch( showMain() );
  },

  render() {
    return (
      <div className="intro-page">
        <div className="intro-page__wrapper">
          <div className="intro-page__panel paper">
            <h1 className="intro-page__heading">
              Welcome to {this.props.state.game.companyName}
            </h1>
            <p>
              {this.props.state.game.companyName} needs your help!
            </p>
            <p>
              The previous CEO was fired for driving the company into the ground!
            </p>
            <p>
              It's up to you to help improve the company, decide which programs
              to implement, and respond to any events that come up!
            </p>
            <p>
              your company has this goal [ {this.props.state.game.goals.name}  ]!
              For your company success,you need to make at least
              ${this.props.state.game.goals.capital} captial! have a satisfaction
              score at least {this.props.state.game.goals.satisfaction}!
              Company believes you!
            </p>
          </div>

          <div className="intro-page__buttons">
            <button
                className="
                  intro-page__button
                  intro-page__button--left
                  button
                  button--white"
                onClick={this.handleBack}>
              « Back
            </button>
            <button
                className="
                  intro-page__button
                  intro-page__button--right
                  button
                  button--action"
                onClick={this.handleStart}>
              Start Your First Quater
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export { IntroPage };
