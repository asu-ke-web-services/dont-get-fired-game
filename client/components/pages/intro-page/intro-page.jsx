import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { goHome } from '../../../actions/actions';

const IntroPage = React.createClass({
  handleBack( e ) {
    e.preventDefault();

    dispatch( goHome() );
  },

  handleStart( e ) {
    e.preventDefault();

    // TODO
  },

  render() {
    return (
      <div className="intro-page">
        <div className="intro-page__wrapper">
          <div className="intro-page__panel paper">
            <h1 className="intro-page__heading">
              Welcome to {this.props.state.game.company.name}
            </h1>
            <p>
              TODO
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
