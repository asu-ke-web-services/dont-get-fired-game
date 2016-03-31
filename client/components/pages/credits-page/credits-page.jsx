import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { goHome } from '../../../actions/actions';

const CreditsPage = React.createClass({
  handleBack( e ) {
    e.preventDefault();

    dispatch( goHome() );
  },

  render() {
    return (
      <div className="credits-page">
        <div className="credits-page__wrapper">
          <div className="credits-page__panel paper">
            <h1 className="credits-page__heading">Credits</h1>

            <h3>Team Leads</h3>
            <ul>
              <li>Ivan Montiel</li>
              <li>Ryan Raub</li>
            </ul>

            <h3>Developers</h3>
            <ul>
              <li>Mark Dickinson</li>
              <li>Tuyen Ho</li>
              <li>Rhys Morgan</li>
              <li>David Small</li>
              <li>Xuefeng Yan</li>
            </ul>

            <h3>Icons</h3><br/>
            <a href='http://www.freepik.com/free-vector/male-and-female-avatars_766955.htm'>
              Designed by Freepik
            </a>
            <div className="credits-page__github">
              Visit our
              <a
                className="button button--link"
                href="http://www.github.com/gios-asu/dont-get-fired-game"
                target="_blank">
                Github
              </a>
            </div>
          </div>

          <div className="credits-page__buttons">
            <button
                className="
                  credits-page__button
                  credits-page__button--left
                  button
                  button--white"
                onClick={this.handleBack}>
              « Back
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export { CreditsPage };
