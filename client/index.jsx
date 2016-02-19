import React from 'react';
import ReactDOM from 'react-dom';
import {default as Startpage} from './components/game/home/startPage.jsx';

Meteor.startup(function () {
ReactDOM.render( <Startpage />, document.getElementById('render-target'));
});