import React from 'react';
import ReactDOM from 'react-dom';
import {default as StartPage} from './components/game/gameStart/startPage.jsx';

Meteor.startup(function () {
ReactDOM.render( <StartPage />, document.getElementById('render-target'));
});