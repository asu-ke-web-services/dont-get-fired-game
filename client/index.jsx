import React from 'react';
import ReactDOM from 'react-dom';

import { default as Game } from './containers/game/game.jsx';
import { default as Bar } from './components/game/MainSideBar/main-side-bar.jsx';



Meteor.startup(function () {
    ReactDOM.render( <Bar />,document.getElementById('render-target'));
});


