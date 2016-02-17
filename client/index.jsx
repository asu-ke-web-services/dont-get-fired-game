import React from 'react';
import ReactDOM from 'react-dom';
import {default as Game} from './containers/game/game.jsx';
import {default as StartPage} from './components/game/home/startPage.jsx';

Meteor.startup(function () {
  ReactDOM.render( <StartPage />, document.getElementById('render-target'));
});
