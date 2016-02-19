import React from 'react';
import ReactDOM from 'react-dom';
import {default as Game} from './components/game/home/home.jsx';

Meteor.startup(function () {
  ReactDOM.render( <Game />, document.getElementById('render-target'));
});
