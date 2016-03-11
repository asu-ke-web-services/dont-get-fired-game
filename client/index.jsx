/**
 * index.jsx
 *
 * This is the entry point for the app
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './containers/game/game.jsx';
import { store } from './stores/game-store';

/**
 * Render will render our game to the render target
 */
const render = () => {
  ReactDOM.render(
    <Game state={store.getState()} />,
    document.getElementById( 'render-target' )
    );
};

/**
 * On start up, we will bind changes
 * to our render to changes in our store
 */
Meteor.startup(function () {
  store.subscribe( render );
  render();
});

