import React from 'react';
import ReactDOM from 'react-dom';
import {default as Game} from './containers/game/game.jsx';

import {default as Event} from './components/game/home/quaterfinal.jsx';
Meteor.startup(function () {
  ReactDOM.render( <Event />, document.getElementById('render-target'));
});
