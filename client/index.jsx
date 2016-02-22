import React from 'react';
import ReactDOM from 'react-dom';
//import {default as Game} from './containers/game/game.jsx';

import {default as Quater} from './components/game/home/eventPage/eventPage.jsx';

Meteor.startup(function () {
  ReactDOM.render( <Quater />, document.getElementById('render-target'));
});
