
import React from 'react';
import ReactDOM from 'react-dom';
import {default as Game} from './containers/game/game.jsx';

Meteor.startup(function () {

  ReactDOM.render( <Game />, document.getElementById('render-target'));
});


